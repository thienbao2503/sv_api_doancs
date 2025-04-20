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
  return db.createTable('tbl_users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: 'string',
      length: 255,
      notNull: true,
    },
    email: {
      type: 'string',
      length: 255,
      notNull: true,
      unique: true,
    },
    phone: {
      type: 'string',
      length: 20,
      notNull: true,
      unique: true,
    },
    password: {
      type: 'string',
      length: 255,
      notNull: true,
    },
    active: {
      type: 'string',
      length: 10, // chứa "ACTIVE", "BLOCK"
      notNull: true,
      defaultValue: 'ACTIVE',
    },
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
  });
};

exports.down = function (db) {
  return db.dropTable('tbl_users');
};

exports._meta = {
  version: 1,
};
