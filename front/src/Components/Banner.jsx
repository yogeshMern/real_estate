import React from "react";

const Banner = (props) => {
  return (
    <>
      <main className=" bg-white relative overflow-hidden h-screen">
        <div
          className="bg-white flex relative z-20 items-center overflow-hidden"
          style={{
            backgroundImage: `url(${props?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
              <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
              <h3 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                {props?.text}
              </h3>
              <div className="flex mt-8 items-center">
                <a className="cursor-pointer uppercase py-2 px-4 rounded-lg bborder-gray-200 dark:bg-white border-2 border-transparent text-md mr-4">
                  {props?.view}
                </a>

                <p className="text-sm sm:text-base text-white font-semibold">
                  {props?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Banner;
