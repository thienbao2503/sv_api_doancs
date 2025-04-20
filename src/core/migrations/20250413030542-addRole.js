"use strict";

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
  return db.createTable("tbl_roles", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    name: { type: "string", length: 255, notNull: true },
    publish: { type: "int", length: 1, defaultValue: 1 },
    created_at: {
      type: "timestamp",
      notNull: true,
      defaultValue: new String("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      defaultValue: new String("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = function (db) {
  return db.dropTable("tbl_roles");
};

exports._meta = {
  version: 1,
};
