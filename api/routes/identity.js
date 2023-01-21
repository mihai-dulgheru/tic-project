const { Identity } = require('../controllers');
const { Router } = require('express');
const { identitySchema } = require('../schemas');
const { recaptcha, validate } = require('../middleware');

const router = Router();

router.get('/admin/profile', Identity.profile);
router.post(
  '/admin/change-password',
  validate(identitySchema),
  Identity.changePassword
);
// router.post('/login', recaptcha, Identity.login);
router.post('/login', Identity.login);
router.post('/logout', Identity.logout);
router.post('/refresh-token', Identity.refreshToken);

module.exports = router;
