import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
import { ContactUs } from "src/pages/api";

function ContactForm(): JSX.Element {
  const [messageDeliveryStatus, setMessageDeliveryStatus] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const zoomInAnimation = keyframes`${zoomIn}`;

  const ZoomInDiv = styled.div`
    animation: 3s ${zoomInAnimation};
  `;

  const sendMessage = async (event: any) => {
    event.preventDefault();
    ContactUs(name, email, message).then((response) => {
      console.log("our response: ", response);
      if (response === "Success") {
        setMessageDeliveryStatus(true);
        setTimeout(() => {
          setMessageDeliveryStatus(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="shadow-lg w-full flex flex-col place-content-center text-center text-maroon100 bg-white rounded-lg py-8 px-4 space-y-4 tablet:p-24">
      <div>QUICK ENQUIRY</div>
      <div>
        <div>
          <span className="text-center text-maroon100">
            DO YOU HAVE ANY QUESTION? WE ARE GLAD TO TALK TO YOU.
          </span>
        </div>
      </div>
      <form onSubmit={sendMessage} className="space-y-4">
        <div className="space-y-4">
          <div className="flex gap-x-4 phone:flex-col phone:gap-y-4 place-content-center">
            <div className="">
              <input
                className="w-full rounded border border-blue300 py-2 px-4 outline-none"
                placeholder="Your name"
                required
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>

            <div className="">
              <input
                className="w-full rounded border border-blue300  py-2 px-4 outline-none"
                placeholder="Your email"
                type="email"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="w-full">
            <textarea
              className="w-8/12 phone:w-full h-[200px] rounded border border-blue300 text-[#4C4A44] py-2 px-4 outline-none"
              placeholder="Ask us any question"
              required
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-full flex place-content-center">
          <div className="w-3/5 tablet:w-1/5 phone:w-full space-y-4">
            <button
              type="submit"
              className="w-full bg-maroon100 text-white rounded-lg py-2"
            >
              Send Message
            </button>
            <div>
              {messageDeliveryStatus ? (
                <ZoomInDiv>
                  <div className=" text-[#39B96C]">Message Sent</div>
                </ZoomInDiv>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-left tablet:place-content-center">
          <div>
            By submitting this form it means you accept our{" "}
            <span className="font-bold text-blue100">Terms & Conditions</span>{" "}
            for processing personal data.
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
