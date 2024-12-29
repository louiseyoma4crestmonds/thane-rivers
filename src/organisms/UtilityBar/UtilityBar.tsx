import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CloseButton from "@/atoms/CloseButton";
// import the icons you need
import styles from "./UtilityBar.module.css";
import { UtilityBarProps } from "./UtilityBar.types";

function UtilityBar(props: UtilityBarProps): JSX.Element {
  const router = useRouter();
  const [showMobileNavBar, setShowMobileNavBar] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const { getCelebrityId } = props;

  useEffect(() => {
    setActiveTab(router.route);
  });

  const navigationLinks = [
    { name: "Home", link: "" },
    // { name: "Fan Card", link: "fan-card" },
    { name: "Meet and greet", link: "meet-and-greet" },
    // { name: "Vacation", link: "vacation" },
    { name: "Donate", link: "donate" },
    { name: "Payment", link: "payments" },
  ];

  console.log(getCelebrityId);

  return (
    <div className="border-b border-b-maroon100 ">
      <div className={showMobileNavBar ? "flex flex-row-reverse " : "hidden"}>
        <div className=" absolute z-50 text-maroon100 bg-backgroundCream h-screen w-10/12 border border-maroon100 text-white">
          <div className="flex justify-between px-4 py-4 bg-maroon100 border-b border-b-backgroundCream border-maroon100">
            <div className="self-center font-bold text-md text-backgroundCream ">
              THANE RIVERS
              <div className="text-xs ">Management</div>
            </div>

            <div>
              <CloseButton
                onclick={() => {
                  setShowMobileNavBar(!showMobileNavBar);
                }}
              />
            </div>
          </div>
          {navigationLinks.map((link) => (
            <div
              // className="px-6 py-6 border-b border-b-maroon100 cursor-pointer flex justify-between hover:bg-maroon100 hover:text-backgroundCream"
              className={
                activeTab === `/${link.link}`
                  ? "px-6 py-6 phone:border-b border-b-maroon100 cursor-pointer flex justify-between bg-maroon100 text-backgroundCream hover:bg-backgroundCream hover:text-maroon100"
                  : "px-6 py-6 border-b phone:border-b-maroon100 text-maroon100 cursor-pointer flex justify-between hover:bg-maroon100 hover:text-backgroundCream"
              }
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
              onClick={() => {
                router.push({ pathname: `/${link.link}` });
              }}
            >
              <div className="self-center uppercase">{link.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.utilityBarContainer} bg-maroon100`}>
        <div className="  flex phone:justify-between phone:place-content-center  gap-x-0 phone:gap-x-0 px-8 py-4">
          <div className="hidden phone:flex">
            <div className="self-center text-lg phone:text-xs text-white uppercase">
              Thane Damian Rivers
            </div>
          </div>

          <div className="self-center ">
            <div className="phone:hidden text-lg phone:text-xs text-white uppercase">
              Thane Damian Rivers
            </div>
          </div>

          <div
            className="self-center space-y-1 cursor-pointer tablet:hidden desktop:hidden plasma:hidden laptop:hidden"
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
            onClick={() => {
              setShowMobileNavBar(!showMobileNavBar);
            }}
          >
            <div className="h-1 w-6 bg-white" />
            <div className="h-1 w-6 bg-white" />
            <div className="h-1 w-6 bg-white" />
          </div>
        </div>
      </div>
      <div className="w-full text-base  h-[50px] text-gold flex place-content-center gap-x-4 phone:hidden">
        {navigationLinks.map((link) => (
          <div
            // className="px-6 py-6 border-b border-b-maroon100 cursor-pointer flex justify-between hover:bg-maroon100 hover:text-backgroundCream"
            className={
              activeTab === `/${link.link}`
                ? "px-6 py-6 border-b border-b-white phone:border-b border-b-maroon100 cursor-pointer flex justify-between bg-maroon100 text-backgroundCream hover:bg-backgroundCream hover:text-maroon100"
                : "px-6 py-6 phone:border-b border-b-maroon100 cursor-pointer flex justify-between hover:bg-maroon100 hover:text-backgroundCream"
            }
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
            onClick={() => {
              router.push({ pathname: `/${link.link}` });
            }}
          >
            <div className="self-center uppercase">{link.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UtilityBar;
