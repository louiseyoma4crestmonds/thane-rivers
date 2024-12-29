import { useEffect, useState } from "react";
import Router from "next/router";
import styled, { keyframes } from "styled-components";
import { slideInLeft } from "react-animations";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";
import Backdrop from "@/atoms/Backdrop";
import Modal from "@/molecules/Modal";
import { createFreeAccount } from "./api";

function Register(): JSX.Element {
  const [introPage, setIntroPage] = useState<boolean>(true);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const slideInLeftAnimation = keyframes`${slideInLeft}`;

  const SlideInLeftDiv = styled.div`
    animation: 3s ${slideInLeftAnimation};
  `;

  useEffect(() => {
    if (introPage) {
      setIntroPage(true);
      setTimeout(() => {
        setIntroPage(false);
      }, 2000);
    }
  });

  const createAccount = async (event: any) => {
    event.preventDefault();
    createFreeAccount({ email, firstName, lastName }).then((response: any) => {
      if (response?.data?.code === 201) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          Router.replace({ pathname: "/sign-in" });
        }, 3000);
      } else {
        setSignupError(true);
        setTimeout(() => {
          setSignupError(false);
        }, 3000);
      }
    });
  };

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>CREATE A FREE ACCOUNT...</SlideInLeftDiv>
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

        <div className="w-full text-backgroundCream text-2xl bg-maroon100 text-center py-4 uppercase">
          CREATE A FREE ACCOUNT
        </div>
        <div className="w-full flex place-content-center bg-backgroundCream100 py-16 phone:px-6 shadow-md drop-shadow-2xl">
          <div className="w-3/6 phone:w-full rounded-lg border border-maroon100 py-24 px-24 phone:px-4 ">
            <form onSubmit={createAccount}>
              <div className="w-full space-y-6 text-sm text-maroon100">
                <div className="w-full">
                  <input
                    className="w-full p-3 outline-none border rounded-lg border-maroon100 hover:border-orange100"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    className="w-full p-3 outline-none border rounded-lg border-maroon100 hover:border-orange100"
                    placeholder="First Name"
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    className="w-full p-3 outline-none border rounded-lg border-maroon100 hover:border-orange100"
                    placeholder="Last Name"
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-4 text-center hover:opacity-90 rounded-lg bg-maroon100 text-white w-full"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div
              className={
                signupError
                  ? "w-full text-center text-[#FF4B4B] text-sm py-2"
                  : "hidden"
              }
            >
              Email already exists please try again
            </div>
          </div>
        </div>
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
          }}
        >
          <div className="w-full  text-center py-8 space-y-4">
            <div className="flex place-content-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.174 5.3335H20.8273C11.1207 5.3335 5.33398 11.1202 5.33398 20.8268V43.1468C5.33398 52.8802 11.1207 58.6668 20.8273 58.6668H43.1473C52.854 58.6668 58.6407 52.8802 58.6407 43.1735V20.8268C58.6673 11.1202 52.8807 5.3335 43.174 5.3335ZM44.7473 25.8668L29.6273 40.9868C29.254 41.3602 28.7473 41.5735 28.214 41.5735C27.6807 41.5735 27.174 41.3602 26.8007 40.9868L19.254 33.4402C18.4807 32.6668 18.4807 31.3868 19.254 30.6135C20.0273 29.8402 21.3073 29.8402 22.0807 30.6135L28.214 36.7468L41.9207 23.0402C42.694 22.2668 43.974 22.2668 44.7473 23.0402C45.5207 23.8135 45.5207 25.0668 44.7473 25.8668Z"
                  fill="#43B765"
                />
              </svg>
            </div>

            <div className="w-full text-center font-bold text-base">
              Account Created Successfully
            </div>
            <div className="text-orange100">
              Your login credentials has been sent to your email
            </div>
          </div>
        </Modal>
        <div className={showSuccessModal ? "" : "hidden"}>
          <Backdrop />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
