const express = require('express')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const routes = require('./routes')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true }, { useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${3000}`)
})