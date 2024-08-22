const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.['token']; 
  req.user = null;

  if (!tokenCookie) {
    return next(); // If no auth header, proceed to the next middleware
  }

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login"); // If no user is authenticated, redirect to login
    if (!roles.includes(req.user.role)) return res.status(403).send("Unauthorized"); // If user role is not allowed, return unauthorized
    return next(); // If everything is fine, proceed to the next middleware
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};


// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//      const userUid = req.headers['Authorization'];

//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split('Bearer ')[1];
//   const user = getUser(token);
 
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;
//   // const userUid = req.headers['Authorization'];
//   // const token = userUid.split('Bearer ')[1];
//   // const user = getUser(token);
//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

// module.exports = {
//   restrictToLoggedinUserOnly,
//   checkAuth,
// };
