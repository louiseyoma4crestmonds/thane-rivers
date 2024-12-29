import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { slideInLeft } from "react-animations";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";

function FanCard(): JSX.Element {
  const [introPage, setIntroPage] = useState<boolean>(true);

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

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>GET A THANE RIVERS FAN CARD...</SlideInLeftDiv>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="">
        {/* UTILITY BAR */}
        <div>
          <UtilityBar getCelebrityId={() => {}} />
        </div>
        {/* END OF UTILITY BAR */}

        <div className="w-full text-white text-2xl bg-maroon100 text-center py-4 uppercase">
          Fan Card
        </div>
        <div className="h-full bg-backgroundCream">
          <div className="h-full">
            <div
              className="phone:h-[150px] h-full w-full text-white"
              style={{
                backgroundImage: `url('/fan-card.webp')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "",
                height: "400px",
              }}
            >
              <div className="w-full space-y-4 place-content-center  h-full  text-center">
                <div className="flex place-content-center self-center h-full">
                  <div className="w-full self-center space-y-8">
                    <SlideInLeftDiv>
                      <div className="w-full flex place-content-center">
                        <div className="self-center w-3/6 text-center uppercase border border-2 cursor-pointer border-maroon100 p-4 bg-backgroundCream hover:bg-maroon100 text-maroon100 hover:text-backgroundCream">
                          Get Card Now
                        </div>
                      </div>
                    </SlideInLeftDiv>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-8 py-8 phone:space-y-8 bg-backgroundCream flex flex-row space-x-8 phone:space-x-0 phone:flex-col place-content-center">
              <div className="h-auto border rounded-lg pb-8 bg-gray50">
                <div className="text-center p-4 space-y-2 text-white bg-gray50 rounded-t">
                  <div className="uppercase  text-2xl">Gold Card</div>
                  <div>
                    <span className="text-orange100 text-2xl">$</span>
                    <span className="text-4xl font-bold">99.9</span>
                  </div>
                </div>
                <div
                  className="phone:h-[150px] h-full w-12/12 text-white"
                  style={{
                    backgroundImage: `url('/golden-fan-card.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "150px",
                  }}
                />

                <div className="space-y-4">
                  <div className="text-white">
                    <div className="p-4 bg-[#383638]">
                      Get Thanes Private Contact
                    </div>
                    <div className="p-4 bg-[#4a484a]">
                      Video & Voice Call with Thane
                    </div>
                  </div>
                  <div className="px-8">
                    <div className="p-4 w-full text-center uppercase bg-orange100  rounded-lg text-white">
                      Get Card
                    </div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg pb-8 bg-gray50">
                <div className="text-center p-4 space-y-2 text-white bg-gray50 rounded-t">
                  <div className="uppercase  text-2xl">Platinum Card</div>
                  <div>
                    <span className="text-orange100 text-2xl">$</span>
                    <span className="text-4xl font-bold">299.9</span>
                  </div>
                </div>
                <div
                  className="phone:h-[150px] h-full w-12/12 text-white"
                  style={{
                    backgroundImage: `url('/platinum-vip-card.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "150px",
                  }}
                />
                <div className="space-y-4 ">
                  <div className="text-white">
                    <div className="p-4 bg-[#383638]">Gold Benefits</div>
                    <div className="p-4 bg-[#4a484a]">Meet With Thane</div>
                  </div>
                  <div className="px-8">
                    <div className="p-4 w-full text-center uppercase bg-orange100  rounded-lg text-white">
                      Get Card
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FanCard;
