import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be at least 0"),
  maxGuests: yup
    .number()
    .typeError("Max guests must be a number")
    .required("Max guests is required"),
  media: yup.string(),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .max(5, "Rating must be between 0 and 5")
    .min(0, "Rating must be between 0 and 5"),
  wifi: yup.boolean(),
  parking: yup.boolean(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
  address: yup.string(),
  city: yup.string(),
  zip: yup.string(),
  country: yup.string(),
});

export default schema;
