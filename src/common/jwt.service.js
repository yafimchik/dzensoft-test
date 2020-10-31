const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

class JwtService {
  constructor(jwtLib, secret) {
    this.jwt = jwtLib;
    this.secret = secret;
  }

  async generateJWT(user) {
    // eslint-disable-next-line no-underscore-dangle
    const payload = { _id: user._id, username: user.username, email: user.email };
    const token = await this.jwt.sign(payload, this.secret);
    return token;
  }

  async verifyJWT(token) {
    const result = await this.jwt.verify(token, this.secret);
    return result;
  }
}

const jwtService = new JwtService(jwt, JWT_SECRET_KEY);

module.exports = jwtService;
