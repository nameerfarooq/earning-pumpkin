import "./App.css";
import Header from "./components/Header";
import pumpkinsearch from "./assets/icons/pumpkinsearch.svg";
import kid from "./assets/icons/kid.svg";
import pumpfunicon from "./assets/icons/pumpfunicon.svg";
import pumpkinlogo from "./assets/icons/pumpkinlogo.svg";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="max-w-7xl mx-auto py-[30px] px-3">
      <Header />
      <div className="max-w-[550px] min-w-[250px] mx-auto my-[20px]  flex flex-col gap-10 items-center">
        <div className="flex card-shadow border border-black bg-baseColor rounded-md py-6 px-3 flex-col gap-6 sm:gap-0 items-center justify-center w-full">
          <div className="Fraunces text-center font-semibold text-[26px] sm:text-[45px] leading-[35px] sm:leading-[55px] text-white2 flex flex-col gap-0 items-center justify-center">
            <p>
              {" "}
              <span className="text-yellow2"> Pumpkin </span>vs{" "}
              <span className="text-green2"> Pump.fun </span>
            </p>
            <p className="">Earnings Comparison </p>
          </div>
          <div className="flex items-center justify-center sm:justify-between gap-4 flex-wrap sm:flex-nowrap">
            <p className="text-grey2 font-normal text-[16px] leading-[18px] text-center sm:text-left">
              Compare your favorite Pump.fun tokens and discover how much
              trading fees you could have earned if they launched on Pumpkin.
            </p>
            <img src={pumpkinsearch} alt="pumpkinsearch" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p className="Fraunces text-white2 font-semibold text-[22px] leading-[27px]">
              Find token
            </p>
            <input
              type="text"
              placeholder="Enter token name or address"
              className="bg-darkGray rounded-md py-4 px-4 outline-none border-none text-grey2 font-normal text-[14px] leading-[16px] placeholder:text-grey2 w-full"
            />
            <button className="bg-yellow2 hover:bg-[#FFBE68] w-full text-center py-3 px-4 rounded-md text-black font-medium text-[18px] leading-[21px]">
              Compare
            </button>
          </div>
        </div>
        <div className="flex px-3 flex-col gap-3 items-center justify-center w-full">
          <div className="flex items-center justify-between gap-3 flex-wrap w-full">
            <div className="flex items-center gap-2">
              <img width={50} src={kid} alt="Token image" />
              <p className="text-white2 Fraunces font-semibold text-[27px] leading-[33px]">
                $ALT2
              </p>
            </div>
            <p className="text-grey2 font-normal text-[16px] leading-[18px]">
              Volume: $238 382 328
            </p>
          </div>
          <div className="flex gap-3  w-full flex-wrap sm:flex-nowrap">
            <div className="w-full flex flex-col gap-3 card-shadow bg-lightGray rounded-md p-4 items-center sm:items-start">
              <div className="flex items-center gap-3 justify-start">
                <img src={pumpfunicon} alt="Icon" />
                <p className="font-bold text-[18px] leading-[21px] text-white2">
                  Pump.fun earnings
                </p>
              </div>
              <p className="text-green2 Fraunces font-semibold text-[27px] leading-[33px]">
                $75
              </p>
            </div>
            <div className="w-full flex flex-col gap-3 card-shadow bg-lightGray rounded-md p-4 items-center sm:items-end">
              <div className="flex items-center gap-3 justify-end">
                <img src={pumpkinlogo} alt="Icon" />
                <p className="font-bold  text-[18px] leading-[21px] text-white2">
                  Pumpkin earnings
                </p>
              </div>
              <p className="text-yellow2 text-right Fraunces font-semibold text-[27px] leading-[33px]">
                $356 805
              </p>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-between items-center gap-3 card-shadow bg-lightGray rounded-md p-4">
            <p className="font-bold text-center  text-[18px] leading-[21px] text-white2">
              Creator Loss
            </p>
            <p className="text-[#BA4706] text-center  sm:text-right Fraunces font-semibold text-[27px] leading-[33px]">
              $356 730
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
