function validateMongoId(id) {
  var regex = /^[a-f0-9]{24}$/i
  return regex.test(id);
}

module.exports = validateMongoId;