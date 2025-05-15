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
  return Promise.all([
    db.changeColumn('tbl_users', 'avatar_url', { type: 'string', length: 255, notNull: false }),
    db.changeColumn('tbl_users', 'address', { type: 'string', length: 255, notNull: false }),
    db.changeColumn('tbl_users', 'birthday', { type: 'date', notNull: false }),
    db.changeColumn('tbl_users', 'gender', { type: 'string', length: 10, notNull: false }),
    db.changeColumn('tbl_users', 'id_number', { type: 'string', length: 50, notNull: false }),
    db.changeColumn('tbl_users', 'experience_years', { type: 'int', notNull: false })
  ]);
};

exports.down = function (db) {
};

exports._meta = {
  "version": 1
};
