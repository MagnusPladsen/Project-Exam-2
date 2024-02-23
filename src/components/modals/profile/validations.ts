import * as yup from "yup";

const schema = yup.object().shape({
  avatar: yup.string().required("Image url is required"),
});

export default schema;
