const { PORT } = require('./common/config');
const { connectToMongodb } = require('./common/mongodb.database');

const app = require('./app');

async function startApp() {
  await connectToMongodb();
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
}

startApp();
