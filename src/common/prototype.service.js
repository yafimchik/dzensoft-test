const BadRequestError = require('../errors/bad-request.error');
const NotFoundError = require('../errors/not-found.error');

class Service {
  constructor(Repo, Model, Props) {
    this.repo = new Repo(Model, Props);
  }

  async getAll() {
    const result = await this.repo.getAll();
    if (!result) {
      throw new BadRequestError('get all query error');
    }
    return result;
  }

  async getById(id) {
    const result = await this.repo.getById(id);
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }

  async create(obj) {
    const result = await this.repo.post(obj);
    if (!result) {
      throw new BadRequestError('create entity error');
    }
    return result;
  }

  async update(id, obj) {
    const result = await this.repo.put(id, obj);
    if (!result) {
      throw new BadRequestError('update entity error');
    }
    return result;
  }

  async deleteById(id) {
    const result = await this.repo.deleteById(id);
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }
}

module.exports = Service;
