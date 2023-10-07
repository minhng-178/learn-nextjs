import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  TextInput,
} from "react-admin";

export const ProductEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <div />
        <div />
        <NumberInput label="discountPrice" source="discountPrice" />
        <div />
        <TextInput label="title" source="title" />
        <NumberInput label="titlePrice" source="titlePrice" />
        <div />
      </SimpleForm>
    </Edit>
  );
};
