/* eslint-disable no-console */
const { initializeFirestore } = require('../../../functions');
const todos = require('../resources/todos');

exports.seed = async () => {
  try {
    console.log('Planting seeds for todos');

    const seeds = await todos();
    const db = initializeFirestore();
    for (const seed of seeds) {
      await db.collection('todos').add(seed);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert todos');
    console.error(err);
  }
};
