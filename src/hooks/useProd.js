// Tengo N cantidad de items y esos items tienen diferentes metodos de pago
//Debo de tener una lista de items para poder seleccionar los difentes metodo de pagos
import { useState, useEffect } from "react";
import getProdApi from "../api/getProd_api";
function useProd() {
  const [ProdData, setProd] = useState({});
  const [Load, setLoad] = useState(false);

  useEffect(() => {});
  const GetProd = (CodProd) => {
    return getProdApi.getProdByCodProd(CodProd).then((res) => {
      setProd(res.data);
      alert(JSON.stringify(res.data));
      setLoad(true);
      return res.data;
    });
  };

  return { ProdData, Load, GetProd };
}
export default useProd;
