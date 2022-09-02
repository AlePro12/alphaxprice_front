import React, { useState, useEffect } from 'react';
import useProd from "./hooks/useProd";
import useDivisa from "./hooks/useDivisa";

//Imagenes
import flecha from './images/flecha.png';
import barra from './images/barra.png';
import AlphaXPrice from './images/AlphaXPrice.png';
import unitario from './images/unitario.png';
import mayor from './images/mayor.png';
import logo from './images/logo.png';

function App() {
    const { ProdData, Load, GetProd } = useProd();
    const [Barcode, setBarcode] = useState(""); //01468
    const [ShowProd, setShowProd] = useState(false);
    const { Divisa, Load: LoadDivisa } = useDivisa();
    useEffect(() => {
        console.log("Barcode: " + Barcode);
    }, [Barcode]);

    if (!LoadDivisa) {
        return <div>Cargando Divisa...</div>;
    }


    return (

        <div className="container-fluid Body">
            {/* Aqui se muestra el codigo de barra y el logo de Alpha */}
            <div className='row'>
                <div className='col-6 info'>
                    <div className='infoTextContent col-6'>
                        <p className='infoText'>Escanea su Producto<br />Aquí</p>
                    </div>
                    <div className='infoImgContent'>
                        <img className='infoImgFlecha' src={flecha} alt="imgFlecha" />
                        <img className='infoImgCBarra' src={barra} alt="imgCBarra" />
                    </div>
                </div>
                <div className='col-6 logoApp d-flex justify-content-end'>
                    <img className='imgLogoApp' src={AlphaXPrice} alt="imgLogoApp" />
                </div>
            </div>

            {/*Nombre del producto*/}
            <div className='row'>
                <div className='col-12 consulta d-flex justify-content-center mt-2'>
                    <div className='col-6 consultaContent'>
                        <p className='consultaText'>
                            {ShowProd ? (
                                ProdData.Descrip
                            ) : null}
                        </p>
                    </div>
                </div>

                {/*Tarjeta de tasas*/}
                <div className='col-6 d-flex containerTarjetas mt-5'>
                    <div className='tarjeta col-6'>
                        <p className='tarjetaText'>Precio Detal</p>
                        <div className='costos d-flex justify-content-end col-12'>
                            <img className='imgUnitario' src={unitario} alt="icon-unitario" />
                            <div className='costoContent d-flex flex-column justify-content-end col-6'>
                                <p className='costoDolar'>$<span>111111</span></p>

                                <p className='costoBolivar'><span>100000</span> Bs</p>
                            </div>
                        </div>
                    </div>

                    <div className='tarjeta tarjeta-2 col-6'>
                        <p className='tarjetaText'>Al Mayor</p>
                        <div className='costos d-flex justify-content-end col-12'>
                            <img className='imgMayor' src={mayor} alt="icon-unitario" />
                            <div className='costoContent d-flex flex-column justify-content-end col-6'>
                                <p className='costoDolar'>$<span className='dolar'>111111</span></p>

                                <p className='costoBolivar'><span className='bolivar'>100000</span> Bs</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Aqui se muestra el logo, input de busqueda y tasa del dia */}
                <div className='col-6'>
                    <div className='logoContent d-flex justify-content-end col-12'>
                        <img className='logoEmpresa' src={logo} alt="logo-empresa" />
                    </div>
                    <div className='inputContent d-flex justify-content-end col-12'>

                        <div className="input-group inputContainer">
                            <input type="text" className="form-control" placeholder="Ingrese Codigo" aria-label="Recipient's username" aria-describedby="button-addon2" 
                                onChange={
                                    //onenter
                                    (e) => {
                                setBarcode(e.target.value);
                            }}/>
                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={() => {
                                GetProd(Barcode);
                                ShowProd(true);
                            }}>Buscar</button>
                        </div>
                    </div>
                    <div className='tasaContainer d-flex justify-content-end mt-2 col-12'>
                        <div className='tasaContent'>
                            <p className="tasaTitulo">Cambio del Dia</p>
                            <p className="tasa">$<span className="tasaDolar">1223</span></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
export default App;