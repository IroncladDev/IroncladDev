/** 
* THIS IS THE CONFIG FILE FOR THE BACKEND
*/
const config = {
  /**
   * An array of blocked email hostnames to prevent temp-emails from being used
   **/
  invalidEmailHosts: [
    'cldkid.com',
    'bongo.com',
    'tempmail.ninja',
    'dropmail.me',
    '126.com',
    'minimail.gq',
    '10mail.tk',
    'cloudkid.com',
    'onionmail.org',
    'smartnator.com',
    'vpsrec.com',
    'vasqa.com',
    'galotv.com',
    'ulforex.com',
    'rawr.com',
    'fallinhay.com',
    'bukhariansiddur.com',
    'pdflivres.com',
    'cricketworldcup2015news.com',
    'creative-journeys.com',
    'chatily.com',
    'coop1001facons.ca',
    'fuckgyz.eu.org',
    'gyzanonymous.ml',
    'dotfordevestiy.com',
    'starium.live',
    'szentivanyi.com',
    'ericszentivanyi.com',
    'minekits.eu'
  ],

  /**
   * The role to add to the user when he verified his email
   * Note: the role id must be a string
   **/
  roleToAdd: "1082297670246334525",

  /**
   * Your guild's id, so only a moderator in your guild will be able to view the dashboard.
   * Note: You need to write it as a string
   */
  guildId: "921470609475633212",

  /**
   * The email to verify mails
   */
  verificationEmail: "verification@antiraid.replitironclad.repl.co",

  /**
   * Discord's bot id
   */
  botId: "1082295690585190450",

  /** 
  * An array of admin emails
  * Note: The emails are not simplified
  */
  admins: ['connerow1115@gmail.com'],

  /**
   * The content of the verification mail. It will replace $TOKEN_LINK with a valid verify link;
   * Mail built with tabular
   */
  mailHTML: `
    <body class=t0 style="min-width:100%;Margin:0px;padding:0px;background-color:#B0B5A5;">
    <div class=t1 style="background-color:#B0B5A5;">
       <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center>
          <tr>
             <td class=t64 style="font-size:0;line-height:0;mso-line-height-rule:exactly;" valign=top align=center>
                <!--[if mso]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                   <v:fill color=#B0B5A5 />
                </v:background>
                <![endif]-->
                <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center>
                   <tr>
                      <td>
                         <table class=t5 role=presentation cellpadding=0 cellspacing=0 align=center>
                            <tr>
                               <!--[if !mso]><!-->
                               <td class=t6 style="background-color:#FFFFFF;overflow:hidden;width:630px;">
                                  <!--<![endif]-->
                                  <!--[if mso]>
                               <td class=t6 style="background-color:#FFFFFF;overflow:hidden;width:630px;">
                                  <![endif]-->
                                  <div class=t12 style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
                                     <!--[if mso]>
                                     <table role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
                                        <tr>
                                           <td width=630 valign=top>
                                              <![endif]-->
                                              <div class=t16 style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
                                                 <table role=presentation width=100% cellpadding=0 cellspacing=0 class=t18>
                                                    <tr>
                                                       <td class=t19 style="overflow:hidden;">
                                                          <table role=presentation width=100% cellpadding=0 cellspacing=0>
                                                             <tr>
                                                                <td>
                                                                   <table class=t24 role=presentation cellpadding=0 cellspacing=0 align=center>
                                                                      <tr>
                                                                         <!--[if !mso]><!-->
                                                                         <td class=t25 style="width:600px;">
                                                                            <!--<![endif]-->
                                                                            <!--[if mso]>
                                                                         <td class=t25 style="width:600px;">
                                                                            <![endif]-->
                                                                            <h1 class=t31 style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif, 'Roboto';line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Thanks for joining my server!</h1>
                                                                         </td>
                                                                      </tr>
                                                                   </table>
                                                                </td>
                                                             </tr>
                                                             <tr>
                                                                <td>
                                                                   <div class=t32 style="mso-line-height-rule:exactly;mso-line-height-alt:38px;line-height:38px;font-size:1px;display:block;">&nbsp;</div>
                                                                </td>
                                                             </tr>
                                                             <tr>
                                                                <td>
                                                                   <table class=t34 role=presentation cellpadding=0 cellspacing=0 align=center>
                                                                      <tr>
                                                                         <!--[if !mso]><!-->
                                                                         <td class=t35 style="width:600px;">
                                                                            <!--<![endif]-->
                                                                            <!--[if mso]>
                                                                         <td class=t35 style="width:600px;">
                                                                            <![endif]-->
                                                                            <p class=t41 style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif, 'Lato';line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Lorem ipsum dolor sit amet.</p>
                                                                         </td>
                                                                      </tr>
                                                                   </table>
                                                                </td>
                                                             </tr>
                                                             <tr>
                                                                <td>
                                                                   <div class=t33 style="mso-line-height-rule:exactly;mso-line-height-alt:48px;line-height:48px;font-size:1px;display:block;">&nbsp;</div>
                                                                </td>
                                                             </tr>
                                                             <tr>
                                                                <td>
                                                                   <table class=t44 role=presentation cellpadding=0 cellspacing=0 align=center>
                                                                      <tr>
                                                                         <!--[if !mso]><!-->
                                                                         <td class=t45 style="background-color:#5865F2;width:580px;text-align:center;line-height:24px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:10px 10px 10px 10px;">
                                                                            <!--<![endif]-->
                                                                            <!--[if mso]>
                                                                         <td class=t45 style="background-color:#5865F2;width:600px;text-align:center;line-height:24px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:10px 10px 10px 10px;">
                                                                            <![endif]-->
                                                                            <a href="$TOKEN_LINK" style="text-decoration:none;">
                                                                                <span class=t51 style="display:block;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif, 'Lato';line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;" target=_blank>Verify my email</span>
                                                                            </a>
                                                                         </td>
                                                                      </tr>
                                                                   </table>
                                                                </td>
                                                             </tr>
                                                             <tr>
                                                                <td>
                                                                   <div class=t43 style="mso-line-height-rule:exactly;mso-line-height-alt:37px;line-height:37px;font-size:1px;display:block;">&nbsp;</div>
                                                                </td>
                                                             </tr>
                                                             <tr>
                                                                <td>
                                                                   <table class=t56 role=presentation cellpadding=0 cellspacing=0 align=center>
                                                                      <tr>
                                                                         <!--[if !mso]><!-->
                                                                         <td class=t57 style="width:600px;">
                                                                            <!--<![endif]-->
                                                                            <!--[if mso]>
                                                                         <td class=t57 style="width:600px;">
                                                                            <![endif]-->
                                                                            <p class=t63 style="font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif, 'Lato';line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">If that doesn&#39;t work, please copy and paste this link into your browser: $TOKEN_LINK</p>
                                                                         </td>
                                                                      </tr>
                                                                   </table>
                                                                </td>
                                                             </tr>
                                                             <tr>
                                                                <td>
                                                                   <div class=t55 style="mso-line-height-rule:exactly;mso-line-height-alt:83px;line-height:83px;font-size:1px;display:block;">&nbsp;</div>
                                                                </td>
                                                             </tr>
                                                          </table>
                                                       </td>
                                                    </tr>
                                                 </table>
                                                 <div class=t14 style="mso-line-height-rule:exactly;mso-line-height-alt:333px;line-height:333px;font-size:1px;display:block;">&nbsp;</div>
                                              </div>
                                              <!--[if mso]>
                                           </td>
                                        </tr>
                                     </table>
                                     <![endif]-->
                                  </div>
                               </td>
                            </tr>
                         </table>
                      </td>
                   </tr>
                </table>
             </td>
          </tr>
       </table>
    </div>
 </body>
    `,
};

export default config;
