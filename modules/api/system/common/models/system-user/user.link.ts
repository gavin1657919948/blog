const promisify = require('bluebird').promisify

module.exports = function(SystemUser) {
  SystemUser.afterRemote('prototype.__link__hosts', async function(ctx) {
    const Host = SystemUser.app.models.Host
    let qHostFindById = promisify(Host.findById, {
      context: Host,
    })
    let host = await qHostFindById(ctx.result.hostId, {
      include: 'sensors',
    })
    let Sensor = host.sensors
    let qSensorsFind = promisify(Sensor.find, {
      context: Sensor,
    })
    let sensors = await qSensorsFind()
    let userId = ctx.result.systemUserId
    let userFindbyId = promisify(SystemUser.findById, { context: SystemUser })
    let user = await userFindbyId(userId)
    let qLinkSensorToUser = promisify(user.__link__sensors, { context: user })
    for (let i in sensors) {
      let sensorUser = await qLinkSensorToUser(sensors[i].id)
    }
  })
}
