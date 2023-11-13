const fs = require('fs');
const crypto = require('crypto');

(() => {
  const example = '.env.example';

  if (!fs.existsSync(example)) {
    return;
  }

  const env = fs.readFileSync(example);

  const data = env
    .toString()
    .replace('%secret%', `'${crypto.randomBytes(32).toString('hex')}'`);

  if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', data);
  }

  if (!fs.existsSync('.env.dev')) {
    fs.writeFileSync('.env.dev', data);
  }
})();
