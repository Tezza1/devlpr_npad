if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://administrator1:administrator1@ds153093.mlab.com:53093/devlpr-npad-prod'
    }
}
else {
    module.exports = {
        mongoURI: 'mongodb://localhost/devlpr-npad'
    }
}