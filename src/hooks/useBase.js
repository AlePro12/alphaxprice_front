// Tengo N cantidad de items y esos items tienen diferentes metodos de pago
//Debo de tener una lista de items para poder seleccionar los difentes metodo de pagos
import { useState, useEffect } from "react";
import getBaseApi from "../api/getBase_api";
function useBase() {
  const [Base, setBase] = useState([]);
  const [Load, setLoad] = useState(false);

  useEffect(() => {
    if (!Load) {
      getBaseApi.getBase().then((res) => {
        setBase(res.data[0]);
        setLoad(true);
      });
    }
  });

  return { Base, Load };
}
export default useBase;
