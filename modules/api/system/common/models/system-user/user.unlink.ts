const promisify = require('bluebird').promisify

module.exports = function(SystemUser) {
  SystemUser.afterRemote('prototype.__unlink__hosts', async function(ctx) {
    const Host = SystemUser.app.models.Host
    let qHostFindById = promisify(Host.findById, {
      context: Host,
    })
    let host = await qHostFindById(ctx.args.fk, {
      include: 'sensors',
    })
    let Sensor = host.sensors
    let qSensorsFind = promisify(Sensor.find, {
      context: Sensor,
    })
    let sensors = await qSensorsFind()
    let userId = ctx.instance.id
    let userFindbyId = promisify(SystemUser.findById, { context: SystemUser })
    let user = await userFindbyId(userId)
    let qUnlinkSensorToUser = promisify(user.__unlink__sensors, { context: user })
    for (let i in sensors) {
      let sensorUser = await qUnlinkSensorToUser(sensors[i].id)
    }
  })
}
