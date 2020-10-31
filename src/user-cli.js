#!/usr/bin/env node
const program = require('commander');
const { usersService } = require('./resources/users/user.service');
const cryptService = require('./common/crypt.service');
const pkg = require('../package.json');
const { connectToMongodb } = require('./common/mongodb.database');

async function createUser() {
  const options = program.commands[0];
  const userObj = {
    username: options.user.trim(),
    password: options.password.trim(),
    email: options.email.trim(),
  };

  userObj.password = await cryptService.toHash(userObj.password);

  let result;
  try {
    console.log('start request');
    await connectToMongodb();
    result = await usersService.create(userObj);
  } catch (e) {
    console.error(e);
  }
  if (!result) {
    console.error(result);
  } else {
    console.log(result);
  }
}

async function updateUser() {
  const options = program.commands[1];

  const userObj = {
    username: options.user.trim(),
    password: options.password.trim(),
    email: options.email.trim(),
  };

  userObj.password = await cryptService.toHash(userObj.password);

  let result;
  try {
    console.log('start request');
    await connectToMongodb();
    const user = await usersService.getByLogin(userObj.username);
    if (!user) {
      console.error('user not found');
      return;
    }

    // eslint-disable-next-line no-underscore-dangle
    result = await usersService.update(user._id, userObj);
  } catch (e) {
    console.error(e);
  }
  if (!result) {
    console.error(result);
  } else {
    console.log(result);
  }
}

async function deleteUser() {
  const options = program.commands[2];

  const username = options.user.trim();

  let result;
  try {
    console.log('start request');
    await connectToMongodb();
    const user = await usersService.getByLogin(username);
    if (!user) {
      console.error('user not found');
      return;
    }
    // eslint-disable-next-line no-underscore-dangle
    result = await usersService.deleteById(user._id);
  } catch (e) {
    console.error(e);
  }
  if (!result) {
    console.error(result);
  } else {
    console.log(result);
  }
}

async function run() {
  program
    .version(pkg.version)
    .description('mongodb-users-cli');

  program
    .command('create')
    .requiredOption('-u, --user <value>', 'username (login)')
    .requiredOption('-p, --password <value>', 'user password')
    .requiredOption('-e, --email <email>', 'email adress')
    .action(createUser);

  program
    .command('update')
    .requiredOption('-u, --user <value>', 'username (login)')
    .requiredOption('-p, --password <value>', 'user password')
    .requiredOption('-e, --email <email>', 'email adress')
    .action(updateUser);

  program
    .command('delete')
    .requiredOption('-u, --user <value>', 'username (login)')
    .action(deleteUser);

  program.on('--help', () => {
    console.log('');
    console.log('Example call: node ./src/user-cli delete -u username');
    console.log('Example call: node ./src/user-cli update -u username -p 12345 -e jk@mail.ru');
    console.log('Example call: node ./src/user-cli create -u username -p 12345 -e jk@mail.ru');
  });

  try {
    await program.parseAsync(process.argv);
  } catch (e) {
    console.error(e);
  }
  process.exit();
}

run();
