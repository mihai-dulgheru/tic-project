const identities = require('./seeds/001_identities');
const todos = require('../examples/db/seeds/002_todos');

const seed = async () => {
  await identities.seed();
  await todos.seed();
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
