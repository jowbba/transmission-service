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


router.use((req, res, next) => {
  console.log('in middle')
  if (error) return res.status(500).end('transmission init failed')
  else next()
})

// 
router.get('/', (req, res) => { 
  
    res.status(200).json(manager.getList())
  
})



module.exports = router
