import AlphaApi_Fetch from "./httpservice";
const getDivisa = {
  getDivisa() {
    return AlphaApi_Fetch("/Divisa?ts=12s", "GET", {}, "");
  },
};
export default getDivisa;
