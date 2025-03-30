import { useState } from "react";

export enum OperationsEnum {
    ADDITION = "+",
    SUBTRACTION = "-",
    MULTIPLICATION = "*",
    DIVISION = "/",
};

export const operationsList: OperationsEnum[] = [
    OperationsEnum.ADDITION,
    OperationsEnum.SUBTRACTION,
    OperationsEnum.MULTIPLICATION,
    OperationsEnum.DIVISION,
];

export function useMathOperation() {

    const [n1, setN1] = useState(() => Math.floor(Math.random() * 100));
    const [n2, setN2] = useState(() => Math.floor(Math.random() * 100));
    const [operation, setOperation] = useState<OperationsEnum>(getRandomOperation);
    const result: number = eval(`${n1} ${operation} ${n2}`);

    function randomize() {

        const operation = getRandomOperation();

        setOperation(operation);

        if (operation === OperationsEnum.DIVISION) {
            // Ensure n1 is divisible by n2
            const randomN1 = Math.floor(Math.random() * 100);
            const randomN2 = Math.floor(Math.random() * 100) + 1; // Avoid division by zero
            setN1(() => randomN1 * randomN2);
            setN2(() => randomN2);
            return;
        }
        setN1(() => Math.floor(Math.random() * 100));
        setN2(() => Math.floor(Math.random() * 100));
    }

    function getRandomOperation(): OperationsEnum {
        return operationsList[Math.floor(Math.random() * operationsList.length)];
    }

    return { randomize, n1, n2, operation, result };
}