import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { slideInLeft } from "react-animations";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";
import ContactForm from "@/organisms/ContactForm";

function Vacation(): JSX.Element {
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
      }, 5000);
    }
  });

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>VACATION WITH THANE RIVERS...</SlideInLeftDiv>
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

        <div className="w-full text-white text-2xl bg-blue100 text-center py-4 uppercase">
          Vacation
        </div>
        <div className="bg-gray100">
          <div
            className="phone:h-[250px] h-full w-12/12 text-white"
            style={{
              backgroundImage: `url('/vacation-banner.webp')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "",
            }}
          />
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Vacation;
