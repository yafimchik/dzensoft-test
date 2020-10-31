const MongodbRepository = require('../../common/prototype.mongodb.repository');

class UsersMongodbRepository extends MongodbRepository {
  async getByLogin(username) {
    const user = await this.Model
      .findOne({ username })
      .select(this.props)
      .exec();
    return user;
  }
}

module.exports = UsersMongodbRepository;
