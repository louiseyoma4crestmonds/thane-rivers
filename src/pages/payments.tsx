import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { slideInLeft } from "react-animations";
import Router from "next/router";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";
import bitcoin from "public/bitcoin.png";
import udst from "public/usdt.png";
import paypal from "public/paypal.png";
import etherum from "public/etherum.png";
import Backdrop from "@/atoms/Backdrop";
import Modal from "@/molecules/Modal";

function Payments(): JSX.Element {
  const [introPage, setIntroPage] = useState<boolean>(true);
  const [paymentModal, setPaymentModal] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const slideInLeftAnimation = keyframes`${slideInLeft}`;

  const SlideInLeftDiv = styled.div`
    animation: 3s ${slideInLeftAnimation};
  `;

  useEffect(() => {
    if (introPage) {
      console.log(paymentModal);
      setIntroPage(true);
      setTimeout(() => {
        setIntroPage(false);
      }, 2000);
    }
  }, [introPage]);

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>Payment Methods...</SlideInLeftDiv>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* UTILITY BAR */}
        <div>
          <UtilityBar getCelebrityId={() => {}} />
        </div>
        {/* END OF UTILITY BAR */}

        <div className="w-full text-white text-2xl bg-maroon100 text-center py-4 uppercase">
          Payment Methods
        </div>
        <div className="">
          <div className="px-6  phone:px-0 bg-backgroundCream tablet:px-28 text-black space-y-4 pt-8 border border-2">
            <div className="w-full flex flex-row gap-x-4 phone:flex-col bg-backgroundCream border-b border-b-maroon100  py-8 px-4 space-y-0 phone:space-y-16">
              <div
                className="w-full space-y-6 border bg-white  pt-8 rounded-lg shadow-2xl cursor-pointer"
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("Bitcoin");
                }}
                onClick={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("Bitcoin");
                }}
              >
                <div className="w-full flex place-content-center bg-white">
                  <Image
                    className="shadow-2xl"
                    src={bitcoin}
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
                <div className="w-full text-center font-bold text-maroon100">
                  Bitcoin
                </div>
                <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded">
                  Select Payment Method
                </div>
              </div>
              <div
                className="w-full space-y-6 border bg-white  pt-8 rounded-lg shadow-2xl cursor-pointer"
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("Ethereum");
                }}
                onClick={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("Ethereum");
                }}
              >
                <div className="w-full flex place-content-center bg-white">
                  <Image
                    className="shadow-2xl"
                    src={etherum}
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
                <div className="w-full text-center font-bold text-maroon100">
                  Ethereum
                </div>
                <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded">
                  Select Payment Method
                </div>
              </div>
              <div
                className="w-full space-y-6 border bg-white  pt-8 rounded-lg shadow-2xl cursor-pointer"
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("USDT");
                }}
                onClick={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("USDT");
                }}
              >
                <div className="w-full flex place-content-center bg-white">
                  <Image
                    className="shadow-2xl"
                    src={udst}
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
                <div className="w-full text-center font-bold text-maroon100">
                  Tether(USDT)
                </div>
                <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded">
                  Select Payment Method
                </div>
              </div>
              <div
                className="w-full space-y-6 border bg-white  pt-8 rounded-lg shadow-2xl cursor-pointer"
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("Paypal");
                }}
                onClick={() => {
                  setShowPaymentModal(true);
                  setPaymentModal("Paypal");
                }}
              >
                <div className="w-full flex place-content-center bg-white">
                  <Image
                    className="shadow-2xl"
                    src={paypal}
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
                <div className="w-full text-center font-bold text-maroon100">
                  Paypal
                </div>
                <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded">
                  Select Payment Method
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showPaymentModal ? "" : "hidden"}>
          <Backdrop />
          <div>
            <Modal
              isOpen={showPaymentModal}
              onClose={() => {
                setShowPaymentModal(false);
              }}
            >
              <div className="w-full h-24 text-center py-8">
                Please{" "}
                <span
                  className="underline"
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {
                    Router.push({ pathname: "/sign-in" });
                  }}
                  onClick={() => {
                    Router.push({ pathname: "/sign-in" });
                  }}
                >
                  sign in
                </span>{" "}
                to process payments
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payments;
