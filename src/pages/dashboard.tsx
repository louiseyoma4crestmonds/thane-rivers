import { useEffect, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Router from "next/router";
import { destroyCookie } from "nookies";
import styled, { keyframes } from "styled-components";
import { slideInLeft } from "react-animations";
import {
  doesActivePromoCodeExists,
  getActivityLog,
  getSessionDetails,
  getPromoCode,
  uploadReceipt,
} from "src/pages/api";
import Footer from "@/organisms/Footer";
import Modal from "@/molecules/Modal";
import Backdrop from "@/atoms/Backdrop";
import FileUpload from "@/organisms/FileUpload";
import bitcoin from "public/bitcoin.png";
import udst from "public/usdt.png";
import paypal from "public/paypal.png";
import etherum from "public/etherum.png";
import bitcoinAddress from "public/btc-address.png";
// import etherumAddress from "public/ethereum-address.png";
// import usdtEthAddress from "public/usdt-eth-address.png";

function Dashboard(): JSX.Element {
  const [token, setToken] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<any>("");
  const [introPage, setIntroPage] = useState<boolean>(true);
  const [paymentModal, setPaymentModal] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [donationPurpose, setDonationPurpose] = useState("");
  const [showMeetAndGreetForm, setShowMeetAndGreetForm] = useState<boolean>();
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const slideInLeftAnimation = keyframes`${slideInLeft}`;

  const SlideInLeftDiv = styled.div`
    animation: 3s ${slideInLeftAnimation};
  `;
  const [activeTab, setActiveTab] = useState("promo code");

  const [promoCode, setPromoCode] = useState<any>("");
  const [uploadPurpose, setUploadPurpose] = useState("");
  const [activityLog, setActivityLog] = useState<any>(["empty"]);
  const [invalidCode, setInvalidCode] = useState(false);
  const [uploadSuccessful, setUploadSuccessfull] = useState(false);
  const [showPromoCodeModal, setShowPromoCodeModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    if (token === "") {
      getSessionDetails()
        .then((response: any) => {
          setToken(response?.user.accessToken.token.tokenData.userToken);
          setFirstName(response?.user.accessToken.token.tokenData.firstName);
        })
        .catch(() => {
          Router.replace({ pathname: "/" });
        });
    }
  });

  useEffect(() => {
    if (fileToUpload !== "" && token !== "") {
      uploadReceipt(token, fileToUpload, uploadPurpose).then((response) => {
        if (response.data.code === 201) {
          setUploadSuccessfull(true);
        }
      });
    }
  }, [fileToUpload]);

  useEffect(() => {
    if (token !== "") {
      getActivityLog(token).then((response: any) => {
        try {
          if (response.data.code === 200) {
            setActivityLog(response.data.data[0]);
          }
        } catch (error) {
          Router.replace({ pathname: "/" });
        }
      });
    }
  }, [fileToUpload, token]);

  useEffect(() => {
    if (introPage) {
      setIntroPage(true);
      setTimeout(() => {
        setIntroPage(false);
      }, 2000);
    }
  });

  const signUserOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
    Router.replace({ pathname: "/" });
    destroyCookie(null, "csrftoken");
    destroyCookie(null, "__Secure-next-auth.callback-url");
    destroyCookie(null, "consentPolicy");
    destroyCookie(null, "__Host-next-auth.csrf-token");
    destroyCookie(null, "next-auth.session-token");
    Router.replace({ pathname: "/" });
  };

  const navigationLinks = [
    { name: "PROMO CODE", link: "promo-code" },
    { name: "MEET AND GREET", link: "meet-and-greet" },
    { name: "DONATION", link: "donate" },
    { name: "PAYMENT", link: "payments" },
    { name: "ACTIVITY LOG", link: "activity-log" },
  ];

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>Checkout you dashboard...</SlideInLeftDiv>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="w-full text-backgroundCream text-2xl border-b border-b-white bg-maroon100 text-center py-4 uppercase">
          <div className="px-8 flex justify-between">
            <div>Thane Rivers</div>
            <div className="flex gap-x-2 text-base">
              <div className="capitalize">{firstName}</div>
            </div>
          </div>
        </div>
        <div className="bg-[#e5e4e4] h-screen">
          <div className="flex gap-x-8">
            <div
              className={
                showSideBar
                  ? "drop-shadow-md phone:absolute phone:top-0 phone:bottom-0 phone:z-10 bg-backgroundCream h-screen text-maroon100 text-sm font-bold   w-1/6 phone:w-5/6"
                  : "hidden"
              }
            >
              <div className="space-y-2">
                {navigationLinks.map((link) => (
                  <div>
                    <div className="hidden phone:flex phone:flex-col">
                      <div
                        tabIndex={0}
                        role="button"
                        onKeyDown={() => {
                          setActiveTab(link.name.toLowerCase());
                          setShowSideBar(false);
                        }}
                        onClick={() => {
                          setActiveTab(link.name.toLowerCase());
                          setShowSideBar(false);
                        }}
                        className={
                          activeTab === link.name.toLowerCase()
                            ? "cursor-pointer bg-maroon100 py-2 px-4 text-white"
                            : "cursor-pointer py-2 px-4"
                        }
                      >
                        {link.name}
                      </div>
                    </div>

                    <div className="visible phone:hidden">
                      <div
                        tabIndex={0}
                        role="button"
                        onKeyDown={() => {
                          setActiveTab(link.name.toLowerCase());
                        }}
                        onClick={() => {
                          setActiveTab(link.name.toLowerCase());
                        }}
                        className={
                          activeTab === link.name.toLowerCase()
                            ? "cursor-pointer bg-maroon100 py-2 px-4 text-white"
                            : "cursor-pointer py-2 px-4"
                        }
                      >
                        {link.name}
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {
                      signUserOut();
                    }}
                    onClick={() => {
                      signOut();
                    }}
                    className="capitalize px-4 mt-16"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                showSideBar
                  ? "bg-[#e5e4e4] h-screen px-16 w-full phone:px-4  phone:w-full overflow-y-scroll"
                  : "bg-[#e5e4e4] h-screen  w-full phone:px-4 overflow-y-scroll "
              }
            >
              <div
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                  setShowSideBar(!showSideBar);
                }}
                onClick={() => {
                  setShowSideBar(!showSideBar);
                }}
                className="space-y-1 mt-2 desktop:hidden laptop:hidden tablet:hidden plasma:hidden"
              >
                <div className="w-8 h-1 bg-maroon100" />
                <div className="w-8 h-1 bg-maroon100" />
                <div className="w-8 h-1 bg-maroon100" />
              </div>

              {activeTab.toLowerCase() === "promo code" ? (
                <div className="w-full py-8 h-screen flex place-content-center">
                  <div className="w-full ">
                    <div
                      className="phone:h-[150px] h-full w-full text-white rounded-t"
                      style={{
                        backgroundImage: `url('/fan-card.webp')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "",
                        height: "200px",
                      }}
                    />
                    <div className="border bg-backgroundCream drop-shadow-md  h-[320px] w-full px-16 flex place-content-center">
                      <div className="py-8 rounded ">
                        <div className="w-full space-y-4">
                          <input
                            className="w-full p-3 outline-none border rounded-lg border-maroon100 hover:border-orange100"
                            placeholder="Promo Code"
                            type="text"
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                            }}
                            required
                          />
                          <div
                            tabIndex={0}
                            role="button"
                            onKeyDown={() => {}}
                            onClick={() => {
                              setUploadPurpose("Promo Code");
                              getPromoCode(promoCode, token).then(
                                (response: any) => {
                                  if (response.data.code === 404) {
                                    setInvalidCode(true);
                                  }
                                  if (response.data.code === 200) {
                                    setPromoCode(response.data.data[0]);
                                    setShowPromoCodeModal(true);
                                  }
                                }
                              );
                            }}
                            className="cursor-pointer p-4 text-center hover:opacity-90 rounded-lg bg-maroon100 text-white w-full"
                          >
                            Verify Promo Code
                          </div>
                          <div
                            className={
                              invalidCode
                                ? "text-center text-errorRed text-sm"
                                : "hidden"
                            }
                          >
                            The promo code is invalid
                          </div>
                        </div>

                        <div className={showPromoCodeModal ? "" : "hidden"}>
                          <Backdrop />
                          <div>
                            <Modal
                              isOpen={showPromoCodeModal}
                              onClose={() => {
                                setShowPromoCodeModal(false);
                              }}
                            >
                              <div className="w-full py-8 space-y-4">
                                <div className="flex place-content-center">
                                  <div className="space-y-4">
                                    <div className="w-[200px]" />
                                    <div className="text-maroon100 font-bold text-lg text-center">
                                      {promoCode.name}
                                    </div>
                                    {promoCode.active ? (
                                      <div className="text-[#5da28a] border border-maroon100 shadow-md p-8 rounded-lg">
                                        Verified
                                      </div>
                                    ) : (
                                      <div className="space-y-4 p-4 space-y-2 text-sm border border-maroon100 shadow-md rounded ">
                                        <div className="text-errorRed">
                                          This promo code has not been verified
                                        </div>
                                        <div>
                                          <div>Cost: ${promoCode.cost}</div>
                                          <div>
                                            Balance: ${promoCode.balance}
                                          </div>
                                        </div>
                                        <div>
                                          Pay ${promoCode.balance} now to
                                          activate this code.
                                        </div>
                                        <div
                                          tabIndex={0}
                                          role="button"
                                          onKeyDown={() => {}}
                                          onClick={() => {
                                            setActiveTab("payment");
                                          }}
                                          className="w-full flex place-content-center cursor-pointer"
                                        >
                                          <div className="p-2 rounded text-maroon100 border border-maroon100">
                                            Pay ${promoCode.balance}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs italic">
                                            Upload Payment Receipt here
                                          </div>
                                          <FileUpload
                                            type=""
                                            maximumFileSize="1 mb"
                                            jpg
                                            png
                                            uploadedFileName="undefined"
                                            fileUploadSuccess={false}
                                            uploadFile={setFileToUpload}
                                            deleteUploadFile={() => {}}
                                          />
                                          {uploadSuccessful ? (
                                            <div className="w-full text-center mt-4 text-green100">
                                              File has been uploaded
                                              Successfully
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab.toLowerCase() === "meet and greet" ? (
                <div className="p-8 phone:px-0 phone:py-4">
                  <div className="w-full text-white rounded-t text-lg bg-maroon100 text-center py-4 uppercase">
                    Meet and Greet
                  </div>
                  <div className="w-full">
                    <div className="px-4 bg-backgroundCream tablet:px-8 text-black space-y-4 pt-8 shadow-md ">
                      <div className="text-xs">
                        <div>
                          We are thrilled to offer you a once-in-a-lifetime
                          opportunity to meet the legendary Thane Rivers in
                          person! Whether you are a lifelong fan or a recent
                          admirer, this exclusive meet and greet experience will
                          allow you to get up close and personal with Thane
                          Rivers. Here is everything you need to know about how
                          to apply and secure your spot for this unforgettable
                          moment.
                        </div>
                      </div>
                      <div className="text-xs space-y-4">
                        <div className="font-bold"> What is Included?</div>
                        <div className="pl-2 space-y-2">
                          <div>
                            <span className="font-bold">
                              * A Personal Meet & Greet:
                            </span>{" "}
                            Spend quality time with Thane Rivers in an intimate
                            setting.
                          </div>
                          <div>
                            <span className="font-bold">
                              *Photo Opportunity:
                            </span>{" "}
                            Snap a memorable photo with Thane Rivers to cherish
                            forever.
                          </div>
                          <div>
                            <span className="font-bold">*Exclusive Swag:</span>{" "}
                            Receive limited edition merchandise to commemorate
                            the experience.
                          </div>
                          <div>
                            <span className="font-bold">
                              *Autographed Memorabilia:
                            </span>{" "}
                            Get a signed item from Thane Rivers, only available
                            to meet-and-greet participants.
                          </div>
                        </div>

                        <div>
                          {" "}
                          <div className="font-bold">Important Notes</div>
                          <div>
                            To apply, you must be 18 years or older. This event
                            is open to general public.
                          </div>
                          <div>
                            Travel and accommodation expenses are not included,
                            so please plan accordingly.
                          </div>
                          <div>
                            We prioritize your safety! All attendees must follow
                            the events safety guidelines and rules That will be
                            sent to your email on registration
                          </div>
                          <div>
                            Please be available to attend the event on the
                            confirmed date and time. No rescheduling is
                            possible.
                          </div>
                        </div>
                      </div>
                      <div className="w-full  bg-backgroundCream border-b  py-8 px-4 space-y-4">
                        {showMeetAndGreetForm ? (
                          ""
                        ) : (
                          <div
                            tabIndex={0}
                            role="button"
                            onKeyDown={() => {}}
                            onClick={() => {
                              doesActivePromoCodeExists(token).then(
                                (response: any) => {
                                  if (response.data.data[0]) {
                                    setShowMeetAndGreetForm(true);
                                  } else {
                                    setShowMeetAndGreetForm(false);
                                  }
                                }
                              );
                            }}
                            className="cursor-pointer p-4 text-center hover:opacity-90 rounded-lg bg-maroon100 text-white w-full"
                          >
                            Apply Now!
                          </div>
                        )}

                        {showMeetAndGreetForm === false ? (
                          <div className="w-full text-center text-sm text-errorRed">
                            You do not have an active promo code
                          </div>
                        ) : showMeetAndGreetForm === true ? (
                          <div className="w-full">
                            <div className="w-full ">
                              <div className="w-full flex gap-x-4 ">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  onKeyDown={() => {
                                    setActiveTab("payment");
                                  }}
                                  onClick={() => {
                                    setActiveTab("payment");
                                  }}
                                  className="w-3/6 cursor-pointer"
                                >
                                  <div className="p-2 rounded text-center text-white bg-maroon100 border border-maroon100">
                                    Pay $299
                                  </div>
                                </div>
                                <div
                                  tabIndex={0}
                                  role="button"
                                  onKeyDown={() => {
                                    setShowDonationModal(true);
                                    setDonationPurpose(
                                      "Meet and Greet with Thane"
                                    );
                                  }}
                                  onClick={() => {
                                    setShowDonationModal(true);
                                    setDonationPurpose(
                                      "Meet and Greet with Thane"
                                    );
                                  }}
                                  className="w-3/6  cursor-pointer"
                                >
                                  <div className="p-2 text-center rounded text-maroon100 border border-maroon100">
                                    I have Paid for meet and greet
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className={showDonationModal ? "" : "hidden"}>
                      <Backdrop />
                      <div>
                        <Modal
                          isOpen={showDonationModal}
                          onClose={() => {
                            setShowDonationModal(false);
                          }}
                        >
                          <div className="w-full py-8 space-y-4">
                            <div className="flex place-content-center">
                              <div className="space-y-4">
                                <div className="w-[200px]" />

                                <div className="space-y-4 p-4 space-y-2 text-sm border border-maroon100 shadow-md rounded ">
                                  <div className="w-full text-center text-green100 text-sm font-bold">
                                    {donationPurpose}
                                  </div>
                                  <div>
                                    <div className="text-xs italic">
                                      Upload Payment Receipt here
                                    </div>
                                    <FileUpload
                                      type=""
                                      maximumFileSize="1 mb"
                                      jpg
                                      png
                                      uploadedFileName="undefined"
                                      fileUploadSuccess={false}
                                      uploadFile={setFileToUpload}
                                      deleteUploadFile={() => {}}
                                    />
                                    {uploadSuccessful ? (
                                      <div className="w-full text-center mt-4 text-green100">
                                        File has been uploaded Successfully
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>
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
                        <div className="w-full h-[300px] text-center py-8 space-y-4">
                          <div>
                            Wallet Address:{" "}
                            <span className="text-green100">
                              {walletAddress}
                            </span>
                          </div>
                          <div>
                            {paymentModal.toLowerCase() === "bitcoin" ? (
                              <div>
                                <Image
                                  src={bitcoinAddress}
                                  width={250}
                                  height={200}
                                  alt=""
                                />
                              </div>
                            ) : paymentModal.toLowerCase() === "ethereum" ? (
                              <div>
                                <Image
                                  src="https://res.cloudinary.com/dvzdavdtc/image/upload/v1735485368/ethereum-address_gs6tuc.png"
                                  width={250}
                                  height={200}
                                  alt=""
                                />
                              </div>
                            ) : paymentModal
                                .toLowerCase()
                                .startsWith("usdt") ? (
                              <div>
                                <Image
                                  src="https://res.cloudinary.com/dvzdavdtc/image/upload/v1735485368/usdt-eth-address_ybzdxo.png"
                                  width={250}
                                  height={200}
                                  alt=""
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              ) : activeTab.toLowerCase() === "vacation" ? (
                <div>Vacation</div>
              ) : activeTab.toLowerCase() === "donation" ? (
                <div className="pt-4">
                  <div className="w-full px-6 phone:px-4 phone:py-4 space-y-4 pt-4 bg-backgroundCream">
                    <div className="w-full space-y-4 border-b pb-4 border-b-maroon100">
                      <div className="font-bold text-maroon100 text-lg uppercase">
                        Help Rebuild Lives in Ukraine.
                      </div>
                      <div
                        className="h-full w-full "
                        style={{
                          backgroundImage: `url('/ukraine-refugees.jpg')`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "cover",
                          height: "400px",
                        }}
                      />
                      <div className="text-justify">
                        Millions in Ukraine have been forced to leave their
                        homes, carrying only hope and courage amidst
                        unimaginable loss. These 3.7 million displaced
                        individuals—families, children, and elders—urgently need
                        shelter, food, and medical aid. Your kindness can bring
                        warmth to those enduring cold nights, meals to the
                        hungry, and hope to the hopeless. Every donation, no
                        matter how small, makes a world of difference. Stand
                        with Ukraine today. Together, we can bring light to
                        their darkest hour.
                      </div>
                      <div className="w-full flex gap-x-2 place-content-center">
                        <div
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => setActiveTab("payment")}
                          onClick={() => {
                            setActiveTab("payment");
                          }}
                          className=" cursor-pointer"
                        >
                          <div className="p-2 rounded text-center text-white bg-maroon100 border border-maroon100">
                            Continue
                          </div>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => {
                            setShowDonationModal(true);
                            setDonationPurpose(
                              "Help Rebuild Lives in Ukraine."
                            );
                          }}
                          onClick={() => {
                            setShowDonationModal(true);
                            setDonationPurpose(
                              "Help Rebuild Lives in Ukraine."
                            );
                          }}
                          className="w-full flex  cursor-pointer"
                        >
                          <div className="p-2 rounded text-maroon100 border border-maroon100">
                            I have donated
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" w-full space-y-4 py-8 border-b border-b-maroon100">
                      <div className="font-bold text-maroon100 text-lg uppercase">
                        Support Gaza: Restore Hope Amidst the Devastation
                      </div>
                      <div
                        className="h-full w-full"
                        style={{
                          backgroundImage: `url('/palestanian-child.webp')`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "cover",
                          height: "400px",
                        }}
                      />
                      <div className="text-justify">
                        Thousands of families in Gaza are struggling to survive
                        amidst the devastation of war. Homes have been
                        destroyed, lives shattered, and children left without
                        safety or security. Your generosity can provide urgent
                        relief—food, water, medical care, and shelter to those
                        who need it most. Every contribution is a step towards
                        healing and rebuilding lives torn apart by conflict.
                        Stand with Gaza today. Together, we can bring hope and
                        relief to those enduring unimaginable hardships.
                      </div>
                      <div className="w-full flex gap-x-2 place-content-center">
                        <div
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => {
                            setActiveTab("payment");
                          }}
                          onClick={() => {
                            setActiveTab("payment");
                          }}
                          className=" cursor-pointer"
                        >
                          <div className="p-2 rounded text-center text-white bg-maroon100 border border-maroon100">
                            Continue
                          </div>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => {
                            setActiveTab("payment");
                          }}
                          onClick={() => {
                            setShowDonationModal(true);
                            setDonationPurpose(
                              "Support Gaza: Restore Hope Amidst the Devastation"
                            );
                          }}
                          className="w-full flex  cursor-pointer"
                        >
                          <div className="p-2 rounded text-maroon100 border border-maroon100">
                            I have donated
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" w-full space-y-4 py-8 border-b border-b-maroon100">
                      <div className="font-bold text-maroon100 text-lg uppercase">
                        Bring Clean Water to Africa’s Children
                      </div>
                      <div
                        className="h-full w-full "
                        style={{
                          backgroundImage: `url('/african-child-water.jpg')`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "cover",
                          height: "400px",
                        }}
                      />

                      <div className="text-justify">
                        Millions of children across Africa wake up each day
                        without access to clean, safe water. They walk miles
                        under the scorching sun, risking their health for
                        something we often take for granted. Your support can
                        change their story—providing clean water that saves
                        lives, keeps children in school, and gives families hope
                        for a brighter future. A small act of kindness can
                        ripple into a lifetime of impact. Donate today and help
                        bring the gift of clean water to Africa’s children.
                        Together, we can create a world where no child suffers
                        for a simple drink.
                      </div>
                      <div className="w-full flex gap-x-2 place-content-center">
                        <div
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => {
                            setActiveTab("payment");
                          }}
                          onClick={() => {
                            setActiveTab("payment");
                          }}
                          className=" cursor-pointer"
                        >
                          <div className="p-2 rounded text-center text-white bg-maroon100 border border-maroon100">
                            Continue
                          </div>
                        </div>
                        <div
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => {
                            setShowDonationModal(true);
                            setDonationPurpose("Bring Clean Water to Africa");
                          }}
                          onClick={() => {
                            setShowDonationModal(true);
                            setDonationPurpose("Bring Clean Water to Africa");
                          }}
                          className="w-full flex  cursor-pointer"
                        >
                          <div className="p-2 rounded text-maroon100 border border-maroon100">
                            I have donated
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={showDonationModal ? "" : "hidden"}>
                    <Backdrop />
                    <div>
                      <Modal
                        isOpen={showDonationModal}
                        onClose={() => {
                          setShowDonationModal(false);
                        }}
                      >
                        <div className="w-full py-8 space-y-4">
                          <div className="flex place-content-center">
                            <div className="space-y-4">
                              <div className="w-[200px]" />

                              <div className="space-y-4 p-4 space-y-2 text-sm border border-maroon100 shadow-md rounded ">
                                <div className="w-full text-center text-green100 text-sm font-bold">
                                  {donationPurpose}
                                </div>
                                <div>
                                  <div className="text-xs italic">
                                    Upload Payment Receipt here
                                  </div>
                                  <FileUpload
                                    type=""
                                    maximumFileSize="1 mb"
                                    jpg
                                    png
                                    uploadedFileName="undefined"
                                    fileUploadSuccess={false}
                                    uploadFile={setFileToUpload}
                                    deleteUploadFile={() => {}}
                                  />
                                  {uploadSuccessful ? (
                                    <div className="w-full text-center mt-4 text-green100">
                                      File has been uploaded Successfully
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              ) : activeTab.toLowerCase() === "payment" ? (
                <div className="p-8 phone:px-0 phone:py-4 ">
                  <div className="w-full text-white rounded-t text-lg bg-maroon100 text-center py-4 uppercase">
                    Payment Methods
                  </div>
                  <div className="">
                    <div className="px-2  phone:px-0 bg-backgroundCream tablet:px-8 text-black space-y-4 pt-8 shadow-md ">
                      <div className="w-full flex flex-row gap-x-4 phone:flex-col bg-backgroundCream border-b  py-8 px-4 space-y-0 phone:space-y-16">
                        <div
                          className="w-full space-y-6 border bg-white  pt-8 rounded-lg shadow-2xl cursor-pointer"
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => {
                            setShowPaymentModal(true);
                            setPaymentModal("Bitcoin");
                            setWalletAddress(
                              "bc1qaru84m6j295w0gedutzg44d8gcwkgtc0w5dk24"
                            );
                          }}
                          onClick={() => {
                            setShowPaymentModal(true);
                            setPaymentModal("Bitcoin");
                            setWalletAddress(
                              "bc1qaru84m6j295w0gedutzg44d8gcwkgtc0w5dk24"
                            );
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
                          <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded-b">
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
                            setWalletAddress(
                              "0xF8fB1e4fbF025E7EEAAb8A8e40617a8784BFc866"
                            );
                          }}
                          onClick={() => {
                            setShowPaymentModal(true);
                            setPaymentModal("Ethereum");
                            setWalletAddress(
                              "0xF8fB1e4fbF025E7EEAAb8A8e40617a8784BFc866"
                            );
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
                          <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded-b">
                            Select Payment Method
                          </div>
                        </div>
                        <div
                          className="w-full space-y-6 border bg-white  pt-8 rounded-lg shadow-2xl cursor-pointer"
                          tabIndex={0}
                          role="button"
                          onKeyDown={() => {
                            setShowPaymentModal(true);
                            setPaymentModal("USDT(Ethereum Network)");
                            setWalletAddress(
                              "0xF8fB1e4fbF025E7EEAAb8A8e40617a8784BFc866"
                            );
                          }}
                          onClick={() => {
                            setShowPaymentModal(true);
                            setPaymentModal("USDT(Ethereum Network)");
                            setWalletAddress(
                              "0xF8fB1e4fbF025E7EEAAb8A8e40617a8784BFc866"
                            );
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
                          <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded-b">
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
                            setWalletAddress(
                              "Contact Support for details of payment please."
                            );
                          }}
                          onClick={() => {
                            setShowPaymentModal(true);
                            setPaymentModal("Paypal");
                            setWalletAddress(
                              "Contact Support for details of payment please."
                            );
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
                          <div className="w-full shadow-md capitalize p-4  text-center text-white bg-maroon100 border border-2 border-maroon100 rounded-b">
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
                        onClose={() => {
                          setShowPaymentModal(false);
                        }}
                        isOpen={showPaymentModal}
                      >
                        <div className="w-full h-[300px] text-center py-8 space-y-4">
                          <div>
                            Wallet Address:{" "}
                            <span className="text-green100">
                              {walletAddress}
                            </span>
                          </div>
                          <div>
                            {paymentModal.toLowerCase() === "bitcoin" ? (
                              <div>
                                <Image
                                  src={bitcoinAddress}
                                  width={250}
                                  height={200}
                                  alt=""
                                />
                              </div>
                            ) : paymentModal.toLowerCase() === "ethereum" ? (
                              <div>
                                <Image
                                  src="https://res.cloudinary.com/dvzdavdtc/image/upload/v1735485368/ethereum-address_gs6tuc.png"
                                  width={250}
                                  height={200}
                                  alt=""
                                />
                              </div>
                            ) : paymentModal
                                .toLowerCase()
                                .startsWith("usdt") ? (
                              <div>
                                <Image
                                  src="https://res.cloudinary.com/dvzdavdtc/image/upload/v1735485368/usdt-eth-address_ybzdxo.png"
                                  width={250}
                                  height={200}
                                  alt=""
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              ) : activeTab.toLowerCase() === "activity log" ? (
                <div className="p-8 phone:px-0 ">
                  <div className="w-full text-white rounded-t text-lg bg-maroon100 text-center py-4 uppercase">
                    Upload Activity Log
                  </div>
                  <div className="w-full">
                    <div className="px-2 py-8  phone:px-4 bg-backgroundCream tablet:px-8 text-black space-y-4 pt-8 shadow-md ">
                      <div className="border drop-shadow-md ">
                        <div className="flex text-xs font-bold">
                          <div className="w-3/6 p-2 border border-maroon100">
                            Upload Activity
                          </div>
                          <div className="w-3/6 p-2 border border-maroon100">
                            Status
                          </div>
                        </div>
                        {activityLog.map((activity: any) => (
                          <div className="flex text-xs ">
                            <div className="w-3/6 p-2 border border-maroon100 capitalize">
                              {activity.name}
                            </div>
                            <div className="w-3/6 p-2 border border-maroon100 capitalize">
                              {activity.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
