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
  return db.createTable('project_requests', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    project_id: { type: 'int', notNull: false },
    goal: { type: 'text', notNull: false },
    budget: { type: 'decimal', precision: 15, scale: 2, notNull: false },
    currency: { type: 'string', length: 3, notNull: false }, // Mã tiền tệ (ví dụ: "USD", "VND")
    duration: { type: 'int', notNull: false }, // Thời gian dự kiến (tính theo ngày)
  })
};

exports.down = function (db) {
  return db.dropTable('project_requests');
};

exports._meta = {
  "version": 1
};
