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
  return db.createTable('tbl_projects', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', length: 255, notNull: true },
    description: { type: 'text', notNull: false },
    user_id: { type: 'int', notNull: true },
    start_date: { type: 'date', notNull: false },
    end_date: { type: 'date', notNull: false },
    status_id: { type: 'int', notNull: false }, // Tham chiếu đến bảng project_statuses
    created_at: {
      type: 'datetime',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'datetime',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP'),
    }
  })
};

exports.down = function (db) {
  return db.dropTable('tbl_projects');
};

exports._meta = {
  "version": 1
};
