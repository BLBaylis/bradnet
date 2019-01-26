const getLoginInfo = require('../getLoginInfo').getLoginInfo;

const handleSignin = (database, bcrypt) => (req, res) => {
  const { email, password, service } = req.body;
  let serviceIdName;
  if (service === 'facebrain') {serviceIdName = 'fb_id'}
  if (service === 'tictactoe') {serviceIdName = 'ttt_id'}
  getLoginInfo(database)(service, serviceIdName, email)
  .then(data => {
    const {password : hash, ...dataToSend} = data;
    bcrypt.compare(password, hash, (err, hashRes) => {
      if (hashRes) {
        res.status(200).json(dataToSend);
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