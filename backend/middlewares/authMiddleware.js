const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send({status: false, message: 'Access denied.'});

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({status: false, message: 'Invalid token.'});
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
