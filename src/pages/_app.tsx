import type { AppProps } from "next/app";
import { FunctionComponent } from "react";
import "../assets/css/style.css";

const RootApp: FunctionComponent<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

export default RootApp;
