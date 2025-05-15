'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('tbl_project_team', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    project_id: { type: 'int', notNull: true },
    user_id: { type: 'int', notNull: true },
    role_id: { type: 'int', notNull: true },
    created_at: { type: 'datetime', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') },
    updated_at: { type: 'datetime', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') }
  });
};

exports.down = function(db) {
  return db.dropTable('tbl_project_team');
};

exports._meta = {
  "version": 1
};
