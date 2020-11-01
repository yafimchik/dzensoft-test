const mongoose = require('mongoose');

const feedbackModelName = 'feedback';

const feedbackType = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  lastUser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  changeLog: [{
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    date: Date,
  }],
};

const FeedbackProps = Object.keys(feedbackType);
FeedbackProps.push('id');

const feedbackSchema = new mongoose.Schema(feedbackType, { id: true });

// feedbackSchema.pre('findByIdAndUpdate', function () {
//   // eslint-disable-next-line no-underscore-dangle
//   console.log('findByIdAndUpdate HOOK');
//   this._update.changeLog.push({ userId: this._update.lastUser, date: new Date() });
// });

const FeedbackModel = mongoose.model(feedbackModelName, feedbackSchema);

module.exports = { FeedbackModel, FeedbackProps };
