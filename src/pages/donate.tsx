import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { slideInLeft } from "react-animations";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";

function Donate(): JSX.Element {
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
  }, [introPage]);

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>Lend a helping hand...</SlideInLeftDiv>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-backgroundCream text-maroon100 text-sm">
      <div>
        {/* UTILITY BAR */}
        <div>
          <UtilityBar getCelebrityId={() => {}} />
        </div>
        {/* END OF UTILITY BAR */}

        <div>
          <div className="w-full text-white text-lg uppercase  bg-maroon100 text-center py-4 ">
            <SlideInLeftDiv>DONATIONS</SlideInLeftDiv>
          </div>
        </div>

        <div className="w-full px-4 space-y-4 pt-4">
          <div className="w-full space-y-4 py-8 shadow-lg px-4">
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
            <div className="leading-loose">
              Millions in Ukraine have been forced to leave their homes,
              carrying only hope and courage amidst unimaginable loss. These 3.7
              million displaced individuals—families, children, and
              elders—urgently need shelter, food, and medical aid. Your kindness
              can bring warmth to those enduring cold nights, meals to the
              hungry, and hope to the hopeless. Every donation, no matter how
              small, makes a world of difference. Stand with Ukraine today.
              Together, we can bring light to their darkest hour.
            </div>
          </div>
          <div className="w-full space-y-4 py-8 shadow-lg px-4">
            <div className="font-bold text-maroon100 text-lg uppercase">
              Support Gaza: Restore Hope Amidst the Devastation
            </div>
            <div
              className="h-full w-full "
              style={{
                backgroundImage: `url('/palestanian-child.webp')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "cover",
                height: "400px",
              }}
            />
            <div className="leading-loose">
              Thousands of families in Gaza are struggling to survive amidst the
              devastation of war. Homes have been destroyed, lives shattered,
              and children left without safety or security. Your generosity can
              provide urgent relief—food, water, medical care, and shelter to
              those who need it most. Every contribution is a step towards
              healing and rebuilding lives torn apart by conflict. Stand with
              Gaza today. Together, we can bring hope and relief to those
              enduring unimaginable hardships.
            </div>
          </div>

          <div className="w-full space-y-4 py-8 shadow-lg px-4">
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

            <div className="leading-loose">
              Millions of children across Africa wake up each day without access
              to clean, safe water. They walk miles under the scorching sun,
              risking their health for something we often take for granted. Your
              support can change their story—providing clean water that saves
              lives, keeps children in school, and gives families hope for a
              brighter future. A small act of kindness can ripple into a
              lifetime of impact. Donate today and help bring the gift of clean
              water to Africa’s children. Together, we can create a world where
              no child suffers for a simple drink.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donate;
