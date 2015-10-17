'use strict';

module.exports = (unity) => {

  unity.router.command('rooms', (req, res) => {
    const rooms = ['roomOne', 'roomTwo', 'roomThree'];
    console.log(req.arguments);
    res.send(JSON.stringify(rooms));
  });

};
