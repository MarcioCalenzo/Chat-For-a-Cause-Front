import { useEffect } from "react";
import { AppProps } from "next/app";
import { ModalP } from "@/components/modal/modal";
import Modal from "react-modal";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ModalP
        titleModal="Título do Modal"
        isOpen={false}
        setIsOpen={() => {}}
        className="seu-className"
      >
        <span></span>
      </ModalP>
    </>
  );
}

export default MyApp;
