exports.resetEmail = (username, token) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
    .form-control {
        margin: 1rem 0;
      }
      
      .form-control label,
      .form-control input,
      .form-control textarea {
        display: block;
        width: 100%;
        margin-bottom: 0.25rem;
      }
      
      .form-control label {
        margin-bottom: 12px;
        color: #484848;
        display: inline-block;
      }
      
      .form-control input,
      .form-control textarea {
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        position: relative;
        display: block;
        font-family: 'Open Sans';
        width: 100%;
        padding: 8px 15px 8px 30px;
        color: #222222;
        border: 2px solid #e5e5e5;
        border-radius: 30px;
        background-color: #fff;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        outline: none;
      }
      
      .product-form {
        width: 300px;
        max-width: 90%;
        display: block;
      }
      
      .product-form h1 {
        margin-bottom: 0.5rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: inherit;
        font-size: 1.75rem;
      }
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

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
}

.btn {
  border: 1px solid #00695c;
  background-color: #f92400;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding: 0 64px;
  border-radius: 25px;
  margin-right: 30px;
  font-weight: 600;
  margin-left: -8px;
  letter-spacing: 0.5px;
  display: inline-block;
  color: #fff;
  font-family: "BloggerSans", sans-serif;
  position: relative;
  cursor: pointer;
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
img {
  height: auto;
  line-height: 100%;
  text-decoration: none;
  border: 0;
  outline: none;
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
  color: #ffffff; 
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

.formBox {
  margin-bottom: 22px;
  padding-right: 4px;
}

.formBox label {
  margin-bottom: 12px;
  color: #484848;
  display: inline-block;
}

.formBox input {
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  position: relative;
  display: block;
  font-family: 'Open Sans';
  width: 100%;
  padding: 8px 15px 8px 30px;
  color: #222222;
  border: 2px solid #e5e5e5;
  border-radius: 30px;
  background-color: transparent;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  outline: none;
}

.formBox button {
  background-color: #f92400;
  color: #fff;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding: 0 64px;
  border-radius: 25px;
  margin-right: 30px;
  font-weight: 600;
  margin-left: -8px;
  letter-spacing: 0.5px;
  display: inline-block;
  color: #fff;
  font-family: "BloggerSans", sans-serif;
  position: relative;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border: none;
}

    </style>
</head>

<body style="background-color: #e9ecef;">

<div class="navigation">
    <a href="http://localhost:3000" >
        <img src="imageIcon" alt="Halc Store"/>
    </a>

    <p>Reset password email</p>
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
                    <img src="imageIcon" alt="Logo" border="0" width="120">
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
                <h1 >Reset Your Password</h1>
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
                <p style="margin: 0;">Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.</p>
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
                            <a class="reset-open" href="http://localhost:3000/authentication/reset?token=${token}">Reset Password</a>
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