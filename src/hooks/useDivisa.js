import { useState, useEffect } from "react";
import getDivisa from "../api/getDivisa_api";
function useDivisa() {
  const [Divisa, setDivisa] = useState([]);
  const [Load, setLoad] = useState(false);

  useEffect(() => {
    if (!Load) {
      getDivisa.getDivisa().then((res) => {
        setDivisa(res.data);
        setLoad(true);
      });
    }
  });
  //cada 20min se actualiza la divisa :)
  useEffect(() => {
    setTimeout(() => {
      getDivisa.getDivisa().then((res) => {
        setDivisa(res.data);
        setLoad(true);
      });
    }, 1200000);
  }, []);

  return { Divisa, Load };
}
export default useDivisa;
