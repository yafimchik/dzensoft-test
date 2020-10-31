const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

async function connectToMongodb() {
  const result = await mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  return result;
}

module.exports = { connectToMongodb };
