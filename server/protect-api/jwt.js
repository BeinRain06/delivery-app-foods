// install and require npm **expressJwt** package
const expressJwt = require("express-jwt");

require("dotenv").config();

//purpose: protect our allowing quite change with the type of token of user admin
function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_BASE_URL;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/delivery\/meals(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/delivery\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      {
        url: /\/api\/delivery\/favourites\/users(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/delivery\/orders(.*)/,
        methods: ["GET", "OPTIONS", "POST", "PUT"],
      },

      `${api}/users/login`,

      `${api}/users/register`,
      `/`,

      /*  `${api}/orders`, */
    ],
  });
}

// **expressJwt** offer a way to revoke one of the parameter passed in **jsonwebtoken**

async function isRevoked(req, payload, done) {
  //is not Admin (role 1: customer)
  if (!payload.isAdmin) {
    done(null, true);
  }
  // is Admin (role 2: Administrator)
  done();
}

module.exports = authJwt;

// --> here we are i writed authenticated user => next move i have to **POST** order after this authentication (order-routes.js)
