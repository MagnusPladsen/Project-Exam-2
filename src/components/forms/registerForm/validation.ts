import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(
      /@(stud\.)?noroff\.no$/,
      "Email must be @stud.noroff.no or @noroff.no"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  avatar: yup.string().url("Avatar must be a valid URL"),
  venueManager: yup.boolean().required("Venue manager is required"),
});

export default schema;
