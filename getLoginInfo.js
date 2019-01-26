const getLoginInfo = database => (service, serviceIdName, email) => {
  return database('users')
    .innerJoin(service, 'id', serviceIdName)
    .where('email', '=', email)
    .then(data => data[0])
    .catch(console.error)
}

module.exports = {
  getLoginInfo : getLoginInfo,
}
