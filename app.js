const app = require('./server')

app.use('/', require('./src/routes/pageRoutes'))


module.exports = app