const userDataMapper = require('../../datamappers/user');
const debug = require('debug')('user controller');
// const { ApiError } = require('../../helpers/errorHandler');

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
        debug('req.body.email ',req.body.email)
        const user = await userDataMapper.findOneByEmail(req.body.email);
        if (!user) {
            debug('pas de user trouvé, user à creer dans bdd');
            const newUser = await userDataMapper.insert(req.body);
            return res.json(newUser);
            
            
        }
        debug('user deja existant avec cet email pas possible de cree')
        return res.json('user deja existant avec cet email, pas possible de cree');
        // throw new ApiError('user already exist', { statusCode: 404 });
        
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
        const user = await userDataMapper.findOneByEmail(req.body.email);
        if (!user) {
            debug('pas de user trouvé')
            return res.json('pas de user trouvé pour cet email');
            // throw new ApiError('user not found', { statusCode: 404 });
            
        }
        debug('user trouvé')
        return res.json(user);
    },
};