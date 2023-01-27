import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Sofia+Sans&display=swap" rel="stylesheet" />
          <script src="https://kit.fontawesome.com/7d7b8cb9f6.js" crossOrigin="anonymous"></script>
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
