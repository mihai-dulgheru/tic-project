const { error, initializeFirestore } = require('../../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { me } = req.user;
  if (!id || !me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const todosRef = db.collection('todos').doc(id);
  const doc = await todosRef.get();
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }
  if (doc.data().identity.id !== me) {
    throw error(400, 'Not allowed to update todo');
  }
  const payload = {};
  const { name, identity, done } = req.body;
  if (name) {
    payload.name = name;
  }
  if (identity) {
    payload.identity = identity;
  }
  if (done) {
    payload.done = done;
  }
  await todosRef.update(payload);
  const data = (await todosRef.get()).data();

  return res.status(200).json({ data, message: 'Todo updated' });
};
