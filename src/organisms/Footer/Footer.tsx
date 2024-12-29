function Footer(): JSX.Element {
  return (
    <div className=" bg-maroon100">
      <div className="w-full pb-16 pt-16  space-y-8">
        <div className="px-4">
          <div>
            <div className="self-center ">
              <div className="text-2xl phone:text-xl text-backgroundCream uppercase bold">
                Thane Damian Rivers
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 phone:px-4 text-backgroundCream">
          <div>
            <div>
              <span className="text-backgroundCream text-bold">CONTACT</span>
            </div>
          </div>

          <div className="text-[#acaaac] space-y-4 mt-2">
            <div>
              <p>
                3478 Corte Curva,
                <br /> Carlsbad, CA 92009
              </p>
            </div>
            <div>
              <div>
                <div>management@thanerivers.primarypros.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-[#acaaac] pb-6">
        Copyright © celebrity-appointment 2024. All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
