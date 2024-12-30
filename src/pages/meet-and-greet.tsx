import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { slideInLeft } from "react-animations";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";

function MeetAndGreet(): JSX.Element {
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
            <SlideInLeftDiv>MEET THANE RIVERS...</SlideInLeftDiv>
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

        <div className="w-full text-white text-lg bg-maroon100 text-center py-4 uppercase">
          Meet and Greet
        </div>
        <div className="bg-gray100">
          <div
            className="phone:h-[250px] h-full w-12/12 text-white border border-maroon100"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dvzdavdtc/image/upload/v1734218898/meet-and-greet-banner_cq4mth.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
            }}
          />
          <div className="px-12 bg-backgroundCream phone:px-4 text-black space-y-4 py-16 shadow-md leading-loose">
            <div className="text-base">
              <div className="leading-loose">
                We are thrilled to offer you a once-in-a-lifetime opportunity to
                meet the legendary Thane Rivers in person! Whether you are a
                lifelong fan or a recent admirer, this exclusive meet and greet
                experience will allow you to get up close and personal with
                Thane Rivers. Here is everything you need to know about how to
                apply and secure your spot for this unforgettable moment.
              </div>
            </div>
            <div className="text-base space-y-4">
              <div className="font-bold"> What is Included?</div>
              <div className="pl-2 space-y-2">
                <div>
                  <span className="font-bold">* A Personal Meet & Greet:</span>{" "}
                  Spend quality time with Thane Rivers in an intimate setting.
                </div>
                <div>
                  <span className="font-bold">*Photo Opportunity:</span> Snap a
                  memorable photo with Thane Rivers to cherish forever.
                </div>
                <div>
                  <span className="font-bold">*Exclusive Swag:</span> Receive
                  limited edition merchandise to commemorate the experience.
                </div>
                <div>
                  <span className="font-bold">*Autographed Memorabilia:</span>{" "}
                  Get a signed item from Thane Rivers, only available to
                  meet-and-greet participants.
                </div>
              </div>

              <div>
                {" "}
                <div className="font-bold">Important Notes</div>
                <div>
                  To apply, you must be 18 years or older. This event is open to
                  general public.
                </div>
                <div>
                  Travel and accommodation expenses are not included, so please
                  plan accordingly.
                </div>
                <div>
                  We prioritize your safety! All attendees must follow the
                  events safety guidelines and rules That will be sent to your
                  email on registration
                </div>
                <div>
                  Please be available to attend the event on the confirmed date
                  and time. No rescheduling is possible.
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

export default MeetAndGreet;
