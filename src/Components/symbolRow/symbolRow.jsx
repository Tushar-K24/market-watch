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
  const handlePing = () => {
    // Send a pong frame in response to the server's ping
    console.log(`handling ping for ${symbol}`);
    if (ws) {
      ws.send(JSON.stringify({ pong: new Date().getTime() }));
      console.log("ws existence confirmed, and ping sent");
    }
  };

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

    // Send a pong frame every 3 minutes (180000 milliseconds)
    const pingInterval = setInterval(handlePing, 180000);

    // Clean up the WebSocket connection and ping interval on unmount
    return () => {
      clearInterval(pingInterval);
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
