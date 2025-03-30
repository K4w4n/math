import "./App.css";

import { useRef, useState } from "react";
import { CiCalculator2 } from "react-icons/ci";
import { LiaRandomSolid } from "react-icons/lia";
import { useMathOperation } from "./hooks/useMathOperation";

function App() {
  const { randomize, n1, n2, operation, result } = useMathOperation();
  const inputRandomizeButtonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<
    "not-answered" | "answered-correctly" | "answered-incorrectly"
  >("not-answered");

  const borderColor = {
    "not-answered": "border-gray-500",
    "answered-correctly": "border-green-500",
    "answered-incorrectly": "border-red-500",
  }[status];

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") {
      return;
    }

    if (status === "answered-correctly") {
      return;
    }
    if (inputValue === "") {
      setStatus("answered-incorrectly");
      return;
    }

    if (parseInt(inputValue) === result) {
      setStatus("answered-correctly");
      return;
    }

    setStatus("answered-incorrectly");
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function onClickRandomizeButtonHandler() {
    setInputValue("");
    setStatus("not-answered");
    randomize();
  }

  function onClickCalculateButtonHandler() {
    if (inputValue === "") {
      setStatus("answered-incorrectly");
      return;
    }

    if (parseInt(inputValue) === result) {
      setStatus("answered-correctly");
      inputRandomizeButtonRef.current?.focus();
      return;
    }

    setStatus("answered-incorrectly");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      <h1 className="text-3xl font-bold mb-4">Resolva a conta:</h1>

      <div className="flex flex-row gap-2 text-5xl">
        <span className="flex flex-col align-baseline justify-center color">
          {n1}
        </span>

        <span className="flex flex-col align-baseline justify-center text-blue-400">
          {operation.replace("*", "×")}
        </span>

        <span className="flex flex-col align-baseline justify-center">
          {n2}
        </span>

        <span className="flex flex-col align-baseline justify-center text-blue-400">
          =
        </span>

        <input
          type="text"
          className={`border-b-4 focus:outline-0 focus:bg-gray-900 w-2xs flex flex-col items-center text-center text-3xl ${borderColor}`}
          value={inputValue}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          autoFocus
          disabled={status === "answered-correctly"}
        />

        {status !== "answered-correctly" && (
          <button
            title="Calcular"
            className="flex flex-row justify-center items-center gap-x-5"
            onClick={onClickCalculateButtonHandler}
          >
            <CiCalculator2 className="text-3xl cursor-pointer" />
          </button>
        )}

        <button
          title="Sortear"
          className="flex flex-row justify-center items-center gap-x-5"
          onClick={onClickRandomizeButtonHandler}
          ref={inputRandomizeButtonRef}
        >
          <LiaRandomSolid className="text-3xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default App;
