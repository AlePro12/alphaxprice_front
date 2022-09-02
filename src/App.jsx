import React, { useState, useEffect, useRef } from "react";
import useProd from "./hooks/useProd";
import useDivisa from "./hooks/useDivisa";
import MediaQuery from "react-responsive";

import { formatNumber } from "accounting-js";
//Imagenes
import flecha from "./images/flecha.png";
import BCV from "./images/BCV.jsx";

import barra from "./images/barra.png";
import AlphaXPrice from "./images/AlphaXPrice.png";
import unitario from "./images/unitario.png";
import mayor from "./images/mayor.png";
import logo from "./images/logo.png";
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
function App() {
  const [inputRef, setInputFocus] = useFocus();

  const { ProdData, Load, GetProd, setProd } = useProd();
  const [Barcode, setBarcode] = useState(""); //01468
  const [ShowProd, setShowProd] = useState(false);
  const { Divisa, Load: LoadDivisa } = useDivisa();
  //always focus on the barcode input
  useEffect(() => {
    setInputFocus();
    if (document.getElementById("barcode")) {
      document.getElementById("barcode").focus();
    }
  }, []);

  useEffect(() => {
    console.log("Barcode: " + Barcode);
  }, [Barcode]);
  useEffect(() => {
    var prod = ProdData;
    if (ShowProd) {
      //en 10 segundos se oculta el
      setTimeout(() => {
        if (prod.CodProd === ProdData.CodProd) {
          setShowProd(false);
          document
            .getElementById("Tarjetas")
            .classList.add("containerTarjetas");
          document.getElementById("Tarjetas").classList.remove("animated");
        }
      }, 10000);
    }
  }, [ShowProd]);
  if (!LoadDivisa) {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            style={{
              width: "150px",
            }}
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">Cargando Divisa...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="container-fluid Body">
      {/* Aqui se muestra el codigo de barra y el logo de Alpha */}
      <div className="row">
        <div className="col-6 info">
          <div className="infoTextContent col-6">
            <p className="infoText">
              Escanea su Producto
              <br />
              Aquí
            </p>
          </div>
          <div className="infoImgContent">
            <img className="infoImgFlecha" src={flecha} alt="imgFlecha" />
            <img className="infoImgCBarra" src={barra} alt="imgCBarra" />
          </div>
        </div>
        <div className="col-6 logoApp d-flex justify-content-end">
          <img
            className="logoEmpresa"
            src={logo}
            alt="logo-empresa"
            width="auto"
          />
          <img className="imgLogoApp" src={AlphaXPrice} alt="imgLogoApp" />
        </div>
      </div>

      {/*Nombre del producto*/}
      <div className="row">
        <div className="col-12 consulta d-flex justify-content-center mt-2">
          <div className="col-6 consultaContent">
            <p className="consultaText">
              {ShowProd ? ProdData.Descrip : "Consulte Precios Aquí!"}
            </p>
          </div>
        </div>

        {/*Tarjeta de tasas*/}
        <div id="Tarjetas" className="col-8 d-flex containerTarjetas mt-5">
          <div className="tarjeta col-6">
            <p className="tarjetaText">Precio Detal</p>
            <div className="costos d-flex justify-content-end col-12">
              <img className="imgUnitario" src={unitario} alt="icon-unitario" />
              <div className="costoContent d-flex flex-column justify-content-end col-6">
                <div className="costoDolar">
                  <span>{ShowProd ? ProdData.Precio1 : "0.00"}</span>$
                </div>
                <div className="costoBolivar">
                  <span>
                    {ShowProd
                      ? formatNumber(
                          parseFloat(ProdData.Precio1) *
                            parseFloat(Divisa.Factor)
                        )
                      : "0.00"}
                  </span>{" "}
                  Bs
                </div>
              </div>
            </div>
          </div>

          <div className="tarjeta tarjeta-2 col-6">
            <p className="tarjetaText">Al Mayor</p>
            <div className="costos d-flex justify-content-end col-12">
              <img className="imgMayor" src={mayor} alt="icon-unitario" />
              <div className="costoContent d-flex flex-column justify-content-end col-6">
                <div className="costoDolar">
                  <span>{ShowProd ? ProdData.Precio2 : "0.00"}</span>$
                </div>

                <div className="costoBolivar">
                  <span>
                    {ShowProd
                      ? formatNumber(
                          parseFloat(ProdData.Precio2) *
                            parseFloat(Divisa.Factor)
                        )
                      : "0.00"}
                  </span>{" "}
                  Bs{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Aqui se muestra el logo, input de busqueda y tasa del dia */}
        <div className="col-4">
          <div className="inputContent d-flex justify-content-end col-12">
            <div className="input-group inputContainer">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese Código"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                id="barcode"
                ref={inputRef}
                autoFocus
                value={Barcode}
                onChange={
                  //onenter
                  (e) => {
                    setBarcode(e.target.value);
                  }
                }
                //on enter key
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    GetProd(Barcode).then((res) => {
                      if (res.Descrip !== "") {
                        setShowProd(true);
                        //add class to id Tarjetas
                        document
                          .getElementById("Tarjetas")
                          .classList.add("animated");
                        //remove class to id Tarjetas containerTarjetas
                        document
                          .getElementById("Tarjetas")
                          .classList.remove("containerTarjetas");
                        setBarcode("");
                      } else {
                        setBarcode("");
                        setShowProd(true);
                        ProdData.Descrip = "Producto no encontrado";
                        setProd({
                          Descrip: "Producto no encontrado",
                          ...ProdData,
                        });
                      }
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className="tasaContainer d-flex justify-content-end mt-2 col-12">
            <div className="tasaContent">
              <div className="col-12 ms-2 mt-1 d-flex">
                <BCV
                  style={{
                    width: "20px",
                  }}
                />
              <div className="d-flex flex-column justify-content-end col-9">
                <p className="tasaTitulo">Cambio del Dia</p>
                <p className="tasa">
                  $<span className="tasaDolar">{Divisa.Factor}</span>
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
