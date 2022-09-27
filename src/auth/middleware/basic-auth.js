'use strict';

const { User } = require('../../app');

module.exports = async (req, res, next) => {
  /*
  req.headers.authorization is : "Basic sdkjdsljd="
  To get username and password from this, take the following steps:
    - Turn that string into an array by splitting on ' '
    - Pop off the last value
    - Decode that encoded string so it returns to user:pass
    - Split on ':' to turn it into an array
    - Pull username and password from that array
*/
  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
        - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header required.');
    }
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = Buffer.from(encodedString, 'base64').toString('ascii');
    let [username, password] = decodedString.split(':'); // username, password
    
    const user = await User.findOne({ where: { username: username } });
    const valid = await user.validateLogin(password);
    if (valid) {
      req.body.user = user;
      next();
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(401).json('Invalid Login'); }
};