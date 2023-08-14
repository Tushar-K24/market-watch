import { useContext, useState } from "react";
import "./subscribedTable.css";
import { SymbolsContext } from "../../Contexts/symbolsContext";
import SymbolRow from "../symbolRow/symbolRow";
// const dummySymbols = new Map([
//   [
//     "BTCUSDT",
//     {
//       bid: 30146.56,
//       ask: 30165.62,
//     },
//   ],
//   [
//     "ETHUSDT",
//     {
//       bid: 2022.75,
//       ask: 2024.45,
//     },
//   ],
// ]);
const dummySymbols = [
  {
    symbol: "BTCUSDT",
    bid: 30146.56,
    ask: 30165.62,
  },
  {
    symbol: "ETHUSDT",
    bid: 2022.75,
    ask: 2024.45,
  },
];

function SubscribedTable() {
  const { subscribedSymbols } = useContext(SymbolsContext);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Bid</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>
          {subscribedSymbols.map((symbol) => (
            <SymbolRow key={symbol} symbol={symbol} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SubscribedTable;
