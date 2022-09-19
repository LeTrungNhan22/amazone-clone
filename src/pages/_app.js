import { Provider } from "react-redux";
import { SessionProvider as AuthProvider } from "next-auth/react";
import Head from "next/head";

import { store } from "../app/store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Head>
          <title>Amazon 2.0</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
