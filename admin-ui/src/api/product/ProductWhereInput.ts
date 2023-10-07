import { JsonFilter } from "../../util/JsonFilter";
import { FloatFilter } from "../../util/FloatFilter";
import { StringFilter } from "../../util/StringFilter";

export type ProductWhereInput = {
  colors?: JsonFilter;
  description?: JsonFilter;
  discountPrice?: FloatFilter;
  id?: StringFilter;
  images?: JsonFilter;
  title?: StringFilter;
  titlePrice?: FloatFilter;
  variants?: JsonFilter;
};
