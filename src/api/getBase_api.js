import AlphaApi_Fetch from "./httpservice";
const getBase = {
  getBase() {
    return AlphaApi_Fetch("/GetBase", "GET", {}, "");
  },
};
export default getBase;
