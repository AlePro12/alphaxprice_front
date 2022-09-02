import AlphaApi_Fetch from "./httpservice";
const getProd = {
  getProdByCodProd(CodProd) {
    return AlphaApi_Fetch(
      "/GetProductByCodProd?CodProd=" + CodProd,
      "GET",
      {},
      ""
    );
  },
};
export default getProd;
//01468
