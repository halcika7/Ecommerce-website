exports.confirmAccountEmail = (username, token, email, password) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}

main {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

form {
  display: inline;
}

.footer {
  background-color: #151515 !important;
  margin-bottom: 0;
  z-index: 2;
  color: #717171;
  padding: 30px 0 30px 0;
}

.footer div {
  margin-right: 15px;
  margin-left: 15px;
}
/**
 * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
 */
 @media screen {
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
  }
}
/**
 * Avoid browser level font resizing.
 * 1. Windows Mobile
 * 2. iOS / OSX
 */
body,
table,
td,
a {
  -ms-text-size-adjust: 100%; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}
/**
 * Remove extra space added to tables and cells in Outlook.
 */
table,
td {
  mso-table-rspace: 0pt;
  mso-table-lspace: 0pt;
}
/**
 * Better fluid images in Internet Explorer.
 */
img {
  -ms-interpolation-mode: bicubic;
}
/**
 * Remove blue links for iOS devices.
 */
a[x-apple-data-detectors] {
  font-family: inherit !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  color: inherit !important;
  text-decoration: none !important;
}
/**
 * Fix centering issues in Android 4.4.
 */
div[style*="margin: 16px 0;"] {
  margin: 0 !important;
}
body {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
/**
 * Collapse table borders to avoid space between cells.
 */
table {
  border-collapse: collapse !important;
}
a {
  color: #1a82e2;
}

.navigation {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    color: #111;
    background-color: #f5f5f5;
  }
  
  .navigation a {
    display: block;
    height: 55px !important;
  }
  
  .navigation a img {
    height: 55px !important;
    width: auto;
  }
  
  .navigation p {
    margin-left: auto;
    margin-right: 20px;
    font-weight: bold;
  }

.reset-open {
  display: inline-block; 
  padding: 16px 36px; 
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; 
  font-size: 16px; 
  color: #fff !important; 
  text-decoration: none; 
  border-radius: 6px;
}

.tr-changepassword {
  display: none;
}

.tr-changepassword.show {
  display: table-row;
}

td.beforeHeading {
  padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;
}

td.beforeHeading > h1 {
  margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;
}

.td1 {
  padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;
}

.td2 {
  padding: 12px;
}

.td3 {
  border-radius: 6px;
}

.td4 {
  padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf
}

.td5 {
  padding: 24px;
}

.td6 {
  padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;
}

    </style>
</head>

<body style="background-color: #e9ecef;">

<div class="navigation">
    <a href="http://localhost:3000" >
      Halc Store
    </a>

    <p>Activate Account Email</p>
</div>
    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 86px">

        <!-- start logo -->
        <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
                  Halc Store
                </a>
                </td>
            </tr>
            </table>
        </td>
        </tr>
        <!-- end logo -->

        <!-- start hero -->
        <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
                <td align="left" bgcolor="#ffffff" class="beforeHeading">
                <h1 >Activate your account</h1>
                </td>
            </tr>
            </table>
        </td>
        </tr>
        <!-- end hero -->

        <!-- start hero -->
        <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
                <td align="left" bgcolor="#ffffff" class="beforeHeading">
                  <p>Email: ${email}</p>
                  <p>Username: ${username}</p>
                    ${password === null ? `` : `<p>Password: ${password}</p>` }
                </td>
            </tr>
            </table>
        </td>
        </tr>
        <!-- end hero -->

        <!-- start copy block -->
        <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

            <!-- start copy -->
            <tr>
                <td align="left" bgcolor="#ffffff" class="td1">
                <p style="margin: 0;">Tap the button below to activate your account!!!.</p>
                </td>
            </tr>
            <!-- end copy -->

            <!-- start button -->
            <tr>
                <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <td align="center" bgcolor="#ffffff" class="td2" >
                        <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center" bgcolor="#1a82e2" class="td3">
                            <a style="color: #fff" class="reset-open" href="http://localhost:3000/confirmationaccount?token=${token}">Click here to confirm account!!!</a>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            <!-- end button -->

            <!-- start copy -->
            <tr>
                <td align="left" bgcolor="#ffffff" class="td4" >
                <p style="margin: 0;">Cheers,<br> ${username}</p>
                </td>
            </tr>
            <!-- end copy -->

            </table>
        </td>
        </tr>
        <!-- end copy block -->

        <!-- start footer -->
        <tr>
        <td align="center" bgcolor="#e9ecef" class="td5">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

            <!-- start permission -->
            <tr>
                <td align="center" bgcolor="#e9ecef" class="td6">
                <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                </td>
            </tr>
            <!-- end permission -->

            <!-- start unsubscribe -->
            <tr>
                <td align="center" bgcolor="#e9ecef" class="td6">
                <p style="margin: 0;">To stop receiving these emails, you can <a href="https://sendgrid.com" target="_blank">unsubscribe</a> at any time.</p>
                <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                </td>
            </tr>
            <!-- end unsubscribe -->

            </table>
        </td>
        </tr>
        <!-- end footer -->

    </table>
    <!-- end body -->

    <div class="footer">
        <div>
            <p>All Rights Reserved © Halc Store 2018</p>
        </div>
    </div>

</body>

</html>`