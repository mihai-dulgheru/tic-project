const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(404, 'Missing required params');
  }

  const { areas, description, email, firstName, hourlyRate, lastName } =
    req.body;
  const db = initializeFirestore();
  const coachesRef = db.collection('coaches');
  const snapshot = await coachesRef.where('email', '==', email).get();
  if (snapshot.size) {
    throw error(409, 'A coach with this email already exists');
  }

  const payload = {
    areas,
    description: description.trim(),
    email: email.trim(),
    firstName: firstName.trim(),
    hourlyRate,
    lastName: lastName.trim(),
    createdAt: new Date(),
  };

  const response = await coachesRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create coach');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({
    data,
    message: 'Coach created successfully',
    success: true,
  });
};
