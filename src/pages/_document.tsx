import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body
        style={{ fontFamily: "Merriweather" }}
        className="font-Merriweather"
      >
        <Main />
        <NextScript />
        <div id="modalSlot" />
      </body>
    </Html>
  );
}
