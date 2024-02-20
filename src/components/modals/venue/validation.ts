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
  price: yup.number().required("Price is required"),
  maxGuests: yup.number().required("Max guests is required"),
  media: yup.string(),
  rating: yup.number().max(5, "Rating must be between 0 and 5").min(0),
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
