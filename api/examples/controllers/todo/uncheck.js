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
  await todosRef.update({ done: false });
  const data = (await todosRef.get()).data();

  return res.status(200).json({ data, message: 'Undo completed todo' });
};
