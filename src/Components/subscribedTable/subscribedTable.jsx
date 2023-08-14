import React, { useContext, useEffect, useRef, useState } from "react";
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

const roundTo2Decimal = (number) => {
  return parseFloat(number).toFixed(2);
};

function SubscribedTable({}, ref) {
  const { subscribedSymbols, wssUrl } = useContext(SymbolsContext);
  let ws;

  useEffect(() => {
    // Establish WebSocket connection
    ws = new WebSocket(wssUrl);

    // Listen for WebSocket events
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbol = data.data.s;
      const bid = roundTo2Decimal(data.data.b);
      const ask = roundTo2Decimal(data.data.a);
      const bidOld = ref.current.querySelector(
        `#${symbol.toLowerCase()} .bid-price`
      ).innerHTML;
      const askOld = ref.current.querySelector(
        `#${symbol.toLowerCase()} .ask-price`
      ).innerHTML;
      if (bid !== bidOld) {
        ref.current
          .querySelector(`#${symbol.toLowerCase()} .bid-price`)
          .setHTML(bid);
      }
      if (ask !== askOld) {
        ref.current
          .querySelector(`#${symbol.toLowerCase()} .ask-price`)
          .setHTML(ask);
      }
      // Handle incoming data
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [wssUrl]);

  return (
    <>
      <table ref={ref}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Bid</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>
          {/* {subscribedSymbols.map((symbol) => (
            <SymbolRow key={symbol} symbol={symbol} />
          ))} */}
          {subscribedSymbols.map((symbol, index) => (
            <tr key={symbol} id={symbol}>
              <td className="symbol-name">
                <strong>{symbol}</strong>
              </td>
              <td className="bid-price"></td>
              <td className="ask-price"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default React.forwardRef(SubscribedTable);
