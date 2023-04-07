const express = require("express")
const { Server } = require("socket.io")
const cors = require("cors")
const http = require("http")
const path = require("path")
const pug = require("pug")
const app = express()

app.use(cors({origin: '*'}))
app.use(express.static(path.join(__dirname, '/')))
app.set('views', 'views');
app.set('view engine', 'pug');

app.get('/', (req,res) => {
    res.send('hello')
})

app.get('/home', (req, res) => {
    const html = pug.renderFile(path.resolve(__dirname, './client/index.pug'))
    res.send(html)
})

app.listen(3034, () => {
    console.log(`http://localhost:3034`, )
})