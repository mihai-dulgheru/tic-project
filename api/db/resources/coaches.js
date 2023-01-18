const chance = require('../../lib/chance');

module.exports = async () => {
  const areas = ['frontend', 'backend', 'career'];

  return [
    {
      areas: chance.pickset(areas, 2),
      description: chance.paragraph(),
      email: chance.email(),
      firstName: chance.first(),
      hourlyRate: chance.integer({ min: 10, max: 100 }),
      lastName: chance.last(),
    },
    {
      areas: chance.pickset(areas, 2),
      description: chance.paragraph(),
      email: chance.email(),
      firstName: chance.first(),
      hourlyRate: chance.integer({ min: 10, max: 100 }),
      lastName: chance.last(),
    },
    {
      areas: chance.pickset(areas, 2),
      description: chance.paragraph(),
      email: chance.email(),
      firstName: chance.first(),
      hourlyRate: chance.integer({ min: 10, max: 100 }),
      lastName: chance.last(),
    },
  ];
};
