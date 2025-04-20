'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return Promise.all([
    db.addColumn('tbl_users', 'avatar_url', {
      type: 'string',
      length: 500,
      notNull: true,
    }),
    db.addColumn('tbl_users', 'address', {
      type: 'string',
      length: 255,
      notNull: true,
    }),
    db.addColumn('tbl_users', 'birthday', {
      type: 'date',
      notNull: true,
    }),
    db.addColumn('tbl_users', 'gender', {
      type: 'string',
      length: 10,
      notNull: true,
    }),
    db.addColumn('tbl_users', 'id_number', {
      type: 'string',
      length: 50,
      notNull: true,
    }),
    db.addColumn('tbl_users', 'experience_years', {
      type: 'int',
      notNull: true,
    }),
  ]);
};

exports.down = function (db) {
  return Promise.all([
    db.removeColumn('tbl_users', 'avatar_url'),
    db.removeColumn('tbl_users', 'address'),
    db.removeColumn('tbl_users', 'birthday'),
    db.removeColumn('tbl_users', 'gender'),
    db.removeColumn('tbl_users', 'id_number'),
    db.removeColumn('tbl_users', 'experience_years'),
  ]);
};

exports._meta = {
  version: 1,
};
