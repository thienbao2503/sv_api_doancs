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

exports.up = async function (db) {
  // Bước 1: Đổi tên cột
  await db.renameColumn('tbl_projects', 'status_id', 'status');

  // Bước 2: Đổi kiểu dữ liệu
  return db.changeColumn('tbl_projects', 'status', {
    type: 'string',
    length: 255,
    notNull: false,
  });
};

exports.down = async function (db) {
  // Rollback: Đổi lại kiểu dữ liệu
  await db.changeColumn('tbl_projects', 'status', {
    type: 'int',
    notNull: false,
  });

  // Rollback: Đổi lại tên
  return db.renameColumn('tbl_projects', 'status', 'status_id');
};

exports._meta = {
  "version": 1
};
