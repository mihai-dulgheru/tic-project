const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const identityRef = db.collection('identities').doc(userId);
  const identityDoc = await identityRef.get();
  if (!identityDoc.exists) {
    throw error(404, 'Identity not found');
  }

  const messageRef = db.collection('messages').doc(userId);
  const messageDoc = await messageRef.get();
  if (!messageDoc.exists) {
    return res.status(200).json([]);
  }
  const snapshot = await messageRef.collection('messages').get();
  if (snapshot.empty) {
    return res.status(200).json([]);
  }

  const {
    coach: { id: coachId },
  } = messageDoc.data();
  const coachRef = db.collection('coaches').doc(coachId);
  const coachDoc = await coachRef.get();
  if (!coachDoc.exists) {
    throw error(404, 'Coach not found');
  }
  const { email, firstName, lastName } = coachDoc.data();

  const data = snapshot.docs.map((doc) => {
    const message = doc.data();
    message.id = doc.id;
    message.coach = { id: coachId, email, firstName, lastName };
    return message;
  });

  return res.status(200).json(data);
};
