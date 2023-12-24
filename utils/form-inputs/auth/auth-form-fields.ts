export const registerFormFields = [
  {
    fieldName: "name",
    label: "Your name",
    type: "text",
    placeholder: "First and last name",
  },
  {
    fieldName: "email",
    label: "Email address",
    type: "text",
  },
  {
    fieldName: "password",
    label: "Password",
    type: "password",
    description: "Password must be at least 6 characters.",
  },
  {
    fieldName: "name",
    label: "Confirm password",
    type: "password",
  },
] as const;

export const loginFormFields = [
  {
    fieldName: "email",
    label: "Email",
    type: "text",
  },
  {
    fieldName: "password",
    label: "Password",
    type: "password",
  },
] as const;
