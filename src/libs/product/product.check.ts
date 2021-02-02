import ProductWriteForm from "../../models/product/product.write";

const checkOmission = (data: ProductWriteForm): string => {
  let omission: string = ``;
  if (!data.name) omission += `'이름'`;
  if (!data.price) omission += `'가격'`;
  return omission;
};

export { checkOmission };
