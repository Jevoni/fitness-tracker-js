const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    console.log('JWT!')
    const token = req.header("x-access-token")
    if (!token) {
        console.log('No Token!')
        res.sendStatus(400)
    }
    if (token) {
        console.log('Token!')
        jwt.verify(token, 'topsecret', (err, decoded) => {
            if (err) {
                console.log('Error in Token!')
                console.log(err)
                res.sendStatus(400)
            } else {
                req.userId = decoded.id
                console.log('Next!')
                next()
            }
        })
    }
}