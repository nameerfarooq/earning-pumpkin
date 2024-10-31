import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import pumpkinsearch from "./assets/icons/pumpkinsearch.svg";
import kid from "./assets/icons/kid.svg";
import pumpfunicon from "./assets/icons/pumpfunicon.svg";
import pumpkinlogo from "./assets/icons/pumpkinlogo.svg";
import Footer from "./components/Footer";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

function App() {
  const [tokenAddress, setTokenAddress] = useState(""); // Store user input
  const [tokenVolume, settokenVolume] = useState(""); // Store API response
  const [executionID, setexecutionID] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [pumpfunEarning, setpumpfunEarning] = useState("");
  const [pumpkinearninig, setpumpkinearninig] = useState("");
  const [solPrice, setsolPrice] = useState("");
  async function fetchSolanaPrice() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const solanaPrice = data.solana.usd;
      setsolPrice(solanaPrice);
      console.log(`Current Solana Price (USD): $${solanaPrice}`);

      // Do something with solanaPrice, e.g., update UI
    } catch (error) {
      console.error("Failed to fetch Solana price:", error);
    }
  }
  useEffect(() => {
    fetchSolanaPrice();
  }, []);
  useEffect(() => {
    if (solPrice) {
      const earning = solPrice * 0.5;
      setpumpfunEarning(earning);
    }
  }, [solPrice]);
  useEffect(() => {
    if (tokenVolume) {
      const earning = tokenVolume * 0.005;
      setpumpkinearninig(earning);
    }
  }, [tokenVolume]);
  const checkStatus = async () => {
    console.log("Check status running");
    if (executionID) {
      try {
        const res2 = await axios.get(
          `https://api.dune.com/api/v1/execution/${executionID}/results`,
          {
            headers: {
              "x-dune-api-key": import.meta.env.VITE_DENO_API_KEY, // API key header
              "Content-Type": "application/json",
            },
          }
        );
        console.log("res2 :", res2);
        if (res2?.data?.is_execution_finished == false) {
          setTimeout(() => {
            checkStatus();
            return;
          }, 3000);
        } else {
          if (res2?.data?.result?.rows[0]?.total_volume) {
            settokenVolume(res2?.data?.result?.rows[0]?.total_volume);
            setLoading(false);
            return;
          } else {
            toast.error("Not Found", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              // eslint-disable-next-line no-undef
            });
            settokenVolume("");
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log("error fetching volume: ", error);
        settokenVolume("");
        setLoading(false);
      }
    } else {
      console.log("NO EXECUTION ID FOUND");
      setLoading(false);
      settokenVolume("");
    }
  };
  const handleCompare = async () => {
    if (!tokenAddress) {
      toast.error("Please enter a token address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // eslint-disable-next-line no-undef
      });
      return;
    }

    try {
      setLoading(true);
      const res1 = await axios.post(
        "https://api.dune.com/api/v1/query/4222521/execute",
        {
          query_parameters: {
            contract_address: tokenAddress,
          },
        },
        {
          headers: {
            "x-dune-api-key": import.meta.env.VITE_DENO_API_KEY, // API key header
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response and update the state
      console.log("res1 :", res1);
      setexecutionID(res1?.data?.execution_id);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
      setLoading(false);
      toast.error("Something went wrong, try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // eslint-disable-next-line no-undef
      });
    }
  };
  function formatDecimal(value) {
    // Convert value to string to handle both string and number input
    const stringValue = value.toString();

    // Function to add spaces every 3 digits in the integer part
    const formatIntegerPart = (integerPart) => {
      return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    // Check if there's a decimal point
    if (stringValue.includes(".")) {
      // Split the integer part and decimal part
      const [integerPart, decimalPart] = stringValue.split(".");

      // Format integer part with spaces every 3 digits
      const formattedInteger = formatIntegerPart(integerPart);

      // If decimal part is longer than 3 digits, truncate it
      if (decimalPart.length > 3) {
        return `${formattedInteger}.${decimalPart.slice(0, 3)}`;
      }

      // If decimal part is 3 digits or less, return the formatted integer and full decimal
      return `${formattedInteger}.${decimalPart}`;
    }

    // If no decimal, just format the integer part
    return formatIntegerPart(stringValue);
  }
  useEffect(() => {
    if (executionID) {
      setTimeout(async () => {
        await checkStatus();
      }, 4000);
    }
  }, [executionID]);
  return (
    <div className="max-w-7xl mx-auto py-[30px] px-3">
      <ToastContainer transition={Bounce} />
      <Header />
      <div className="max-w-[550px] min-w-[250px] mx-auto my-[40px] sm:my-[20px]  flex flex-col gap-10 items-center">
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
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              type="text"
              placeholder="Enter token name or address"
              className="bg-darkGray rounded-md py-4 px-4 outline-none border-none text-grey2 font-normal text-[14px] leading-[16px] placeholder:text-grey2 w-full"
            />
            <button
              onClick={handleCompare}
              disabled={loading}
              className="bg-yellow2 flex items-center justify-center gap-2 hover:bg-[#FFBE68] w-full text-center py-3 px-4 rounded-md text-black font-medium text-[18px] leading-[21px]"
            >
              {loading && (
                <Oval
                  visible={loading}
                  color="#eda803"
                  secondaryColor="#000"
                  strokeWidth={10}
                  strokeWidthSecondary={10}
                  width={20}
                  height={20}
                />
              )}{" "}
              {loading ? "Loading..." : "Compare"}
            </button>
          </div>
        </div>
        {tokenVolume && (
          <div className="flex px-3 flex-col gap-3 items-center justify-center w-full">
            <div className="flex items-center justify-between gap-3 flex-wrap w-full">
              <div className="flex items-center gap-2">
                <img width={50} src={kid} alt="Token image" />
                <p className="text-white2 Fraunces font-semibold text-[27px] leading-[33px]">
                  $ALT2
                </p>
              </div>
              <p className="text-grey2 font-normal text-[16px] leading-[18px]">
                Volume: ${formatDecimal(tokenVolume)}
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
                  ${formatDecimal(pumpfunEarning)}
                </p>
              </div>
              <div className="w-full flex flex-col gap-3 card-shadow bg-lightGray rounded-md p-4 items-center sm:items-end">
                <div className="flex items-center gap-3 justify-end">
                  <img width={40} src={pumpkinlogo} alt="Icon" />
                  <p className="font-bold  text-[18px] leading-[21px] text-white2">
                    Pumpkin earnings
                  </p>
                </div>
                <p className="text-yellow2 text-right Fraunces font-semibold text-[27px] leading-[33px]">
                  ${formatDecimal(pumpkinearninig)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
