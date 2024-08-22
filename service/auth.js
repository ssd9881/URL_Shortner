const jwt = require("jsonwebtoken")
const secret = 'random'

function setUser(user) {
  // const payload = {
  //   ...user,
  // };
  return jwt.sign({
    id:user._id,
    email:user.email,
    role:user.role,
  },secret);
  // sessionIdToUserMap.set(id, user);
}

function getUser(token) {
  if (!token) return null;
  
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return null;
  }
}


module.exports = {
  setUser,
  getUser,
};