const chance = require('../../lib/chance');
const { hashSync } = require('bcryptjs');

module.exports = async () => {
  const roles = ['admin', 'client'];

  return [
    {
      email: 'mihai@email.com',
      name: 'Mihai-Nicolae Dulgheru',
      password: hashSync('supersecretpassword'),
      role: 'admin',
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      createdAt: new Date(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      createdAt: new Date(),
    },
  ];
};
