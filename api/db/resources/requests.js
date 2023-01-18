const chance = require('../../lib/chance');

module.exports = async () => {
  return [
    {
      email: chance.email(),
      message: chance.paragraph(),
    },
    {
      email: chance.email(),
      message: chance.paragraph(),
    },
    {
      email: chance.email(),
      message: chance.paragraph(),
    },
  ];
};
