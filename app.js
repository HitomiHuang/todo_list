const express = require('express')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const mongoose = require('mongoose')
const app = express()
const port = 3000

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

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${3000}`)
})