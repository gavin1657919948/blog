var moment = require('moment')
var _ = require('lodash')
var debug = require('debug')
var error = debug('monitor:error')
var log = debug('monitor:log')
log.log = console.log.bind(console)

class Index {
  constructor(name) {
    this.name = name
    this.current = 0
    this.last = 0
    this.startTime = new Date()
  }
}

class Monitor {
  constructor(delayTime) {
    var that = this
    this.indexMap = {}
    this.printNumber = 0
    this.delayTime = typeof delayTime == 'number' ? delayTime : 60000
    this.startTime = new Date().getTime()
    this.lastTime = this.startTime
    this.interval = setInterval(function() {
      that.print()
    }, this.delayTime)
  }

  printIndex(index) {
    var end = new Date()
    log(
      '  \\_ [',
      index.name,
      '] cur: ',
      index.current,
      ' last:',
      index.last,
      ' incr:',
      index.current - index.last,
      ' speed:',
      ((index.current - index.last) * 1000 / (end - this.lastTime)).toFixed(2),
      ' global_speed:',
      (index.current * 1000 / (end - index.startTime)).toFixed(2),
      ' start:',
      index.startTime.toLocaleString()
    )
    index.last = index.current
  }
  print() {
    this.printNumber++
    log('==========================================================================================')
    log('Monitor print status now, round[' + this.printNumber + ']: ')
    _.map(this.indexMap, index => this.printIndex(index))
    this.lastTime = Date.now()
    log('------------------------------------------------------------------------------------------')
    log('run time:', moment(this.startTime).fromNow())
    log('==========================================================================================')
  }

  increase(indexName, increment) {
    if (typeof indexName == 'string' && typeof increment == 'number') {
      if (!this.indexMap[indexName]) {
        this.indexMap[indexName] = new Index(indexName)
      }
      this.indexMap[indexName].current += increment
    } else {
      error('Monitor.increase() argument type errors, indexName=', indexName, ', increment=', increment)
    }
  }
  set(indexName, cur) {
    if (typeof indexName == 'string' && typeof cur == 'number') {
      if (!this.indexMap[indexName]) {
        this.indexMap[indexName] = new Index(indexName)
      }
      this.indexMap[indexName].current = cur
    } else {
      error('Monitor.set() argument type errors, indexName=', indexName, ', number=', number)
    }
  }

  destory() {
    clearInterval(this.interval)
  }
}

module.exports = Monitor
