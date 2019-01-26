const getLoginInfo = require('../getLoginInfo').getLoginInfo;

const handleRegister = (database, bcrypt) => (req, res) => {
  const { password, email, username, service } = req.body;
  if (!password || !email || !username ) {
    return res(400).json("empty field");
  }
  let serviceIdName;
  bcrypt.hash(password, null, null, function(err, hash) {
    if (err) {
      console.error(err);
      return res.status(400).json("couldn't register")
    }
    database.transaction(trx => {
      let fbData, tttData;
      return trx.insert({
        username,
        email,
        password : hash
      }, 'id')
      .into('users')
      .then(userId => {
        return trx.insert({fb_id : userId[0]}, '*')
        .into('facebrain');
      })
      .then(result => {
        fbData = result;
        return trx.insert({ttt_id : result[0].fb_id}, '*')
        .into('tictactoe');
      })
      .then(result => {
        tttData = result;
        if (service === 'facebrain') {
          return trx.commit(fbData);
        } else if (service === 'tictactoe') {
          return trx.commit(tttData);
        }
        return trx.commit();
      })
      .catch(err => {
        trx.rollback();
        throw new Error("Rollback occured", err);
      });
    })
    .then(result => {
      res.status(200).json({
        username,
        email,
        id : [result[0][serviceIdName]],
        ...result[0]
      })
    })
    .catch( err => {
      console.error(err);
      res.status(400).json('This account already exists');
    })
  })
}

module.exports = {
  handleRegister : handleRegister
};