const getLoginInfo = require('../getLoginInfo').getLoginInfo;
const formatDataToBeReturned = require('../formatDataToBeReturned').formatDataToBeReturned;

const handleSignin = (database, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  getLoginInfo(database)(email)
  .then(data => {
    if (!data) {return res.status(422).json('Bad credentials')}
    const { hash, ...dataToSend } = data;
    bcrypt.compare(password, hash, (err, hashRes) => {
      if (hashRes) {
        res.status(200).json(formatDataToBeReturned(dataToSend));
      } else {
        res.status(422).json('Bad credentials');
      }
    })
  })
  .catch(console.error);
}

module.exports = {
  handleSignin: handleSignin
};