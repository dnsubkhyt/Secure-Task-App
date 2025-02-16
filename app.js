const express = require('express');
const app = express();
require('dotenv').config()
require('./config/mongoose');
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Welcome to My Online Store API!');
})

app.use('/',userRoutes)
app.use('/',taskRoutes)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});