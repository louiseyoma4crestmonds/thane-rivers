import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { slideInLeft, zoomIn, slideInUp } from "react-animations";
import Router from "next/router";
import { useEffect, useState } from "react";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";
import ContactForm from "@/organisms/ContactForm";
import { GetCelebrities } from "./api";
import trophy from "../../public/trophy.png";
import wallet from "../../public/wallet.png";
import bubbleChat from "../../public/bubble-chat.png";
import email from "../../public/email.png";

function Home(): JSX.Element {
  const [introPage, setIntroPage] = useState<boolean>(true);
  const [celebrities, setCelebrities] = useState(["empty"]);

  const slideInLeftAnimation = keyframes`${slideInLeft}`;
  const zoomInAnimation = keyframes`${zoomIn}`;
  const slideInDownAnimation = keyframes`${slideInUp}`;

  const SlideInLeftDiv = styled.div`
    animation: 3s ${slideInLeftAnimation};
  `;
  const SlideInUpDiv = styled.div`
    animation: 4s ${slideInDownAnimation};
  `;
  const ZoomInDiv = styled.div`
    animation: 3s ${zoomInAnimation};
  `;

  useEffect(() => {
    if (introPage) {
      setIntroPage(true);
      setTimeout(() => {
        setIntroPage(false);
      }, 3000);
    }
  }, [introPage]);

  useEffect(() => {
    GetCelebrities().then((response: any) => {
      if (response.status === 200) {
        setCelebrities(response.data.data[0]);
      }
    });
  }, []);

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>Welcome Gorgeous!</SlideInLeftDiv>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-backgroundCream">
      <div className="w-full">
        {/* UTILITY BAR */}
        <div>
          <UtilityBar getCelebrityId={() => {}} />
        </div>
        {/* END OF UTILITY BAR */}

        <div
          className="phone:h-[250px] w-full  opacity-80 phone:hidden"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dvzdavdtc/image/upload/v1735478546/odin-art-thanerivers_o7hqtx.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "",
            height: "600px",
          }}
        >
          <div className="w-full space-y-4 place-content-center  h-full  text-center">
            <div className="flex place-content-center self-center h-full">
              <div className="w-full self-center space-y-8">
                <SlideInUpDiv>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {
                      Router.push({ pathname: "/sign-in" });
                    }}
                    onClick={() => {
                      Router.push({ pathname: "/sign-in" });
                    }}
                    className="w-full flex place-content-center"
                  >
                    <div className="self-center w-3/6 text-center uppercase border border-2 cursor-pointer border-maroon100 p-4 bg-backgroundCream hover:bg-maroon100 text-maroon100 hover:text-backgroundCream">
                      Join Club
                    </div>
                  </div>
                </SlideInUpDiv>
              </div>
            </div>
          </div>
        </div>

        <div
          className="phone:h-[250px] w-full  opacity-80 tablet:hidden desktop:hidden laptop:hidden plasma:hidden"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dvzdavdtc/image/upload/v1735478546/odin-art-thanerivers_o7hqtx.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "",
            height: "350px",
          }}
        >
          <div className="w-full space-y-4 place-content-center  h-full  text-center">
            <div className="flex place-content-center self-center h-full">
              <div className="w-full self-center space-y-8">
                <SlideInUpDiv>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {
                      Router.push({ pathname: "/sign-in" });
                    }}
                    onClick={() => {
                      Router.push({ pathname: "/sign-in" });
                    }}
                    className="w-full flex place-content-center"
                  >
                    <div className="self-center w-3/6 text-center uppercase border border-2 cursor-pointer border-maroon100 p-4 bg-backgroundCream hover:bg-maroon100 text-maroon100 hover:text-backgroundCream">
                      Join Club
                    </div>
                  </div>
                </SlideInUpDiv>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto bg-backgroundCream py-8">
          <div className="space-y-8 px-8 ">
            {celebrities.map((celebrity: any) => (
              <div className="text-maroon100 space-y-6 w-full flex flex-row gap-x-8 phone:flex-col  ">
                <div
                  className="tablet:hidden laptop:hidden desktop:hidden plasma:hidden "
                  style={{
                    backgroundImage: `url(${celebrity.photo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPositionX: "",
                    height: "300px",
                  }}
                />
                <div className="phone:hidden w-4/6 h-[300px]">
                  <ZoomInDiv>
                    <Image src={celebrity.photo} height={300} width={300} />
                  </ZoomInDiv>
                </div>
                <div className="space-y-4">
                  <div className="">
                    <div className="uppercase text-2xl font-bold">
                      {celebrity.name}
                    </div>
                  </div>
                  <div className="text-base text-justify">
                    Thane Rivers is a well-known Instagram star and content
                    creator hailing from the United States. He has garnered a
                    massive following due to his motivational videos and
                    inspiring social media presence...
                  </div>
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                    onClick={() => {
                      Router.push({
                        pathname: "/celebrity",
                        query: { celebrityId: celebrity.id },
                      });
                    }}
                  >
                    <div className="w-full flex gap-x-2 hover:bg-maroon100 hover:text-backgroundCream border border-maroon100 text-center p-4">
                      <div className="w-full font-bold">
                        VIEW CELEBRITY
                        <span className=" text-xl">{"  >"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="py-8">
            <div
              style={{
                backgroundImage:
                  "url(" +
                  "https://res.cloudinary.com/dvzdavdtc/image/upload/v1734827692/viking-ban_yf0jn2.png" +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPositionX: "",
                height: "600px",
              }}
            />
          </div>
          <div className="py-16 phone:py-8 px-6 text-maroon100 phone:space-y-8 grid grid-cols-2 phone:grid-cols-1 gap-x-24 gap-y-24 phone:gap-y-2">
            <div className="flex gap-x-2">
              <div className="w-1/6">
                <Image src={wallet} height={150} width={150} alt="discount" />
              </div>
              <div>
                <div className="uppercase text-lg font-bold">
                  Discount Prices
                </div>
                <div className="text-md text-justify">
                  Gain early access to tickets and exclusive meet-and-greet
                  opportunities!
                </div>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="w-2/6">
                <Image src={trophy} height={150} width={150} alt="discount" />
              </div>
              <div>
                <div className="uppercase text-md font-bold">Award Winning</div>
                <div className="text-md text-justify">
                  Enjoy exclusive motivational content and playlists curated by
                  Thane Rivers! We are excited to have you join the journey to
                  stay inspired and empowered!
                </div>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="w-2/6">
                <Image
                  src={bubbleChat}
                  height={150}
                  width={150}
                  alt="discount"
                />
              </div>
              <div>
                <div className="uppercase text-md font-bold">
                  Special Propositions
                </div>
                <div className="text-md text-justify">
                  Get exclusive access to Thane Rivers latest motivational
                  content! Be the first to watch new videos and get inspiring
                  messages before they are released to the public. Stay
                  motivated and connected with Thane like never before!
                </div>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="w-2/6">
                <Image src={email} height={150} width={150} alt="discount" />
              </div>
              <div className="">
                <div className="uppercase text-md font-bold">24/7 Support</div>
                <div className="text-md text-justify">
                  We are here to support you whenever you need us. Our dedicated
                  team is available around the clock to assist you.
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
