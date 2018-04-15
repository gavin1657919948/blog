module.exports = function(SystemUser) {
  SystemUser.beforeRemote('prototype.__destroyById__hosts', async function(ctx) {
    const hostId = ctx.args.fk
    const Host = SystemUser.app.models.Host
    let host = await Host.findById(hostId, { include: 'sensors' })
    let sensors = await host.sensors.find()
    if (sensors.length > 0) {
      throw new Error('host cannot be deleted util its sensors are clean')
    }
  })
}
