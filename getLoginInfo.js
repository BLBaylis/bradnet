const getLoginInfo = database => email => {
  return database('users')
    .where('email', '=', email)
    .then(data => data[0])
    .catch(console.error)
}

module.exports = {getLoginInfo: getLoginInfo}
