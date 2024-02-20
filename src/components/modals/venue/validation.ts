import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: yup
    .string()
    .required("description is required")
    .min(3, "description must be at least 3 characters"),
  price: yup.number().required("Price is required"),
  media: yup.string(),
  maxGuests: yup.number().required("Max guests is required"),
  rating: yup.number(),
  wifi: yup.boolean(),
  parking: yup.boolean(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
  address: yup.string(),
  city: yup.string(),
  zip: yup.string(),
  country: yup.string(),
  continent: yup.string(),
  lat: yup.number(),
  lng: yup.number(),
});

export default schema;
