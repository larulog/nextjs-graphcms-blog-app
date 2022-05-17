import React, { useEffect, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import { Layout } from "../components/index";
import "../styles/nprogress.css";
import "../styles/globals.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
