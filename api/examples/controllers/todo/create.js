const { pick } = require('lodash');
const { error, initializeFirestore } = require('../../../functions');

module.exports = async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(404, 'Missing required params');
  }

  const { name } = req.body;
  const db = initializeFirestore();
  const todosRef = db.collection('todos');
  const snapshot = await todosRef
    .where('name', '==', name)
    .where('identity.id', '==', me)
    .where('done', '==', false)
    .get();
  if (snapshot.size) {
    throw error(409, 'An identical todo already exists');
  }

  const identitiesRef = db.collection('identities');
  const doc = await identitiesRef.doc(me).get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }

  const payload = {
    done: false,
    identity: {
      ...pick(doc.data(), ['email', 'name']),
      id: doc.id,
    },
    name: name.trim(),
  };

  const response = await todosRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create todo');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Todo created' });
};
