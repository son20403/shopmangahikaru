Validator({
  form: "#form-login",
  formGroupSelector: ".form-group",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired(".user_name"),
    Validator.minLength(".user_name"),
    Validator.isRequired(".password"),
    Validator.minLength(".password"),
  ],
});
