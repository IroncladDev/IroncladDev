import { NextApiRequest, NextApiResponse } from "next";
import {
  CashuMint,
  CashuWallet,
  getDecodedToken,
  PayLnInvoiceResponse,
} from "@cashu/cashu-ts";
import nc from "next-connect";
import { LightningAddress } from "alby-tools";
const ln = new LightningAddress("ironclad@getalby.com");

const MINT_URL = "https://8333.space:3338";

const wallet = new CashuWallet(new CashuMint(MINT_URL));

const app = nc();
app.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const proofs = getDecodedToken(req.body.token);

    const tokens = proofs?.token?.[0]?.proofs;

    if (tokens) {
      const amount = tokens.map((x) => x.amount).reduce((a, b) => a + b);

      await ln.fetch();

      const { paymentRequest } = await ln.requestInvoice({ satoshi: amount });

      let payRes: PayLnInvoiceResponse;

      const fee = await wallet.getFee(paymentRequest);

      if (fee > 0) {
        const { paymentRequest: pr } = await ln.requestInvoice({
          satoshi: amount - fee,
        });
        payRes = await wallet.payLnInvoice(pr, tokens);
      } else {
        payRes = await wallet.payLnInvoice(paymentRequest, tokens);
      }

      if (typeof payRes === "object" && payRes.isPaid) {
        res.status(200).json({
          success: true,
        });
      } else {
        console.log("Void");
        res.status(400).json({
          success: false,
        });
      }
    } else {
      console.log("No tokens");
      res.status(400).json({
        success: false,
      });
    }
  } catch (e) {
    console.log("Error, ", e);
    res.status(400).json({
      success: false,
    });
  }
});

export default app;
