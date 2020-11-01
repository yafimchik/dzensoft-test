const Service = require('../../common/prototype.service');

const MongodbRepository = require('../../common/prototype.mongodb.repository');
const { FeedbackModel, FeedbackProps } = require('./feedback.model');
const { usersService } = require('../users/user.service');

class FeedbacksService extends Service {
  async getById(id) {
    const fb = await super.getById(id);
    const log = fb.changeLog;
    fb.changeLog = [];
    const usersPromises = log.map((rec) => usersService.getById(rec.userId));
    const users = await Promise.all(usersPromises);
    fb.changeLog = log.map((rec) => {
      const newRec = { userId: rec.userId.toString(), date: rec.date };
      // eslint-disable-next-line no-underscore-dangle
      newRec.user = users.find((user) => user._id.toString() === rec.userId.toString());
      return newRec;
    });
    return fb;
  }
}

module.exports = {
  feedbacksService: new FeedbacksService(MongodbRepository, FeedbackModel, FeedbackProps),
};
