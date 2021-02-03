import date from "../../libs/date";

const getTimeFormatProducts = (dbProducts: any): any[] => {
  let products: any[] = [];

  if (dbProducts.constructor === Array) {
    const now = new Date();
    products = dbProducts.map((product) => {
      return {
        ...product._doc,
        timeDiff: date.timeDifference(now, product.createdAt),
      };
    });
    return products;
  }
  return [];
};

export default getTimeFormatProducts;
