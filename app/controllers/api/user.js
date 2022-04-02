const userDataMapper = require('../../datamappers/user');
const debug = require('debug')('user controller');
// const { ApiError } = require('../../helpers/errorHandler');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const bcrypt = require("bcrypt");

module.exports = {

    /**
     * user controller to post a new user.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async createOne(req, res) {
        debug('dans createOne');
        debug('req.body.email ', req.body.email)
        // look if a user already exits with this email
        const user = await userDataMapper.findOneByEmail(req.body.email);
        if (user) {
            debug('user deja existant avec cet email pas possible de cree')
            return res.status(400).json('user deja existant avec cet email, pas possible de cree');
            // throw new ApiError('user already exist', { statusCode: 404 });
        } else {
            debug('pas de user trouvé, user à creer dans bdd');
            // check email with email-validator
            if (validator.validate(req.body.email)) {
                // encrypt password with bcrypt
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const newUser = await userDataMapper.insert(req.body);
                jwt.sign({
                    newUser: newUser
                }, process.env.SECRETKEYJWT, {
                    expiresIn: '200s'
                }, (err, token) => {
                    debug('token generation')
                    debug(token)
                    return res.status(200).json({
                        token: token
                    });

                });
            } else {
                debug('email pas au bon format');
            }


        }


    },
    /**
     * signin controller to get a user by email and check access.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async findOneByEmail(req, res) {
        debug('dans findOneByEmail');
        // check if a user exist in dbb for this email
        const user = await userDataMapper.findOneByEmail(req.body.email);
        if (!user) {
            debug('pas de user trouvé')
            return res.status(400).json('pas de user trouvé pour cet email');
            // throw new ApiError('user not found', { statusCode: 404 });

        }
        debug('user trouvé pour cet email')
        //check password with bcrypt
        if (await bcrypt.compare(req.body.password, user.password)) {
            debug('user et password ok')
            // token generation with user information inside token and send it to the front
            jwt.sign({
                user: user
            }, process.env.SECRETKEYJWT, {
                expiresIn: '200s'
            }, (err, token) => {
                debug('token generation')
                debug(token)
                return res.status(200).json({
                    token: token
                });

            });

        } else {
            // sinon je lui envoie un message d'erreur
            debug('password nok')
            res.status(400).json("il y a une erreur dans le couple login/mot de passe")

        }
    },
};