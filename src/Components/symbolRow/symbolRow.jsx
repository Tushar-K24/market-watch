import { useEffect, useState } from "react";
import { wssBaseUrl } from "../../config";

const roundTo2Decimal = (number) => {
  return parseFloat(number).toFixed(2);
};

const SymbolRow = ({ symbol }) => {
  const socketUrl = `${wssBaseUrl}/ws/${symbol.toLowerCase()}@bookTicker`;
  let ws;
  const [bid, setBid] = useState();
  const [ask, setAsk] = useState();

  useEffect(() => {
    // Establish WebSocket connection
    ws = new WebSocket(socketUrl);

    // Listen for WebSocket events
    ws.onopen = () => {
      console.log(`WebSocket connection opened for ${symbol}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBid(roundTo2Decimal(data.b));
      setAsk(roundTo2Decimal(data.a));
      // Handle incoming data
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for ${symbol}`);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      {bid && ask && (
        <tr>
          <td>
            <strong>{symbol.toUpperCase()}</strong>
          </td>
          <td>{bid}</td>
          <td>{ask}</td>
        </tr>
      )}
    </>
  );
};

export default SymbolRow;
