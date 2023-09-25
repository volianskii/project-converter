import { ChangeEvent } from "react";

type InputProps = {
  currencyList: string[];
  selectedCurrency: string;
  onChangeCurrency: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
  amount: number;
}

const Input = ({ currencyList, selectedCurrency, onChangeCurrency, amount, onChangeValue }: InputProps): JSX.Element => {
  return (
    <div>
      <input className="input" type="number" min={1} value={amount} onChange={onChangeValue} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyList.map((option, index) => {
          const keyValue = `option-${index}`;
          return (
            <option value={option} key={keyValue}> : {option}</option>
          )
        })}
      </select>
    </div>
  )
}

export default Input;
