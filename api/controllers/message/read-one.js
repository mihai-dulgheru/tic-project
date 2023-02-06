const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { userId, messageId } = req.params;
  if (!userId || !messageId) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(userId);
  const identityDoc = await identityRef.get();
  if (!identityDoc.exists) {
    throw error(404, 'Identity not found');
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
  const data = messageDoc.data();
  data.id = messageDoc.id;

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
  data.coach = { id: coachId, email, firstName, lastName };

  return res.status(200).json(data);
};
