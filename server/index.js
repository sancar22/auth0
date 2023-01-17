const express = require('express');
const cors = require('cors');
const { Router } =  require("express");
const { expressjwt } = require('express-jwt')
const jwks = require('jwks-rsa');


const jwtCheck = expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-hleh5ooji5xervjb.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://example-api',
  issuer: 'https://dev-hleh5ooji5xervjb.us.auth0.com/',
  algorithms: ['RS256']
});


const nonAuthRouter = Router();

nonAuthRouter.get('/', (req, res) => {
  res.status(200).send({msg: 'Here is your message!'});
});

const authRouter = Router();

authRouter.get('/authenticated', (req, res) => {
  res.status(200).send({msg: 'Authenticated message here!'});
});

const app = express();


app.use(cors());
app.use(express.json());
app.use(nonAuthRouter);
app.use(jwtCheck);
app.use(authRouter);

app.listen(5001, () => console.log('server listening!'));






