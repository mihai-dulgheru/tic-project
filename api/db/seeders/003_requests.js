/* eslint-disable no-console */
const requests = require('../resources/requests');
const { initializeFirestore } = require('../../functions');

exports.seed = async () => {
  try {
    console.log('Planting seeds for requests');

    const seeds = await requests();
    const db = initializeFirestore();
    const coaches = await db.collection('coaches').get();
    const coachesData = coaches.docs.map((coach) => {
      const coachData = coach.data();
      return { id: coach.id, ...coachData };
    });
    let batch = db.batch();
    seeds.forEach((seed, index) => {
      let ref = db
        .collection('requests')
        .doc(coachesData[index % coachesData.length].id)
        .collection('messages')
        .doc();
      batch.set(ref, seed);
    });
    await batch.commit();

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add requests');
    console.error(err);
  }
};
