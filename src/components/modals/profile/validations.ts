import * as yup from "yup";
import isImageValid from "../../../utils/isImageValid";

const schema = yup.object().shape({
  avatar: yup
    .string()
    .required("Image url is required")
    .test("is-valid", "Invalid image url", (value) => {
      return isImageValid(value);
    }),
});

export default schema;
