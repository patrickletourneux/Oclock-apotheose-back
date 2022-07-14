require('dotenv').config();
const { JsonWebTokenError } = require('jsonwebtoken');
const sendMail =  require('./sendMail');


describe('sendMail', () => {
  test('should send a mail', async () => {
    const send  = await sendMail('patrick.letourneux20@gmail.com','jest','jest test');
    // console.log(send.accepted);
    expect(send.accepted).toStrictEqual(["patrick.letourneux20@gmail.com"]);
  });
});
