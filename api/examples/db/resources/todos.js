const { pick } = require('lodash');
const { initializeFirestore } = require('../../../functions');
const chance = require('../../../lib/chance');

module.exports = async () => {
  const db = initializeFirestore();
  const identitiesRef = db.collection('identities');
  const snapshot = await identitiesRef.get();
  const identities = snapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });

  return [
    {
      identity: pick(identities[0], ['id', 'name', 'email']),
      name: 'Make a todo list',
      done: chance.bool(),
    },
    {
      identity: pick(identities[0], ['id', 'name', 'email']),
      name: 'Add integration tests',
      done: chance.bool(),
    },
    {
      identity: pick(identities[0], ['id', 'name', 'email']),
      name: 'Complete starter project',
      done: chance.bool(),
    },
    {
      identity: pick(identities[1], ['id', 'name', 'email']),
      name: 'Make fun of Dwight',
      done: chance.bool(),
    },
    {
      identity: pick(identities[1], ['id', 'name', 'email']),
      name: 'Go home at 5PM sharp',
      done: chance.bool(),
    },
  ];
};
