const debug = require('debug')('service sanitize');
const DOMPurify = require('isomorphic-dompurify');

module.exports = (prop) => async (request, _, next) => {
  // la "value" on s'en fiche on la récupère pas
  // request['body'] == request.body
  debug(request[prop]);
  Object.keys(request[prop]).forEach((item) => {
    console.log('before sanitize ', request[prop][item]);
    request[prop][item] = DOMPurify.sanitize(request[prop][item]);
    console.log('after sanitize ', request[prop][item]);
  });
  debug(request[prop]);

  next();
};
