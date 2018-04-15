'use strict'

const { hasManyRelation } = require('@colmena/api-helpers/src/relation-mixin')

module.exports = (Model, options) => {
  const relation = options.relation || 'hasMany'
  options.targetModel = 'SystemUser'
  if (relation === 'hasMany') {
    options.foreignKey = options.foreignKey || 'systemUserId'
    options.required = options.required || false
    return hasManyRelation(Model, options)
  } else if (relation === 'hasAndBelongsToMany') {
    const ModelFrom = Model
    const ModelTo = ModelFrom.dataSource.models[options.targetModel]
    ModelTo.hasAndBelongsToMany(ModelFrom)
    ModelFrom.hasAndBelongsToMany(ModelTo)
  }
}
