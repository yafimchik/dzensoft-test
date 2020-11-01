const BadRequestError = require('../errors/bad-request.error');

class MongodbRepository {
  constructor(Model, propsArray) {
    this.Model = Model;
    this.propsArray = propsArray;
  }

  get props() {
    return this.propsArray.join(' ');
  }

  async getAll() {
    const result = await this.Model
      .find()
      .select(this.props)
      .exec();
    return this.toObject(result);
  }

  async getById(id) {
    const result = await this.Model
      .findById(id)
      .select(this.props)
      .exec();
    return this.toObject(result);
  }

  async post(obj) {
    if (typeof obj !== 'object') {
      return null;
    }

    const newRecord = new this.Model(obj);
    const result = await MongodbRepository.safeWrite(newRecord.save());
    return this.toObject(result);
  }

  async put(id, obj) {
    const result = await MongodbRepository.safeWrite(
      this.Model.findByIdAndUpdate(id, obj).exec(),
    );
    return this.toObject(result);
  }

  async deleteById(id) {
    const result = await this.Model.findByIdAndDelete(id).exec();
    return this.toObject(result);
  }

  static async safeWrite(action) {
    try {
      const result = await action;
      return result;
    } catch (err) {
      return MongodbRepository.handleMongodbErrors(err);
    }
  }

  toObject(result) {
    if (!result) return result;
    const props = [...this.propsArray];
    props.push('_id');

    if (result instanceof Array) {
      return result.map((rec) => {
        const newRec = {};
        props.forEach((prop) => {
          newRec[prop] = rec[prop];
        });
        return newRec;
      });
    }

    if (typeof result === 'object') {
      const newRec = {};
      props.forEach((prop) => {
        newRec[prop] = result[prop];
      });
      return newRec;
    }
    return result;
  }

  static handleMongodbErrors(result) {
    if (result && result.driver && result.code === 11000) {
      throw new BadRequestError(
        `${Object.keys(result.keyValue)
          .join(', ')
          .toUpperCase()} must be unique`,
      );
    }
    return result;
  }
}

module.exports = MongodbRepository;
