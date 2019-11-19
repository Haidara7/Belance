

function verifyToken(req, res, next) {
    const user = {
        user_id: 2,
        email: 'haidarasouifeh@gmail.com',
        password: '1234'

    } 
    // check if beraer is un defined
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        req.user = user;
        //next middleware
        next();
    } else {

        // forbidden
        res.send(403);
    }

};

export default verifyToken;