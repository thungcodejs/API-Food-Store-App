<<<<<<< HEAD
const expressJwt = require('express-jwt');
const api = process.env.API_URL;
const heroku = "https://food-zone.herokuapp.com";

function authJwt() {
    const secret = process.env.secret;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/customers(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/dishes(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST', 'DELETE'] },
            { url: /heroku(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/customers/login`,
            `${api}/customers/signin`,
            `${api}/customers/register`,

        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt;
=======
const expressJwt = require('express-jwt');const api = process.env.API_URL;function authJwt() {    const secret = process.env.secret;    return expressJwt({        secret,        algorithms: ['HS256'],        isRevoked: isRevoked    }).unless({        path: [            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },            {url: /\/api\/v1\/customers(.*)/ , methods: ['GET', 'OPTIONS'] },            {url: /\/api\/v1\/dishes(.*)/ , methods: ['GET', 'OPTIONS'] },            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},            `${api}/customers/login`,            `${api}/customers/signin`,            `${api}/customers/register`,        ]    })}async function isRevoked(req, payload, done) {    if(!payload.isAdmin) {        done(null, true)    }    done();}module.exports = authJwt;
>>>>>>> 56967c72a52656dae872cc92a0b55fef08afba0c
