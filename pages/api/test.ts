import nc from 'next-connect';
import { Request, Response } from 'express';
import DataCollection from 'server/models';
const app = nc();

app.get((req: Request, res: Response) => {
  const e = new DataCollection({
    content: {
      hello: "world"
    }
  })
  res.json(e);
});

export default app;