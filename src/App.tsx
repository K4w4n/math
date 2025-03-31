import "./App.css";

import { useRef, useState } from "react";
import { CiCalculator2 } from "react-icons/ci";
import { LiaRandomSolid } from "react-icons/lia";
import { useMathOperation } from "./hooks/useMathOperation";

enum AnsweredStatus {
  NOT_ANSWERED = "not-answered",
  ANSWERED_CORRECTLY = "answered-correctly",
  ANSWERED_INCORRECTLY = "answered-incorrectly",
}

function App() {
  const { randomize, n1, n2, operation, result } = useMathOperation();
  const inputRandomizeButtonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<AnsweredStatus>(
    AnsweredStatus.NOT_ANSWERED
  );

  const borderColor = {
    [AnsweredStatus.NOT_ANSWERED]: "border-gray-500",
    [AnsweredStatus.ANSWERED_CORRECTLY]: "border-green-500",
    [AnsweredStatus.ANSWERED_INCORRECTLY]: "border-red-500",
  }[status];

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") {
      return;
    }

    if (status === AnsweredStatus.ANSWERED_CORRECTLY) {
      return;
    }
    if (inputValue === "") {
      setStatus(AnsweredStatus.ANSWERED_INCORRECTLY);
      return;
    }

    if (parseInt(inputValue) === result) {
      setStatus(AnsweredStatus.ANSWERED_CORRECTLY);
      return;
    }

    setStatus(AnsweredStatus.ANSWERED_INCORRECTLY);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function onClickRandomizeButtonHandler() {
    setInputValue("");
    setStatus(AnsweredStatus.NOT_ANSWERED);
    randomize();
  }

  function onClickCalculateButtonHandler() {
    if (inputValue === "") {
      setStatus(AnsweredStatus.ANSWERED_INCORRECTLY);
      return;
    }

    if (parseInt(inputValue) === result) {
      setStatus(AnsweredStatus.ANSWERED_CORRECTLY);
      inputRandomizeButtonRef.current?.focus();
      return;
    }

    setStatus(AnsweredStatus.ANSWERED_INCORRECTLY);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950 p-5 md:p-0 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Resolva a conta:</h1>

      <div className="flex flex-col md:flex-row md:gap-2 gap-y-10 text-5xl">
        <div className="flex flex-row gap-2">
          <span className="flex flex-col align-baseline justify-center color">
            {n1}
          </span>

          <span className="flex flex-col align-baseline justify-center text-blue-400">
            {operation.replace("*", "×").replace("/", "÷")}
          </span>

          <span className="flex flex-col align-baseline justify-center">
            {n2}
          </span>

          <span className="flex flex-col align-baseline justify-center text-blue-400">
            =
          </span>

          <input
            type="text"
            className={`border-b-4 focus:outline-0 focus:bg-gray-900 w-full md:w-2xs flex flex-col items-center text-center text-3xl ${borderColor}`}
            value={inputValue}
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
            autoFocus
            disabled={status === AnsweredStatus.ANSWERED_CORRECTLY}
          />
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 gap-y-5">
          {status !== AnsweredStatus.ANSWERED_CORRECTLY && (
            <button
              title="Calcular"
              className="flex flex-row justify-center items-center gap-x-5 p-5 bg-blue-900 rounded-md hover:bg-blue-800 transition-colors duration-200"
              onClick={onClickCalculateButtonHandler}
            >
              <CiCalculator2 className="text-3xl cursor-pointer" />
              <span className="text-xl md:hidden block">Verificar calculo</span>
            </button>
          )}

          <button
            title="Sortear"
            className="flex flex-row justify-center items-center gap-x-5 p-5 bg-orange-500 rounded-md hover:bg-orange-400 transition-colors duration-200"
            onClick={onClickRandomizeButtonHandler}
            ref={inputRandomizeButtonRef}
          >
            <LiaRandomSolid className="text-3xl cursor-pointer" />
            <span className="text-xl md:hidden block">Sortear conta</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
