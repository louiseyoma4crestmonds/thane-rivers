import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import { slideInLeft, zoomIn } from "react-animations";
import UtilityBar from "@/organisms/UtilityBar";
import Footer from "@/organisms/Footer";
import Button from "@/atoms/Button";
import { getCelebrity } from "./api";

function Celebrity(): JSX.Element {
  const router = useRouter();
  const [introPage, setIntroPage] = useState<boolean>(true);
  const [celebrityId, setCelebrityId] = useState(router.query.celebrityId);
  const [celebrity, setCelebrity] = useState<any>(["empty"]);

  const slideInLeftAnimation = keyframes`${slideInLeft}`;
  const zoomInAnimation = keyframes`${zoomIn}`;

  const SlideInLeftDiv = styled.div`
    animation: 3s ${slideInLeftAnimation};
  `;
  const ZoomInDiv = styled.div`
    animation: 3s ${zoomInAnimation};
  `;

  useEffect(() => {
    getCelebrity(celebrityId).then((response: any) => {
      if (response.status === 200) {
        setCelebrity(response.data.data[0]);
      }
    });
  }, [celebrityId]);

  useEffect(() => {
    if (introPage) {
      setIntroPage(true);
      setTimeout(() => {
        setIntroPage(false);
      }, 3000);
    }
  }, [setIntroPage]);

  if (introPage) {
    return (
      <div className={!introPage ? "hidden" : ""}>
        <div className="w-screen h-screen flex place-content-center bg-maroon100">
          <div className="self-center uppercase font-bold text-backgroundCream text-2xl">
            <SlideInLeftDiv>THANE RIVERS...</SlideInLeftDiv>
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
          <UtilityBar getCelebrityId={setCelebrityId} />
        </div>
        {/* END OF UTILITY BAR */}
        <ZoomInDiv>
          <div className="w-full text-backgroundCream text-xl uppercase  bg-maroon100 text-center py-4 ">
            {celebrity?.name}
          </div>
        </ZoomInDiv>

        <div className="w-full space-y-8 bg-backgroundCream text-maroon100 py-8 px-32 ">
          <div className="w-full flex place-content-center">
            <div
              className="rounded-full w-full "
              style={{
                // backgroundImage: "url(" + celebrity.photo + ")",
                backgroundImage: `url(${celebrity.photo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPositionX: "",
                height: "200px",
                width: "200px",
              }}
            />
          </div>

          <div className="border-l border-l-4 border-l-maroon100 px-8 py-1 leading-loose leading-8 text-justify">
            {celebrity.description}
          </div>
          <div className="w-full">
            <Button
              onClick={() => {
                Router.push({ pathname: "/meet-and-greet" });
              }}
              width="full"
              variant="primary"
            >
              <div className="w-full text-center text-lg uppercase">
                Meet {celebrity.name}{" "}
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Celebrity;
