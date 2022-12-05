import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { testContract } from "../../lib/test-contract-config";

export default function Swap() {
  const { chain } = useNetwork();
  const [counter, setCounter] = useState<number>();

  const { data: getCounter } = useContractRead({
    ...testContract(chain),
    functionName: "getCounter",
  });

  const { config: configClaim } = usePrepareContractWrite({
    ...testContract(chain),
    functionName: "incrementCounter",
    // args: [args],
  });

  const { write: incrementCounter } = useContractWrite({
    ...configClaim,
  });

  useEffect(() => {
    setCounter(Number(getCounter));
  }, [getCounter]);

  return (
    <div className="flex justify-center mt-2 mb-2 ">
      <div className="items-center w-[57%] p-5 h-[40rem] bg-customDeepBlue rounded-2xl shadow-sm shadow-customLightBlue mt-2 ">
        <h1 className="text-center text-6xl">
          Welcome to <span className="text-customRed">Contract</span> Page
        </h1>
        <h2 className="text-center text-2xl mt-20 mb-20">
          Current count is <span className="text-violet-400">{counter}</span>
        </h2>
        <div className="flex items-center justify-center">
          <button
            className="bg-customSkyBlue w-[18rem] h-[6rem] rounded-lg animate-pulse text-4xl"
            onClick={() => {
              if (incrementCounter) {
                incrementCounter();
              } else {
                alert("err");
              }
            }}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}
