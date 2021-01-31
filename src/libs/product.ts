import ProductWriteForm from "../models/product/product.write";

const checkWriteForm = (data: ProductWriteForm): string => {
  let omission: string = ``;
  if (!data.name) omission += `'이름'`;
  if (!data.price) omission += `'가격'`;
  console.log(omission);
  return omission;
};

export { checkWriteForm };
