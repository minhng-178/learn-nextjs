import { SortOrder } from "../../util/SortOrder";

export type ProductOrderByInput = {
  colors?: SortOrder;
  createdAt?: SortOrder;
  description?: SortOrder;
  discountPrice?: SortOrder;
  id?: SortOrder;
  images?: SortOrder;
  title?: SortOrder;
  titlePrice?: SortOrder;
  updatedAt?: SortOrder;
  variants?: SortOrder;
};
