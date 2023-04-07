const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const { logRequest } = require('./utils/logger')
const multer = require('multer')
const os = require('os')

const applyController = require("./controllers/apply.controller.js")

{{redisConfig}}

const upload = multer({ storage })
const storage = multer.memoryStorage()
const corsOptions = {
  origin: '*',
}
const PORT = process.env.PORT || 80

app.use(logRequest)
app.use(cors(corsOptions))
app.post('/api/upload', upload.single('file'), File.upload)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Hello app' })
})

 app.get("/apply", applyController.findAll)
 app.get("/apply/:applyId", applyController.getDetail)
 app.delete("/apply/:applyId", applyController.delete)
 app.delete("/apply/:applyId", applyController.deleteMany)
 app.post("/apply", applyController.updateOne)

app.use((err, req, res, next) => {
  console.log(req.method, req.body, req.baseUrl)

  if (err) {
    res.status(500).send('Something broke!')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

