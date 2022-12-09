const { isEmpty } = require('lodash');
const { error, initializeFirestore } = require('../../../functions');

module.exports = async (req, res) => {
  const { me } = req.user;
  const { only } = req.query;
  if (!me) {
    throw error(404, 'Missing required params');
  }

  const filter = ['identity.id', '==', me];
  let filterOnly = [];
  if (only === 'completed') {
    filterOnly = ['done', '==', true];
  }
  if (only === 'pending') {
    filterOnly = ['done', '==', false];
  }

  const db = initializeFirestore();
  const todosRef = db.collection('todos');
  let snapshot;
  if (isEmpty(filterOnly)) {
    snapshot = await todosRef.where(...filter).get();
  } else {
    snapshot = await todosRef
      .where(...filter)
      .where(...filterOnly)
      .get();
  }
  const data = snapshot.docs.map((doc) => doc.data());

  return res.status(200).json(data);
};
