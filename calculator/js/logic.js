import {print} from './utils/print.js';

const main = () => {
    let displayValue = "0";
    let expression = ""; // Строка выражения
    let isLastCharacterOperator = false; // Флаг для указания является ли последний символ оператором
    let isResultDisplayed = false; // Флаг для отображения результата
    return (state) => {
        if (state === "АС") {
            displayValue = "0";
            expression = "";
            isLastCharacterOperator = false;
            isResultDisplayed = false;
        } else if (state === "=") {
            if (!isLastCharacterOperator && !isResultDisplayed) {
                // Вычисляем результат только если последний символ не является оператором
                let result = eval(expression);
                displayValue = Number.isInteger(result) ? result.toString() : result.toFixed(4).toString(); // Проверяем, является ли результат целым числом
                isResultDisplayed = true;
            }
        } else if (state === "С") {
            if (isResultDisplayed) {
                // Если результат был отображен, то при нажатии на "C" очищаем все
                displayValue = "0";
                expression = "";
                isLastCharacterOperator = false;
                isResultDisplayed = false;
            } else {
                // Иначе, просто удаляем последний символ из строки выражения
                displayValue = displayValue.slice(0, -1);
                expression = expression.slice(0, -1);
                if (displayValue === "") {
                    displayValue = "0";
                }
            }
        } else if (/[0-9]/.test(state) || state === ".") {
            if (state === "." && displayValue.includes(".")) {
                return;
            }
            if (displayValue === "0" || isLastCharacterOperator || isResultDisplayed) {
                displayValue = "";
            }
            displayValue += state;
            expression += state;
            isLastCharacterOperator = false;
            isResultDisplayed = false;
        } else if (/[\+\-\*\/]/.test(state)) {
            if (isLastCharacterOperator) {
                return; // Не допускаем двойные операторы
            }
            displayValue = state;
            expression += state;
            isLastCharacterOperator = true;
            isResultDisplayed = false;
        }

        print(displayValue);
    }
}

export default main;
