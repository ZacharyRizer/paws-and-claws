const bearerToken = require("express-bearer-token");
const jwt = require("jsonwebtoken");

const { jwtConfig } = require("./config");
const { User, ShelterUser } = require("./db/models");

const { secret, expiresIn } = jwtConfig;

const getUserToken = user => {
    const userData = {
        id: user.id,
        role: "Adopter",
        email: user.email,
    };

    const token = jwt.sign(
        { data: userData },
        secret,
        { expiresIn: parseInt(expiresIn, 10) }
    );
    return token;
};

const getShelterToken = user => {
    const userData = {
        id: user.id,
        role: "Shelter",
        email: user.email,
    };

    const token = jwt.sign(
        { data: userData },
        secret,
        { expiresIn: parseInt(expiresIn, 10) }
    );

    return token;
};

const restoreShelterUser = (req, res, next) => {
    const { token } = req;
    console.log(token)

    if (!token) {
        return next();
    }

    return jwt.verify(token, secret, async (err, jwtPayload) => {
        if (err) {
            err.status = 401;
            return next(err);
        }

        const { id } = jwtPayload.data;

        try {
            req.user = await ShelterUser.findByPk(id);
        } catch (e) {
            return next(e);
        }

        if (!req.user) {
            return res.set("WWW-Authenticate", "Bearer")
                .status(401)
                .end();
        }

        return next();
    });
};

const restoreUser = (req, res, next) => {
    const { token } = req;
    console.log(token)

    if (!token) {
        return next();
    }

    return jwt.verify(token, secret, async (err, jwtPayload) => {
        if (err) {
            err.status = 401;
            return next(err);
        }

        const { id } = jwtPayload.data;

        try {
            req.user = await User.findByPk(id);
        } catch (e) {
            return next(e);
        }

        if (!req.user) {
            return res.set("WWW-Authenticate", "Bearer")
                .status(401)
                .end();
        }

        return next();
    });
};

const requireUserAuth = [bearerToken(), restoreUser];
const requireShelterAuth = [bearerToken(), restoreShelterUser];

module.exports = { getUserToken, getShelterToken, requireUserAuth, requireShelterAuth };