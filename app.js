const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')


app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(session({
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: true
}))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})