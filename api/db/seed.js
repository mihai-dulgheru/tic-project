const identities = require('./seeds/001_identities');

const seed = async () => {
  await identities.seed();
};

(async () => {
  try {
    await seed();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = seed;
