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

  const messageRef = db
    .collection('messages')
    .doc(userId)
    .collection('messages')
    .doc(messageId);
  const messageDoc = await messageRef.get();
  if (!messageDoc.exists) {
    throw error(404, 'Message not found');
  }

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
    ...messageDoc.data(),
    id: messageDoc.id,
    coach: { id: coachId, email, firstName, lastName },
  };

  await messageRef.delete();

  const requestRef = db
    .collection('requests')
    .doc(coachId)
    .collection('messages')
    .doc(messageId);
  const requestDoc = await requestRef.get();
  if (!requestDoc.exists) {
    throw error(404, 'Request not found');
  }

  await requestRef.delete();

  return res
    .status(200)
    .json({ data, message: 'Message removed successfully', success: true });
};
