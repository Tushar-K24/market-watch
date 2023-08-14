import { createContext, useEffect, useState } from "react";
import { wssBaseUrl } from "../config";

const SymbolsContext = createContext();

const generateQueryString = (symbolsList) => {
  let queryString = "";
  symbolsList.forEach((symbol) => {
    queryString += symbol.toLowerCase() + "@bookTicker/";
  });
  return queryString.substring(0, queryString.length - 1);
};

const symbolsMap = new Map();

const SymbolsContextProvider = ({ children }) => {
  const [subscribedSymbols, setSubscribedSymbols] = useState([]);
  const [wssUrl, setWssUrl] = useState(
    `${wssBaseUrl}/stream?streams=${generateQueryString(subscribedSymbols)}`
  );

  useEffect(() => {
    const newUrl = `${wssBaseUrl}/stream?streams=${generateQueryString(
      subscribedSymbols
    )}`;
    setWssUrl(newUrl);
    if (subscribedSymbols.length) {
      symbolsMap.set(
        subscribedSymbols[subscribedSymbols.length - 1],
        subscribedSymbols.length - 1
      );
    }
    console.log("from symbolsContext: " + newUrl);
  }, [subscribedSymbols]);

  return (
    <SymbolsContext.Provider
      value={{
        subscribedSymbols: subscribedSymbols,
        symbolsMap: symbolsMap,
        wssUrl: wssUrl,
        setSubscribedSymbols: setSubscribedSymbols,
      }}
    >
      {children}
    </SymbolsContext.Provider>
  );
};

export { SymbolsContext, SymbolsContextProvider };
