const validator = require('validator');
const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { userId, messageId } = req.params;
  const { me } = req.user;
  if (!userId || !messageId || !me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(userId);
  const identityDoc = await identityRef.get();
  if (!identityDoc.exists) {
    throw error(404, 'Identity not found');
  }

  const updates = req.body;
  const allowedUpdates = ['email', 'message'];
  const isValidUpdate = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    throw error(400, 'Invalid updates');
  }

  const messageRef = db
    .collection('messages')
    .doc(userId)
    .collection('messages')
    .doc(messageId);
  const messageDoc = await messageRef.get();
  if (!messageDoc.exists) {
    throw error(404, 'Message not found');
  }

  for (const [key, value] of Object.entries(updates)) {
    if (key === 'email') {
      if (!validator.isEmail(value)) {
        throw error(400, 'Invalid email');
      }
    } else if (key === 'message') {
      if (!validator.isLength(value, { min: 2, max: 300 })) {
        throw error(400, 'Invalid message');
      }
    }
  }

  const updatedAt = new Date();
  await messageRef.update({ ...updates, updatedAt });
  const doc = await messageRef.get();

  const {
    coach: { id: coachId },
  } = (await db.collection('messages').doc(userId).get()).data();
  if (!coachId) {
    throw error(404, 'Coach not found');
  }
  const coachRef = db.collection('coaches').doc(coachId);
  const coachDoc = await coachRef.get();
  if (!coachDoc.exists) {
    throw error(404, 'Coach not found');
  }

  const { email, firstName, lastName } = coachDoc.data();
  const data = {
    ...doc.data(),
    id: doc.id,
    coach: { id: coachId, email, firstName, lastName },
  };

  const requestRef = db
    .collection('requests')
    .doc(coachId)
    .collection('messages')
    .doc(messageId);
  const requestDoc = await requestRef.get();
  if (!requestDoc.exists) {
    throw error(404, 'Request not found');
  }
  await requestRef.update({ ...updates, updatedAt });

  return res
    .status(200)
    .json({ data, message: 'Message updated successfully', success: true });
};
