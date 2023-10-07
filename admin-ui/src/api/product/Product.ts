import { JsonValue } from "type-fest";

export type Product = {
  colors: JsonValue;
  createdAt: Date;
  description: JsonValue;
  discountPrice: number;
  id: string;
  images: JsonValue;
  title: string;
  titlePrice: number;
  updatedAt: Date;
  variants: JsonValue;
};
