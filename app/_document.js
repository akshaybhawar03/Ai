// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="Y1Mox3vYUXwpLs66dSBbe3H1FpAP8zCu5rqDBuWqlII" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
