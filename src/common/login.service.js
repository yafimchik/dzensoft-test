const cryptService = require('./crypt.service');
const jwtService = require('./jwt.service');
const { usersService } = require('../resources/users/user.service');

class LoginService {
  constructor(usersServ, jwtServ, cryptServ) {
    this.jwtService = jwtServ;
    this.usersService = usersServ;
    this.cryptService = cryptServ;
  }

  async login(login, pswd) {
    if (!login || !pswd) {
      return null;
    }

    const user = await this.usersService.getByLogin(login);
    if (!user) return null;

    const result = await this.cryptService.compareStringWithHash(
      pswd,
      user.password,
    );
    if (result) {
      const jwt = await this.jwtService.generateJWT(user);
      return jwt;
    }
    return null;
  }
}

const loginService = new LoginService(usersService, jwtService, cryptService);

module.exports = loginService;
