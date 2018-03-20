const path = require('path')
const { Router } = require('express')
const Manager = require('./manager')

const tmpPath = path.normalize('/home/liu/Downloads')
var error = null
var router = Router()
var manager = new Manager(tmpPath)
manager.on('error', (err) => {
  console.log('err trigger')
  error = err
})
manager.init()
manager.syncList()


router.use((req, res, next) => {
  req.user = { uuid : 'test uuid 123'}
  if (error) return res.status(500).end('transmission init failed')
  else next()
})

// 
router.get('/', (req, res) => {
  res.status(200).json(manager.getList())
  
  
})

router.post('/magnet', (req,res) => {
  let { magnetURL, dirUUID } = req.body
  manager.createTransmissionTask('magnet', magnetURL, dirUUID, req.user.uuid)
})

router.patch('/:id', (req, res) => { 
  let { op } = req.body
  manager.op(Number(req.params.id), op, (err, data) => {
    if (err) res.status(400).json(err)
    else res.status(200).json(data)
  })
})

module.exports = router
