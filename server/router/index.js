const { Router } =  require("express");
const auth = require("../middleware/auth");

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
  res.status(200).send({msg: 'Here is your message!'});
});

rootRouter.get('/authenticated', auth, (req, res) => {
  res.status(200).send({msg: 'Authenticated message here!'});
});

exports.router = rootRouter;