'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('tbl_tasks', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    project_id: { type: 'int', notNull: true },
    name: { type: 'string', length: 255, notNull: true },
    description: { type: 'text', notNull: false },
    deadline: { type: 'datetime', notNull: false },
    priority: { type: 'string', length: 10, notNull: false, }, // 'low', 'medium', 'high'
    status: { type: 'int', notNull: true, defaultValue: 1 }, // 'pending', 'in_progress', 'completed'
    start_time: { type: 'datetime', notNull: false },
    end_time: { type: 'datetime', notNull: false },
    created_at: { type: 'datetime', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') },
    updated_at: { type: 'datetime', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') }
  });
};

exports.down = function (db) {
  return db.dropTable('tbl_tasks');
};

exports._meta = {
  "version": 1
};
