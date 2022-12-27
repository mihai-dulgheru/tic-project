const yup = require('yup');

module.exports = yup.object().shape({
  changePassword: yup.string().trim().required(),
  confirmPassword: yup.string().trim().required(),
});
