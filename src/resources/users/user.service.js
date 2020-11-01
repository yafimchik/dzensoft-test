const Service = require('../../common/prototype.service');

const UsersMongodbRepository = require('./user.mongodb.repository');
const { UserModel, UserProps } = require('./user.model');
const NotFoundError = require('../../errors/not-found.error');

class UsersService extends Service {
  async getByLogin(login) {
    const user = await this.repo.getByLogin(login);
    if (!user) {
      throw new NotFoundError('no any user with such login');
    }
    return user;
  }
}

module.exports = {
  usersService: new UsersService(UsersMongodbRepository, UserModel, UserProps),
};
