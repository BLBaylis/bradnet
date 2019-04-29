const getLoginInfo = require('../getLoginInfo').getLoginInfo;
const formatDataToBeReturned = require('../formatDataToBeReturned').formatDataToBeReturned;

const handleRegister = (database, bcrypt) => (req, res) => {
  const { password, email, username } = req.body;
  if (!password || !email || !username ) {
    return res(400).json("empty field");
  }
  bcrypt.hash(password, null, null, function(err, hash) {
    if (err) {
      console.error(err);
      return res.status(400).json("couldn't register")
    }
    return database.insert({
      username,
      email,
      hash
    }, '*')
    .into('users')
    .then(result => {
      const { hash, ...userInfo } = result[0];
      return res.status(200).json(formatDataToBeReturned(userInfo));
    })
    .catch( err => {
      console.error(err);
      res.status(400).json('This account may already exist');
    })
  })
}

module.exports = {
  handleRegister : handleRegister
};