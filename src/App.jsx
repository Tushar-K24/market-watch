import { useContext, useState } from "react";
import "./App.css";
import SubscribedTable from "./Components/subscribedTable/subscribedTable";
import { useEffect } from "react";
import { baseUrl } from "./config";
import { SymbolsContext } from "./Contexts/symbolsContext";

function App() {
  const [allSymbols, setAllSymbols] = useState([]);
  const [symbolName, setSymbolName] = useState("");
  const { subscribedSymbols, setSubscribedSymbols } =
    useContext(SymbolsContext);

  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(`${baseUrl}/exchangeInfo`, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       const symbols = JSON.parse(result).symbols;
  //       // console.log(symbols);
  //     })
  //     .catch((error) => console.log("error", error));
  // }, []);

  const subscribeSymbol = () => {
    if (!subscribedSymbols.includes(symbolName.toLowerCase())) {
      setSubscribedSymbols([...subscribedSymbols, symbolName.toLowerCase()]);
    }
    setSymbolName("");
    console.log("added");
  };

  return (
    <div className="app">
      <div className="watch-container">
        <h2>Market Watch App</h2>
        <div className="add-symbol">
          <p>
            <strong>Subscribe Symbol:</strong>
          </p>
          <div className="add-form">
            <input
              type="text"
              className="symbol-input"
              value={symbolName}
              onChange={(e) => setSymbolName(e.target.value)}
            />
            <button className="add-button" onClick={subscribeSymbol}>
              add
            </button>
          </div>
        </div>
        <SubscribedTable />
      </div>
    </div>
  );
}

export default App;
