const app = require('./server')

app.use('/', require('./src/routes/registerRoutes'))


module.exports = app