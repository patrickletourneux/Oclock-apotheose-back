require('dotenv').config();
const debug = require('debug')('app:server');

const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    debug(`Server started on http://localhost:${port}`);
});