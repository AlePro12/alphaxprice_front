import logo from "./logo.svg";
import "./App.css";
import useProd from "./hooks/useProd";
import { useState, useEffect } from "react";
function App() {
  const { ProdData, Load, GetProd } = useProd();
  const [Barcode, setBarcode] = useState(""); //01468
  useEffect(() => {
    console.log("Barcode: " + Barcode);
  }, [Barcode]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <input
            type="text"
            //onenter
            onChange={(e) => {
              setBarcode(e.target.value);
            }}
          />
          <button
            onClick={() => {
              GetProd(Barcode);
            }}
          >
            Buscar
          </button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
