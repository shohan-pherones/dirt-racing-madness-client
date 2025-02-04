export const signUpInputFields = [
  { name: "name", label: "Name", placeholder: "Enter your name", type: "text" },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    options: [
      { value: "", label: "Choose your gender" },
      { value: "MALE", label: "Male" },
      { value: "FEMALE", label: "Female" },
      { value: "OTHER", label: "Other" },
    ],
  },
  {
    name: "imageUrl",
    label: "Image URL (Optional)",
    placeholder: "Enter image URL",
    type: "text",
  },
  {
    name: "address",
    label: "Address (Optional)",
    placeholder: "Enter your address",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Phone Number (Optional)",
    placeholder: "Enter your phone number",
    type: "tel",
  },
  {
    name: "bio",
    label: "Bio (Optional)",
    placeholder: "Tell us about yourself",
    type: "text",
  },
];
