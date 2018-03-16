const { spawn, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')
const Transmission = require('transmission')
const bluebird = require('bluebird')




var status = spawn('service', ['transmission-daemon', ' status'])

var trs = new Transmission({
  host: 'localhost',
  port: 9091,
  username: 'transmission',
  password: '123456'
})

bluebird.promisifyAll(trs)
bluebird.promisifyAll(fs)

//---------------------------------------------------------------------
// 获取任务信息

// trs.getAsync().then(data => console.log(data.torrents))
// trs.waitForState(1, 'STOPPED', (err, arg) => {
//   console.log(err, arg)
// })

//---------------------------------------------------------------------
// 添加下载任务

var magnetUrl = 'magnet:?xt=urn:btih:61cf2a75570474bb3ac4894cdbc8f79917335009&dn=%e9%98%b3%e5%85%89%e7%94%b5%e5%bd%b1www.ygdy8.com.%e7%8e%8b%e7%89%8c%e7%89%b9%e5%b7%a52%ef%bc%9a%e9%bb%84%e9%87%91%e5%9c%88.BD.720p.%e5%9b%bd%e8%8b%b1%e5%8f%8c%e8%af%ad%e5%8f%8c%e5%ad%97.mkv&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969%2fannounce&tr=udp%3a%2f%2feddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2fshadowshq.eddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce'

var magnetUrl2 = 'magnet:?xt=urn:btih:776babfee6f60d233c0c05b48b9f0b1179e58cd6&dn=%e9%98%b3%e5%85%89%e7%94%b5%e5%bd%b1www.ygdy8.com.%e5%a4%aa%e7%a9%ba%e6%95%91%e6%8f%b4.BD.720p.%e4%bf%84%e8%af%ad%e4%b8%ad%e5%ad%97.mkv&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969%2fannounce&tr=udp%3a%2f%2feddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2fshadowshq.eddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce'

var magnetUrl3 = 'magnet:?xt=urn:btih:MI3UBBCWS4XEBMABTO2YUWMPSQ2KCR45&dn=%E9%98%B3%E5%85%89%E7%94%B5%E5%BD%B1www.ygdy8.com.%E5%89%8D%E4%BB%BB3%EF%BC%9A%E5%86%8D%E8%A7%81%E5%89%8D%E4%BB%BB.HD.1080p.%E5%9B%BD%E8%AF%AD%E4%B8%AD%E5%AD%97.mp4&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Feddie4.nl%3A6969%2Fannounce&tr=udp%3A%2F%2Fshadowshq.eddie4.nl%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce'

var magnetUrl4 = 'magnet:?xt=urn:btih:ef5dbdffdd63b2058193b021a48d833cc6b0809c&dn=%e9%98%b3%e5%85%89%e7%94%b5%e5%bd%b1www.ygdy8.com.%e4%ba%8c%e5%8d%81%e4%ba%8c.HD.1080p.%e5%9b%bd%e8%af%ad%e4%b8%ad%e8%8b%b1%e5%8f%8c%e5%ad%97.mp4&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969%2fannounce&tr=udp%3a%2f%2feddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2fshadowshq.eddie4.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce'

// trs.addUrlAsync(magnetUrl3).then(data => {
//   console.log(data)
// }).catch(e => {
//   console.log(e)
// })

//---------------------------------------------------------------------
// 设置单个任务属性
var setPro = (ids, options) => new Promise((resolve,reject) => {
  console.log(ids, options)
  trs.set(ids, options, err => {
    if (err) reject(err)
    else resolve()
  })
})

// setPro([7],{uploadLimit:200}).then(() => {
//   console.log('success')
// }).catch(e => {
//   console.log(e)
// })

// console.log(trs.session((err, arg) => {
//   console.log(err, arg)
// }))

//---------------------------------------------------------------------

var getStats = () => new Promise((resolve, reject) => {
  trs.sessionStats((err, result) => {
    if (err) reject(err)
    else resolve(result)
  })
})

// getStats().then(data => {
//   console.log(data)
// })

//---------------------------------------------------------------------
// 获取设置信息（速度限制， 做种时间等）
var getSession = () => new Promise((resolve, reject) => {
  trs.session((err, result) => {
    if (err) reject(err)
    else resolve(result)
  })
})

// getSession().then(data => {
//   console.log(data)
// })

//---------------------------------------------------------------------
// 删除任务
// trs.removeAsync([7], true).then(data => {
//   console.log(data)
// }).catch(e => console.log(e))

//---------------------------------------------------------------------
// 监听

// trs.waitForState(10, )

//---------------------------------------------------------------------
// trs.active((err, data) => {
//   if (err) console.log('err', err)
//   else console.log(data)
// })

//---------------------------------------------------------------------
// 会话设置
// trs.sessionAsync().then(data => {
//   console.log(data)
// })

// trs.session({seedRatioLimit: 1}, (err, arg) => {
//   // console.log(arg)
// })

class Manager extends EventEmitter{
  constructor(tempPath) {
    super()
    this.tempPath = tempPath // 下载缓存目录
    this.storagePath = path.join(this.tempPath, 'storage.json') // 下载信息存储
    this.client = null // 所有下载任务同用一个下载实例
    this.downloading = [] // 下载任务列表
    this.downloaded = [] // 完成列表
    this.writing = false // 是否正在更新记录文件
    this.lockNumber = 0 // 等待更新数量
    this.lock = false // 存储任务锁
    this.errors = [] // 错误列表
    
  }

  // 初始化
  init() {
    // 检查transmission-daemon 
    try {
      throw new Error('test error')
      let command = 'systemctl'
      let serviceName = 'transmission-daemon'
      spawnSync(command, ['enable', serviceName])
      spawnSync(command, ['start', serviceName])
      let enableResult = spawnSync(command, ['is-enabled', serviceName]).stdout.toString()
      let activeResult = spawnSync(command, ['is-active', serviceName]).stdout.toString()
      if (enableResult.indexOf('enabled') === -1) this.error(enableResult.stderr.toString())
      if (activeResult.indexOf('active') === -1) return this.error(enableResult.stderr.toString())
    } catch (error) { this.error(error) }
    // 实例化Transmission
    this.client = new Transmission({
      host: 'localhost',
      port: 9091,
      username: 'transmission',
      password: '123456'
    })
    bluebird.promisifyAll(this.client)
    // 设置transmission属性
    this.client.session({
      seedRatioLimit: 1,
      seedRatioLimited: true,
      'idle-seeding-limit': 30,
      'idle-seeding-limit-enabled': false,
      'speed-limit-up-enabled': false,
      'speed-limit-down-enabled': false
    }, () =>{})
    // 读取缓存文件， 创建未完成任务
    if (!fs.existsSync(this.storagePath)) return
    let tasks = JSON.parse(fs.readFileSync(this.storagePath))
    this.downloaded = tasks.downloaded
    tasks.downloading.forEach(task => {
      let { dirUUID, userUUID } = task
      this.downloading.push(new Task(task.id, dirUUID, userUUID)) 
    })
  }

  // 错误处理
  error(arg) {
    let err = typeof arg === 'object'? arg: new Error(arg)
    this.errors.push(err)
    this.emit('error', err) 
  }

  // 同步transmission 任务数据
  syncList() {
    setInterval(() => {
      this.client.get((err, arg) => {

      })
    })
  }

  /* task object
    * hashString: hash of task
    * id: task id in transmission
    * name: task name
  */

  // 创建磁链、种子下载任务
  async createTransmissionTask(type, source, dirUUID, userUUID) {
    try {
      // 创建transmission任务
      let result, options = { "download-dir": this.tempPath }
      if (type === 'magnet') result = await this.client.addUrlAsync(magnetUrl, options)
      else result = await this.client.addFileAsync(torrentPath, options)
      // 创建本地任务
      this.taskFactory(result.id, dirUUID, userUUID)
    } catch (e) {
      let errMessage = e.message
    }
  }

  // 创建任务对象(创建、存储、监听)
  async taskFactory(id, dirUUID, userUUID) {
    try {
      // 创建
      let tasks = await this.get(id)
      if (tasks.torrents.length !== 1) throw new Error('create task error')
      else { let taskObj = tasks.torrents }
      let task = new Task(id, dirUUID, userUUID)
      // 存储
      this.downloading.push(task)
      await this.cache()
    } catch (err) {
      throw err
    }
  }

  // 存储任务信息
  async cache() {
    if (this.lock) {
      // 有文件正在写入
      this.lockNumber++
    } else {
      // 写入操作
      this.lock = true
      this.lockNumber = 0
      let storageObj = {
        downloading: this.downloading.map(file => file.getInfor()),
        downloaded: this.downloaded.map(file => file.getInfor())
      }
      await fs.writeFileAsync(this.storagePath, JSON.stringify(storageObj, null, '\t'))
      this.lock = false
      // 检查被阻塞的写入操作
      if (this.lockNumber) this.cache()
    }
  }

  getList() {
    return this.downloading
  }

  // 查询任务
  async get(id) {
    try {
      if (id) return await trs.getAsync(id)
      else return await trs.getAsync()
    }catch (e) {
      // todo
    }
  }

  // 暂停任务
  pause(id, callback) {
    this.client.stop(id, callback)
  }

  // 继续任务
  resume(id, callback) {
    this.client.start(id, callback)
  }

  // 删除任务
  delete(id, callback) {
    this.client.remove(id, true, callback)
  }

}

class Task {
  constructor(id, dirUUID, userUUID) {
    this.id = id // 任务id
    this.dirUUID = dirUUID // 下载目标目录
    this.userUUID = userUUID // 用户uuid
    this.name = '' // 任务名称
    this.rateDownload = null //下载速率
    this.rateUpload = null // 上传速率
    this.percentDone = 0 // 完成比例
    this.eta = Infinity // 剩余时间
    this.status = null // 当前状态
    this.finishTime = null // 任务完成时间
  }

  set(task) {
    let { rateDownload, rateUpload, percentDone, eta, status } = task
    let nextState = { rateDownload, rateUpload, percentDone, eta, status }
    Object.assign(this, nextState)
  }

  getInfor() {
    let { id, dirUUID, userUUID } = this
    return { id, dirUUID, userUUID }
  }

  getSummary() {
    let { rateDownload, rateUpload, percentDone, eta, status } = this
    return { rateDownload, rateUpload, percentDone, eta, status }
  }
}

// let manager = new Manager('/home/liu/Downloads')
// manager.init()
// manager.createTransmissionTask('magnet', magnetUrl, '1a', '2b')

module.exports = Manager

