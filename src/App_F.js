import logo from "./logo.svg";
import "./App.css";
import useProd from "./hooks/useProd";
import useDivisa from "./hooks/useDivisa";

import { useState, useEffect } from "react";
function App() {
  const { ProdData, Load, GetProd } = useProd();
  const [Barcode, setBarcode] = useState(""); //01468
  const [ShowProd, setShowProd] = useState(false);
  const { Divisa, Load: LoadDivisa } = useDivisa();
  useEffect(() => {
    console.log("Barcode: " + Barcode);
  }, [Barcode]);
  useEffect(() => {
    if (ShowProd) {
      //en 10 segundos se oculta el
      setTimeout(() => {
        setShowProd(false);
      }, 10000);
    }
  }, [ShowProd]);
  if (!LoadDivisa) {
    return <div>Cargando Divisa...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">{Divisa.Factor + " " + Divisa.CodMone}</h1>
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
              GetProd(Barcode).then((res) => {
                setShowProd(true);
              });
            }}
          >
            Buscar
          </button>
          {ShowProd ? (
            <>
              <h3>{ProdData.Descrip}</h3>
              <h3>{ProdData.Precio1} $</h3>
              <h3>
                {parseFloat(ProdData.Precio1) * parseFloat(Divisa.Factor)} Bs
              </h3>
            </>
          ) : null}
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
