import { CANCELLED } from "dns";

const messages = {
    //price
    INVALID_PRICE_RANGE: "Giá tối thiểu không được lớn hơn giá tối đa",
    //follow
    ALREADY_FOLLOW: "Đã theo dõi nhà bán này",
    FOLLOW_ERROR: "Theo dõi thất bại",
    UNFOLLOW_ERROR: "Hủy theo dõi thất bại",
    UNFOLLOW_SUCCESS: "Hủy theo dõi thành công",
    FOLLOW_SUCCESS: "Theo dõi thành công",
    FOLLOW_NOT_EXISTED: "Nhà bán chưa được theo dõi",
    // notifi
    MISSING_ORDER_DETAIL: "Nội dung đơn hàng không được để trống",
    CREATE_FAILED: "Tạo thất bại",
    UPDATE_FAILED: "Cập nhật thất bại",
    DELETE_FAILED: "Xóa thất bại",
    FIND_BY_ID_FAILED: "Không tìm thấy dữ liệu",
    FIND_ALL_FAILED: "Không tìm thấy dữ liệu",
    CREATE_SUCCESS: "Tạo thành công",
    OTP_SUCCESS: "Gửi OTP thành công",
    UPDATE_SUCCESS: "Cập nhật thành công",
    DELETE_SUCCESS: "Xóa thành công",
    FIND_BY_ID_SUCCESS: "Tìm thấy",
    FIND_ALL_SUCCESS: "Tìm thấy",
    NOT_FOUND: "Không tìm thấy dữ liệu",
    SUCCESS: "Thành công",
    FAILED: "Thất bại",
    UPLOAD_FAILED: "Upload thất bại",
    UPLOAD_SUCCESS: "Upload thành công",
    INVALID_FILE: "File không hợp lệ",
    FILE_NOT_FOUND: "File không tồn tại",
    LOGOUT_SUCCESS: "Đăng xuất thành công",
    LOGOUT_FAILED: "Đăng xuất thất bại",
    LOGIN_SUCCESS: "Đăng nhập thành công",
    LOGIN_FAILED: "Đăng nhập thất bại",
    REGISTER_SUCCESS: "Đăng ký thành công",
    REGISTER_FAILED: "Đăng ký thất bại",
    SEARCH_SUCCESS: "Tìm thấy",
    SEARCH_FAILED: "Không tìm thấy",
    REFRESH_TOKEN_FAILED: "Refresh token thất bại",
    STATISTICS_SUCCESS: "Thống kê thành công",
    CODE_EXISTED: "Mã đã tồn tại",
    NAME_EXIST: "Tên đã tồn tại",
    MISSING_NAME: "Tên không được để trống",
    MISSING_CODE: "Mã không được để trống",
    MISSING_ID: "ID không được để trống",
    MISSING_EMAIL: "Email không được để trống",
    MISSING_PHONE: "Số điện thoại không được để trống",
    MISSING_PASSWORD: "Mật khẩu không được để trống",
    MISSING_USERNAME: "Tên đăng nhập không được để trống",
    MISSING_AVATAR: "Ảnh đại diện không được để trống",
    MISSING_WEIGHT: "Trọng lượng không được để trống",
    MISSING_UNIT: "Đơn vị không được để trống",
    MISSING_DESCRIPTION: "Mô tả không được để trống",
    MISSING_IS_SELL: "Trạng thái không được để trống",
    MISSING_PRODUCT_TYPE_ID: "Loại sản phẩm không được để trống",
    MISSING_BRAND_ID: "Thương hiệu không được để trống",
    MISSING_RETAIL_PRICE: "Giá bán lẻ không được để trống",
    MISSING_WHOLESALE_PRICE: "Giá bán sỉ không được để trống",
    MISSING_IMPORT_PRICE: "Giá nhập không được để trống",
    MISSING_IMAGE: "Ảnh không được để trống",
    INVALID_FILE_QUANTITY: "Số lượng ảnh không hợp lệ",
    INVALID_FILE_NAME: "Tên file không hợp lệ",
    UPDATE_ADDRESS_SUCCESS: "Cập nhật địa chỉ thành công",
    UPDATE_ADDRESS_FAILED: "Cập nhật địa chỉ thất bại",
    CANNOT_UPDATE_ADDRESS: "Không thể cập nhật địa chỉ",
    CANNOT_DELETE_ADDRESS: "Không thể xóa địa chỉ",
    DELETE_ADDRESS_SUCCESS: "Xóa địa chỉ thành công",
    ADDRESS_DEFAULT_REQUIRED: "Phải có ít nhất một địa chỉ mặc định",
    STATUS_MAX: "Trạng thái không được lớn hơn 5",
    UPDATE_STATUS_SUCCESS: "Cập nhật trạng thái thành công",
    UPDATE_STATUS_FAILED: "Cập nhật trạng thái thất bại",
    CODE_LENGTH: "Mã vượt quá giới hạn",
    GROUP_DEFAULT_REQUIRED: "Phải có ít nhất một nhóm mặc định",
    CANNOT_DELETE_GROUP: "Không thể xóa nhóm khách hàng này",
    CODE_LENGTH_INPUT: "Mã phải là 8 ký tự",
    PHONE_REQUIRED: "Số điện thoại không được để trống",
    CANNOT_DELETE_DATA_DEFAULT: "Không thể xóa dữ liệu mặc định",
    OTP_INCORRECT: 'OTP không chính xác',
    OTP_EXPIRED: 'OTP hết hạn',

    // validate
    INVALID_ID: "ID không hợp lệ",
    INVALID_NAME: "Tên không hợp lệ",
    INVALID_PAGE_LIMIT: "page, limit không hợp lệ",
    INVALID_LIMIT: "Trường limit không hợp lệ",
    INVALID_EMAIL: "Email không hợp lệ",
    INVALID_PHONE: "Số điện thoại không hợp lệ",
    INVALID_PASSWORD: "Mật khẩu không hợp lệ",
    INVALID_STATUS: "Trạng thái không hợp lệ",
    INVALID_PARAMS: "Tham số không hợp lệ",
    MISSING_PARAMS: "Thiếu tham số",
    PHONE_NOT_VALID: "Số điện thoại không hợp lệ",
    SUPPLIER_NOT_EXISTED: "Nhà cung cấp không tồn tại",

    // exist
    OTP_WRONG: "Mã otp không chính xác",
    EMAIL_EXISTED: "Email đã tồn tại",
    PHONE_EXISTED: "Số điện thoại đã tồn tại",
    TAX_CODE_EXISTED: "Mã số thuế đã tồn tại",
    TAX_CODE_NOT_EXISTED: "Mã số thuế không tồn tại",
    USERNAME_EXISTED: "Tên đăng nhập đã tồn tại",
    USERNAME_NOT_EXISTED: "Tên đăng nhập không tồn tại",
    EMAIL_NOT_EXISTED: "Email không tồn tại",
    PHONE_NOT_EXISTED: "Số điện thoại không tồn tại",
    PASSWORD_NOT_EXISTED: "Mật khẩu không tồn tại",
    PASSWORD_INCORRECT: "Mật khẩu không chính xác",
    MODEL_IS_EMPTY: "Model không tồn tại",
    AVATAR_NOT_EXISTED: "Ảnh đại diện không tồn tại",
    EXISTED: "Đã tồn tại",
    NOT_EXISTED: "Không tồn tại",
    PRODUCT_TYPE_NOT_EXISTED: "Loại sản phẩm không tồn tại",
    BRAND_NOT_EXISTED: "Thương hiệu không tồn tại",
    NAME_EXISTED: "Tên đã tồn tại",
    PRODUCT_NOT_EXISTED: "Sản phẩm không tồn tại",
    PRODUCT_COMMISSION_EXISTED: "Hoa hồng của sản phẩm đã tồn tại",

    // auth
    INVALID_USERNAME: "Tên đăng nhập không hợp lệ",
    INVALID_FULLNAME: "Họ tên không hợp lệ",
    INVALID_TOKEN: "Token không hợp lệ",
    REFRESH_TOKEN_NOT_EXISTED: "Refresh token không tồn tại",
    CHANGE_PASSWORD_FAILED: "Thay đổi mật khẩu thất bại",
    CHANGE_PASSWORD_SUCCESS: "Thay đổi mật khẩu thành công",
    REFRESH_TOKEN_SUCCESS: "Refresh token thành công",
    USER_BLOCKED: "Tài khoản đã bị khóa",
    NOT_ALLOW_EDIT: "Không được phép chỉnh sửa",

    //cccd
    INVALID_CCCD: "CCCD không hợp lệ",
    REQUIRED_CCCD: "CCCD thì bắt buộc",
    CARD_FRONT_IMAGE_NOT_EXISTED: "Ảnh mặt trước CCCD không tồn tại",
    CARD_BACK_IMAGE_NOT_EXISTED: "Ảnh mặt sau CCCD không tồn tại",

    // group
    GROUP_EXISTED: "Nhóm đã tồn tại",
    GROUP_NOT_EXISTED: "Nhóm không tồn tại",
    GROUP_NAME_EXISTED: "Tên nhóm đã tồn tại",
    GROUP_NAME_NOT_EXISTED: "Tên nhóm không tồn tại",

    //service package
    SERVICE_PACKAGE_EXISTED: "Gói dịch vụ đã tồn tại",
    SERVICE_PACKAGE_NOT_EXISTED: "Gói dịch vụ không tồn tại",
    SERVICE_PACKAGE_NAME_EXISTED: "Tên gói dịch vụ đã tồn tại",
    SERVICE_PACKAGE_NAME_NOT_EXISTED: "Tên gói dịch vụ không tồn tại",

    //excel
    OVER_LIMIT: "Vượt quá giới hạn",
    MAX_ROW_EXCEL: "File excel vượt quá giới hạn",
    IMPORT_SUCCESS: "Import thành công",
    IMPORT_FAILED: "Import thất bại",
    EXPORT_SUCCESS: "Export thành công",

    // files
    INVALID_FILE_SIZE: "File quá lớn",
    PRODUCT_NAME_EXISTED: "Tên sản phẩm đã tồn tại",
    LIMIT_FILE_SIZE: "File quá lớn",
    FILE_TYPE_INVALID: "File không hợp lệ",
    FILE_OVER_LIMIT: "Ảnh vượt quá số lượng cho phép",
    CREATE_FOLDER_FAILED: "Tạo thư mục thất bại",
    // order status
    PENDING_CONFIRMATION: "Chờ Xác Nhận",
    PROCESSING: "Đang Xử Lý",
    SHIPPING: "Đang Vận Chuyển",
    DELIVERED: "Đã Giao",
    CANCELLED: "Đã Hủy",
    //order
    ORDER_STATUS_NEW: "Đơn hàng mới",
    ORDER_STATUS_PROCESSING: "Đã duyệt",
    ORDER_STATUS_PACKING: "Đang giao hàng",
    ORDER_STATUS_DELIVERING: "Xuất kho",
    // ORDER_STATUS_DELIVERING: "Đang giao",
    ORDER_STATUS_DELIVERED: "Hoàn thành",
    ORDER_STATUS_CANCEL: "Đã hủy",
    ORDER_STATUS_RETURN: "Đã trả hàng",
    ORDER_STATUS_REFUND: "Đã hoàn tiền",
    ORDER_LIST_INVALID: "Danh sách đơn hàng không hợp lệ",
    ORDER_STATUS_NOT_EXISTED: "Trạng thái đơn hàng không tồn tại",
    ORDER_NOT_EXISTED: "Đơn hàng không tồn tại",
    ORDER_EXISTED: "Đơn hàng đã tồn tại",
    ORDER_STATUS_INVALID: "Trạng thái đơn hàng không hợp lệ",
    ORDER_STATUS_NOT_ALLOW: "Không thể thay đổi trạng thái đơn hàng",
    ORDER_STATUS_COMPLETED_OR_CANCEL: "Đơn hàng đã hoàn thành hoặc đã hủy",
    ORDER_CUSTOMER_ID: "Khách hàng không được để trống",
    NAME_NOT_EXISTED: "Tên không được để trống",
    ADDRESS_NOT_EXISTED: "Địa chỉ không được để trống",
    ORDER_STASTUS_COMPLETED: "Đơn hàng đã hoàn thành",
    ORDER_STASTUS_CANCEL: "Đơn hàng đã hủy",
    ORDER_STASTUS_NOT_PAYMENT: "Đơn hàng chưa thanh toán, không thể hoàn thành",
    STATUS_PAYMENT_0: "Chưa thanh toán",
    STATUS_PAYMENT_1: "Đã thanh toán",
    STATUS_PAYMENT_2: "Chờ thanh toán",
    INVALID_LIST_ORDER_DELIVERY: "Danh sách không hợp lệ, chỉ xuất kho với những đơn hàng ở trạng thái đã đóng gói",
    INVALID_LIST_STATUS_UPDATE: "Danh sách không hợp lệ, vui lòng chọn lại",

    //order detail
    PRICE_INVALID: "Giá không hợp lệ",
    QUANTITY_INVALID: "Số lượng không hợp lệ",
    DISCOUNT_TYPE_INVALID: "Loại giảm giá không hợp lệ",
    INVALID_STATUS_UPDATE: "Trạng thái không hợp lệ",

    //discount 
    DISCOUNT_TYPE_0: "Không có",
    DISCOUNT_TYPE_1: "%",
    DISCOUNT_TYPE_2: "Tiền mặt",
    DISCOUNT_VALUE_NOT_EXISTED: "Giá trị giảm giá không tồn tại",
    DISCOUNT_VALUE_INVALID: "Giá trị giảm giá không hợp lệ",
    DISCOUNT_TYPE_NOT_EXISTED: "Loại giảm giá không tồn tại",

    //product
    PRICE_MUST_GREATER_THAN_ZERO: "Giá bán không hợp lệ",
    UNIT_NOT_EXISTED: "Đơn vị không tồn tại",
    PRICE_WHOLESALE_CANNOT_NULL: "Giá bán sỉ không được để trống",
    PRICE_RETAIL_CANNOT_NULL: "Giá bán lẻ không được để trống",
    ALLOW_SELL: "Cho phép bán",
    NOT_ALLOW_SELL: "",

    //city
    CITY_NOT_EXISTED: "Thành phố không tồn tại",
    CITY_EXISTED: "Thành phố đã tồn tại",
    CITY_NAME_EXISTED: "Tên thành phố đã tồn tại",
    CITY_NAME_NOT_EXISTED: "Tên thành phố không tồn tại",

    //district
    DISTRICT_NOT_EXISTED: "Quận huyện không tồn tại",
    DISTRICT_EXISTED: "Quận huyện đã tồn tại",
    DISTRICT_NAME_EXISTED: "Tên quận huyện đã tồn tại",
    DISTRICT_NAME_NOT_EXISTED: "Tên quận huyện không tồn tại",

    //ward
    WARD_NOT_EXISTED: "Xã phường không tồn tại",
    WARD_EXISTED: "Xã phường đã tồn tại",
    WARD_NAME_EXISTED: "Tên xã phường đã tồn tại",
    WARD_NAME_NOT_EXISTED: "Tên xã phường không tồn tại",

    //shipping
    SHIP_METHOD_2: 'Giao hàng tận nơi',
    SHIP_METHOD_1: 'Nhận hàng tại cửa hàng',
    SHIP_METHOD_3: 'Nhận hàng tại bưu điện',
    SHIP_METHOD_4: 'Nhận hàng tại điểm giao hàng',
    SHIP_METHOD_NOT_EXISTED: "Phương thức giao hàng không tồn tại",

    //payment
    PAYMENT_METHOD_1: 'Tiền mặt',
    PAYMENT_METHOD_2: 'Chuyển khoản',
    PAYMENT_METHOD_3: 'Quẹt thẻ',
    PAYMENT_METHOD_4: 'Thanh toán qua ví điện tử',
    PAY_METHOD_NOT_EXISTED: "Phương thức thanh toán không tồn tại",

    //role
    ROLE_NOT_EXISTED: "Quyền không tồn tại",
    USER_NOT_EXISTED: "Người dùng không tồn tại",
    ROLE_EXISTED: "Quyền đã tồn tại",
    UPDATE_ROLE_FAILED: "Cập nhật quyền thất bại",
    CREATE_ROLE_FAILED: "Tạo quyền thất bại",

    // delivery note
    DELIVERY_NOTE_NOT_REQUIRED: "Phiếu xuất yêu cầu",
    QTY_NOT_VALID: "Số lượng không hợp lệ",
    DELIVERY_SUCCESS: "Xuất kho thành công",
    ORDER_STATUS_NOT_PROCESSING: "Đơn hàng không ở trạng thái xử lý",


    //action history
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    UPDATE_STATUS: 'update status',
    UPDATE_LIST_STATUS: 'update list status',
    DELETE_LIST: 'delete list',

    //role
    NOT_ADMIN: "Không phải admin",
    CHECK_SUCCESS: "Kiểm tra thành công",

    //commission
    COMMISSION_EXISTED: "Hoa hồng đã tồn tại",
    INVALID_DATE: "Khoảng thời gian chưa hợp lệ",
    EMPLOYEE_ID_REQUIRED: "Vui lòng chọn nhân viên",
    FROM_DATE_REQUIRED: "Vui lòng chọn ngày bắt đầu",
    TO_DATE_REQUIRED: "Vui lòng chọn ngày kết thúc",


    ORDER_CANCELED: "Đơn hàng đã bị hủy không thể chỉnh sửa",
    ORDER_COMPLETED: "Đơn hàng đã hoàn thành không thể chỉnh sửa",
    MISSING_FIELDS: "product_id, order_id không được để trống",

    PURCHASE_COMPLETED: "Đơn hàng đã hoàn thành không thể chỉnh sửa",
    PURCHASE_CANCELED: "Đơn hàng đã bị hủy không thể chỉnh sửa",




    //sort
    SORT_EXISTED: "Thứ tự đã tồn tại",
    //validate
    NAME_REQUIRED: "Tên không được để trống",
    //slugs
    SLUG_NOT_FOUND: "Không tìm thấy slug",
    FILE_REQUIRED: "Ảnh không được để trống",

    PRICE_SALE_INVALID: "Giá giảm không được lớn hơn giá",





    // action
    ACTION_CREATE: "Thêm",
    ACTION_UPDATE: "Sửa",
    ACTION_DELETE: "Xóa",
    ACTION_INDEX: "Xem",
    ACTION_IMPORT: "Nhập Excel",

    ACTION_CREATE_VALUE: "create",
    ACTION_UPDATE_VALUE: "update",
    ACTION_DELETE_VALUE: "delete",
    ACTION_INDEX_VALUE: "index",
    ACTION_IMPORT_VALUE: "import",
    INVALID_ACTION: "Hành động không hợp lệ",
    PERMISSION_DENIED: "Không có quyền truy cập",
    PERMISSION_GRANTED: "Đã cấp quyền truy cập",

    //role
    ROLE_ADMIN_NAME: "Admin",
    ROLE_USER_NAME: "User",
    ROLE_DEV_NAME: "Dev",
    ROLE_MAKETING_NAME: "Marketing",
    ROLE_SALE_NAME: "Sale",
    ROLE_EMPLOYEE_NAME: "Employee",
    INVALID_ROLE_ID: "Role không hợp lệ",


    ACTION_PUBLISH_VALUE: "publish",
    ACTION_PUBLISH: "Hiển thị",
    ACTION_STATUS: "Trạng thái",
    ACTION_EXPORT: "Xuất Excel",
    ACTION_EXPORT_VALUE: "export",
    ACTION_REPORT: "Xem báo cáo",
    ACTION_REPORT_VALUE: "report",

    PURCHASE_STATUS_CREATE: "Tạo đơn",
    PURCHASE_STATUS_IMPORT: "Nhập hàng",
    PURCHASE_STATUS_COMPLETED: "Hoàn thành",
    PURCHASE_STATUS_CANCEL: "Hủy",

    MISSING_DATA: "Thiếu dữ liệu",
    SELLER_NOT_FOUND: "Nhà bán không tồn tại",

    PURCHASE_STATUS_INVALID: "Trạng thái đơn hàng không hợp lệ",
    PURCHASE_STATUS_NOT_ALLOW: "Không thể thay đổi trạng thái đơn hàng",
    PURCHASE_STATUS_PAYMENT_INVALID: "Trạng thái thanh toán không hợp lệ",
    PURCHASE_MONEY_INVALID: "Số tiền không hợp lệ",
    PURCHASE_LIST_ORDER_IMPORT_INVALID: "Danh sách không hợp lệ, chỉ nhập hàng với những đơn hàng ở trạng thái tạo đơn",
    PURCHASE_LIST_STATUS_UPDATE_INVALID: "Danh sách không hợp lệ, vui lòng chọn lại",
    PURCHASE_LIST_STATUS_COMPLETE_INVALID: "Danh sách không hợp lệ, chỉ hoàn thành với những đơn hàng ở trạng thái nhập hàng đã thanh toán",
    UPDATE_STATUS_PAYMENT_FAILED: "Cập nhật trạng thái thanh toán thất bại",
}

const DEFAULT_TASK = {

}

// Các loại quyền
export const PERMISSION_TYPE = {
    CREATE: "CREATE",                            // Tạo mới
    UPDATE_INFO: "UPDATE_INFO",                  // Cập nhật thông tin hạng mục / công việc
    UPDATE_PROJECT_INFO: "UPDATE_PROJECT_INFO",  // ✅ Cập nhật thông tin dự án (mới thêm)
    UPDATE_PROGRESS: "UPDATE_PROGRESS",          // Cập nhật tiến độ
    CONFIRM_RESULT: "CONFIRM_RESULT",            // Xác nhận kết quả
    ASSIGN: "ASSIGN",                            // Giao việc
} as const;

// Danh sách quyền mặc định theo vai trò
export const DEFAULT_PERMISSIONS: { [key: number]: any[] } = {
    1: [ // Chủ đầu tư / Chủ dự án
        { type: PERMISSION_TYPE.CREATE, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 1 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 1 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 1 },
    ],
    2: [ // Chỉ huy trưởng / Quản lý công trình
        { type: PERMISSION_TYPE.CREATE, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 1 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 1 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 1 },
    ],
    3: [ // Kỹ sư hiện trường
        { type: PERMISSION_TYPE.CREATE, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 1 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 1 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 1 },
    ],
    4: [ // Giám sát (nội bộ / tư vấn)
        { type: PERMISSION_TYPE.CREATE, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 1 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 1 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 0 },
    ],
    5: [ // Đội trưởng đội thi công
        { type: PERMISSION_TYPE.CREATE, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 1 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 0 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 0 },
    ],
    6: [ // Kế toán công trình
        { type: PERMISSION_TYPE.CREATE, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 0 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 0 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 0 },
    ],
    7: [ // Văn phòng kỹ thuật / Ban kỹ thuật
        { type: PERMISSION_TYPE.CREATE, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 1 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 1 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 1 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 1 },
    ],
    8: [ // Nhà thầu phụ / Nhà cung cấp
        { type: PERMISSION_TYPE.CREATE, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 1 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 0 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 0 },
    ],
    9: [ // Khách / Đối tác (truy cập giới hạn)
        { type: PERMISSION_TYPE.CREATE, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROJECT_INFO, isAllowed: 0 },
        { type: PERMISSION_TYPE.UPDATE_PROGRESS, isAllowed: 0 },
        { type: PERMISSION_TYPE.CONFIRM_RESULT, isAllowed: 0 },
        { type: PERMISSION_TYPE.ASSIGN, isAllowed: 0 },
    ],
};

// defaultTasksByKey.ts

/**
 * Danh sách các công việc mặc định (task) ứng với từng loại công trình (category.key).
 * Mỗi mục (key) sẽ có một mảng các task bao gồm tên, mô tả và mức độ ưu tiên (1 = Cao, 2 = Trung bình, 3 = Thấp).
 */
export const defaultTasksByKey: Record<
    string,
    { name: string; description?: string; priority?: string }[]
> = {
    // === DÂN DỤNG ===
    // 1) Nhà phố
    nha_pho: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát hiện trạng",
            description:
                "Tiến hành đo đạc, kiểm tra hiện trạng mảnh đất; xác định ranh giới, độ nghiêng, độ cao; kiểm tra hệ thống hạ tầng xung quanh (đường, điện, nước)",
            priority: "low",
        },
        {
            name: "Lập dự toán sơ bộ và thẩm định ngân sách",
            description:
                "Xác định các khoản chi phí chính: nhân công, vật liệu, máy móc, chi phí pháp lý; dự phòng phát sinh; thẩm định với chủ đầu tư",
            priority: "low",
        },
        {
            name: "Giải phóng mặt bằng",
            description: "Dọn dẹp, giải tỏa cây cối, công trình phụ; làm sạch mặt bằng xây dựng",
            priority: "low",
        },
        {
            name: "Lập kế hoạch thi công và tiến độ",
            description:
                "Phân bổ nhân lực, phương tiện; xác định các mốc tiến độ quan trọng: khởi công, đổ móng, cất nóc, hoàn thiện; dự phòng rủi ro thời tiết",
            priority: "low",
        },
        {
            name: "Xin giấy phép xây dựng",
            description:
                "Hoàn tất thủ tục pháp lý, nộp hồ sơ thiết kế bản vẽ, giấy tờ quy hoạch; nhận giấy phép xây dựng từ chính quyền địa phương",
            priority: "low",
        },
        // Giai đoạn thi công phần thô
        {
            name: "Thi công móng",
            description:
                "Đào đất theo cao độ thiết kế; ép cọc hoặc đổ móng bè, sử dụng vật liệu đạt chuẩn; kiểm tra cường độ bê tông mác cao",
            priority: "low",
        },
        {
            name: "Gia cố nền và xử lý móng yếu (nếu cần)",
            description:
                "Xử lý nền đất yếu, bơm vữa xi măng, gia cố bằng cừ tràm hoặc cọc nhỏ; kiểm tra độ lún sau thi công",
            priority: "low",
        },
        {
            name: "Kiểm tra chất lượng vật liệu xây dựng",
            description:
                "Kiểm định xi măng, cát, đá, thép trước khi sử dụng: lấy mẫu, thử nén, kiểm tra độ ẩm; lưu trữ vật liệu đúng tiêu chuẩn",
            priority: "low",
        },
        {
            name: "Thi công khung kết cấu",
            description:
                "Xây dựng khung bê tông cốt thép: cột, dầm, sàn theo bản vẽ; sử dụng coffa chuẩn, căng dây bảo đảm vị trí chính xác",
            priority: "low",
        },
        {
            name: "Xây tường và ngăn phòng",
            description:
                "Xây tường gạch ống hoặc gạch đặc, vữa đạt chuẩn; đảm bảo liên kết chặt, làm phẳng mặt tường để thuận tiện thi công sau",
            priority: "medium",
        },
        {
            name: "Thi công hệ thống điện âm tường thô",
            description:
                "Đi dây điện cơ bản (dây chính, dây ổ cắm, dây chiếu sáng); lắp đặt ống luồn, hộp đấu nối; bảo vệ đầu dây chống ẩm",
            priority: "medium",
        },
        {
            name: "Thi công hệ thống cấp thoát nước thô",
            description:
                "Lắp đặt ống cấp nước, ống thoát sàn, ring-in ring-out cho toilet; kiểm tra độ nghiêng ống thoát; thử áp lực nước",
            priority: "medium",
        },
        // Giai đoạn hoàn thiện
        {
            name: "Lát sàn và ốp tường",
            description:
                "Hoàn thiện lát gạch ốp lát sàn tầng trệt, lầu; ốp gạch tường nhà vệ sinh, bếp; kiểm tra phẳng, khe ron đều",
            priority: "medium",
        },
        {
            name: "Lắp đặt cửa, khung cửa và lan can cầu thang",
            description:
                "Lắp cửa chính, cửa sổ, khung nhôm hoặc gỗ; thi công lan can cầu thang sắt hoặc inox; kiểm tra độ đóng mở, chịu lực",
            priority: "medium",
        },
        {
            name: "Sơn bả và trang trí tường",
            description:
                "Trát bả tường, đánh bóng, sơn lót, sơn phủ màu; bảo vệ tường khỏi ẩm mốc; trang trí phào chỉ (nếu có)",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống đèn chiếu sáng và ổ cắm",
            description:
                "Lắp đèn downlight, đèn trang trí; lắp ổ cắm, công tắc; đấu nối điện hoàn chỉnh, kiểm tra an toàn điện",
            priority: "medium",
        },
        {
            name: "Lắp đặt thiết bị vệ sinh và bếp",
            description:
                "Lắp bồn cầu, lavabo, sen vòi, chậu rửa bát, kệ bếp; kiểm tra kín nước, không rò rỉ; hoàn thiện đường cấp thoát nước",
            priority: "medium",
        },
        {
            name: "Cài đặt hệ thống điều hòa và thông gió",
            description:
                "Lắp giá đỡ dàn nóng, lắp dàn lạnh; chạy thử hệ thống điều hòa; lắp quạt thông gió, ống hút mùi bếp",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống an ninh: camera, báo động",
            description:
                "Thiết lập vị trí camera, lắp camera IP, đường mạng; cài đặt hệ thống báo động chống trộm, kết nối app di động",
            priority: "medium",
        },
        {
            name: "Hoàn thiện nội thất cơ bản",
            description:
                "Lắp tủ bếp cơ bản, tủ áo, kệ tivi; hoàn thiện tay vịn cầu thang, sơn bảo vệ lan can; kiểm tra thẩm mỹ",
            priority: "medium",
        },
        {
            name: "Hoàn thiện cảnh quan sân vườn",
            description:
                "Trồng cây, bồn hoa, lát sân, tạo lối đi ngoài trời; thi công đường ống tưới cây; lắp đèn sân vườn",
            priority: "medium",
        },
        {
            name: "Kiểm tra, nghiệm thu và bàn giao",
            description:
                "Kiểm tra toàn bộ hạng mục: kết cấu, điện, nước, hoàn thiện nội thất; nghiệm thu với chủ đầu tư, lập biên bản bàn giao",
            priority: "hight",
        },
        {
            name: "Hướng dẫn sử dụng và bảo trì sau xây dựng",
            description:
                "Bàn giao tài liệu hướng dẫn vận hành hệ thống điện, nước, điều hòa, smarthome; lập lịch bảo trì ban đầu",
            priority: "hight",
        },
        {
            name: "Theo dõi công trình sau bàn giao (bảo hành)",
            description:
                "Khảo sát định kỳ sau bàn giao 1 tháng, 3 tháng; xử lý các vết nứt, hư hỏng nhỏ; ghi nhận ý kiến và bảo hành",
            priority: "hight",
        },
    ],

    // 2) Biệt thự
    biet_thu: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát địa hình và địa chất chi tiết",
            description:
                "Đo đạc topo 3D, khảo sát địa chất hố khoan; lấy mẫu đất phân tích: xác định tầng đất yếu, mực nước ngầm",
            priority: "low",
        },
        {
            name: "Lập quy hoạch tổng mặt bằng",
            description:
                "Bố trí công năng sân trước, sân sau, khoảng lùi, gara, đường nội bộ; tính toán diện tích cây xanh, thoát nước bề mặt",
            priority: "low",
        },
        {
            name: "Lập dự toán chi tiết và dự phòng rủi ro",
            description:
                "Phân tích chi phí nhân công, vật liệu nội thất cao cấp, ngoại thất; tính thêm chi phí chống thấm, nội thất gỗ tự nhiên",
            priority: "low",
        },
        {
            name: "Thiết kế 3D kiến trúc, nội thất và cảnh quan",
            description:
                "Lên mô hình 3D toàn cảnh biệt thự: ngoại thất, nội thất chính, sân vườn, bể bơi (nếu có); trình duyệt với chủ đầu tư",
            priority: "low",
        },
        {
            name: "Xin giấy phép xây dựng, PCCC và bảo vệ môi trường",
            description:
                "Hoàn tất thủ tục giấy phép xây dựng, giấy chứng nhận PCCC; đánh giá tác động môi trường: khí thải, nước thải, tiếng ồn",
            priority: "low",
        },
        {
            name: "Lập kế hoạch an toàn lao động và vệ sinh môi trường",
            description:
                "Xây dựng biện pháp thi công an toàn: lan can bảo vệ, biển báo; lập quy trình xử lý phế thải: rác thải xây dựng, nước rửa xi măng",
            priority: "low",
        },
        // Giai đoạn thi công phần thô
        {
            name: "Thi công ép cọc hoặc đổ móng sâu, gia cố nền",
            description:
                "Ép cọc bê tông hoặc móng cọc khoan nhồi; đổ móng bè, kiểm tra cường độ bê tông; gia cố nền bằng mụn vữa xi măng nếu cần",
            priority: "low",
        },
        {
            name: "Kiểm tra chất lượng vật liệu và gia cố nền",
            description:
                "Kiểm định bê tông, thép, đá; kiểm tra độ ẩm gỗ (nếu sử dụng); xử lý nguy cơ nứt, lún",
            priority: "low",
        },
        {
            name: "Thi công khung bê tông cốt thép và tường chịu lực",
            description:
                "Xây dựng hệ kết cấu cột, dầm, sàn; sử dụng coffa, thép đạt chuẩn; xây tường gạch chịu lực, trát vữa chống rạn nứt",
            priority: "low",
        },
        {
            name: "Lắp đặt hệ thống chống thấm mặt sàn tầng hầm (nếu có)",
            description:
                "Chống thấm bằng màng khò nóng, sơn chống thấm; kiểm tra chống thấm sau khi đổ bê tông tầng hầm",
            priority: "medium",
        },
        {
            name: "Xây tường bao và ngăn phòng",
            description:
                "Xây tường gạch dày 200–250mm; chia phòng khách, phòng ngủ, phòng bếp; làm phẳng mặt, bụi vữa cho giai đoạn hoàn thiện",
            priority: "medium",
        },
        {
            name: "Lợp mái và xử lý chống thấm",
            description:
                "Lợp ngói, tôn lạnh hoặc mái bằng; xử lý chống thấm bằng vữa polyme hoặc màng chống thấm; kiểm tra độ dốc thoát nước",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống cơ điện (MEP)",
            description:
                "Lắp đặt hệ thống điện chính, ổ cắm, chiếu sáng; lắp điều hòa âm trần; đi ống điều hòa, ống thông gió; lắp ống cấp nước, ống thoát nước",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống năng lượng mặt trời",
            description:
                "Lắp đặt tấm pin năng lượng mặt trời: tính toán công suất, xác định hướng đặt; lắp đặt bình năng lượng, biến tần, đấu nối vào hệ thống điện",
            priority: "medium",
        },
        {
            name: "Hoàn thiện mặt ngoài (Facade)",
            description:
                "Ốp đá tự nhiên, gạch ngoại thất, sơn bề mặt; lắp kính cường lực cho cửa sổ lớn; trang trí chi tiết phào chỉ, ban công",
            priority: "medium",
        },
        // Giai đoạn hoàn thiện nội thất & cảnh quan
        {
            name: "Hoàn thiện nội thất cao cấp",
            description:
                "Lắp sàn gỗ tự nhiên, ốp tường gỗ; thi công trần thạch cao giật cấp; lắp đặt hệ thống ánh sáng trang trí: đèn chùm, đèn âm trần, đèn LED",
            priority: "medium",
        },
        {
            name: "Lắp đặt tủ bếp, tủ áo, kệ trang trí",
            description:
                "Thiết kế và đóng tủ bếp gỗ MDF/An Cường; đóng tủ áo âm tường, kệ trang trí phòng khách; hoàn thiện bề mặt, bản lề giảm chấn",
            priority: "medium",
        },
        {
            name: "Thi công bể bơi mini và hệ thống lọc",
            description:
                "Xây bể bơi bằng bê tông cốt thép hoặc composite; lắp đặt thiết bị lọc, hệ thống cấp thoát nước, hệ thống chiếu sáng dưới nước",
            priority: "medium",
        },
        {
            name: "Thiết kế và thi công cảnh quan sân vườn",
            description:
                "Trồng cây bóng mát, tiểu cảnh hồ nước, sân cỏ; lát gạch ngoài trời, tạo lối đi; lắp đèn sân vườn, hệ thống tưới tự động",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống an ninh và tự động hóa (smarthome)",
            description:
                "Thiết lập camera giám sát, cảm biến chuyển động, hệ thống báo trộm; lắp hệ thống điều khiển ánh sáng, rèm cửa thông minh qua app",
            priority: "medium",
        },
        {
            name: "Hoàn thành nghiệm thu và bàn giao",
            description:
                "Kiểm tra tổng thể: kết cấu, điện, nước, nội ngoại thất, hệ thống PCCC; nghiệm thu từng hạng mục, hoàn thiện hồ sơ, bàn giao chìa khoá",
            priority: "hight",
        },
        {
            name: "Hướng dẫn sử dụng hệ thống smarthome và bảo hành",
            description:
                "Đào tạo chủ đầu tư sử dụng ứng dụng điều khiển; bàn giao tài liệu bảo hành tủ bếp, thiết bị cơ điện; lập lịch bảo trì định kỳ",
            priority: "hight",
        },
        {
            name: "Theo dõi bảo hành sau bàn giao",
            description:
                "Khảo sát định kỳ 1 tháng, 6 tháng; kiểm tra chống thấm, nứt tường, hư hỏng cơ điện; bảo hành vật liệu, sơn, thiết bị theo hợp đồng",
            priority: "hight",
        },
    ],

    // 3) Chung cư
    chung_cu: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát địa hình và móng khảo sát địa chất",
            description:
                "Đánh giá địa chất đa điểm, kiểm tra mực nước ngầm; xác định độ lún, độ chịu tải; khảo sát hiện trạng cơ sở hạ tầng xung quanh",
            priority: "low",
        },
        {
            name: "Lập quy hoạch tổng thể và phối cảnh kiến trúc",
            description:
                "Thiết kế sơ bộ quy hoạch: phân lô block, khoảng lùi, lối xe, bãi đậu xe; dựng mô hình phối cảnh 3D tòa nhà và cảnh quan xung quanh",
            priority: "low",
        },
        {
            name: "Lập dự toán chi tiết và kế hoạch tài chính",
            description:
                "Phân tích chi phí xây dựng từng block, dự phòng chi phí phát sinh; lập ngân sách vận hành tạm thời (tiếp nhận, bảo trì)",
            priority: "low",
        },
        {
            name: "Xin giấy phép xây dựng & PCCC",
            description:
                "Hoàn tất thủ tục xin phép tổng thể tòa nhà, cầu thang bộ, thang máy; xin giấy phép phòng cháy chữa cháy cho từng block",
            priority: "low",
        },
        {
            name: "Lập kế hoạch quản lý dự án và giám sát chất lượng",
            description:
                "Thiết lập quy trình quản lý tiến độ, chất lượng; phân công giám sát hiện trường, an toàn lao động, môi trường; xác định KPIs thi công",
            priority: "low",
        },
        // Giai đoạn thi công phần ngầm
        {
            name: "Thi công móng và tầng hầm",
            description:
                "Đào đất, ép cọc, đổ bê tông móng; thi công hầm để xe nhiều tầng: chống thấm, chống thấm ngược, thoát nước hầm",
            priority: "low",
        },
        {
            name: "Kiểm tra chất lượng cọc bê tông và chống thấm",
            description:
                "Kiểm định cọc sau ép: siêu âm, thử tải; kiểm tra chống thấm bằng sơn thẩm thấu hoặc tấm màng HDPE cho hầm",
            priority: "low",
        },
        // Giai đoạn thi công khung nổi
        {
            name: "Xây dựng khung kết cấu tầng nổi",
            description:
                "Thi công khung bê tông cốt thép: dầm, cột, sàn; áp dụng công nghệ coffa tự leo (self-climbing shuttering) nếu cần",
            priority: "low",
        },
        {
            name: "Xây tường ngăn tầng và kết cấu chịu lực phụ",
            description:
                "Xây tường gạch 200mm, tường ngăn nội bộ 100mm; lắp đặt lan can ban công, lan can cầu thang bộ",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống MEP (điện nước, điều hòa trung tâm)",
            description:
                "Đi ống điện chính, lắp trạm biến áp nhỏ; lắp đường ống cấp nước, thoát nước, hệ thống điều hòa trung tâm; đặt hố ga, bể nước ngầm",
            priority: "medium",
        },
        {
            name: "Lắp đặt thang máy và thang bộ chống cháy",
            description:
                "Lắp cabin thang máy tiêu chuẩn, hệ thống điều khiển; thi công thang bộ chịu lửa, sơn chịu nhiệt, cửa chống cháy",
            priority: "medium",
        },
        {
            name: "Thi công hoàn thiện mặt ngoài (Facade)",
            description:
                "Lắp kính Low-E, ốp gạch Granite, sơn bả hệ silicone; thi công ban công, lam nhôm trang trí; kiểm tra độ kín khít, chống thấm",
            priority: "medium",
        },
        // Giai đoạn hoàn thiện nội thất và tiện ích chung
        {
            name: "Hoàn thiện căn hộ mẫu",
            description:
                "Thi công lát sàn gạch/ván công nghiệp; sơn bả tường, lắp thiết bị vệ sinh, bếp; trang trí nội thất cơ bản để trưng bày cho khách hàng",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống phòng cháy chữa cháy tự động",
            description:
                "Lắp đặt đầu phun sprinkler, xi phông, hệ thống báo cháy, trung tâm điều khiển PCCC; chạy thử hệ thống, kiểm tra áp lực nước",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống chiếu sáng chung và biển chỉ dẫn",
            description:
                "Lắp đèn hành lang, đèn khẩn cấp, biển báo lối thoát hiểm; đấu nối điện dự phòng, UPS cho khu vực thang máy",
            priority: "medium",
        },
        {
            name: "Thiết lập khu vui chơi, siêu thị nhỏ, phòng sinh hoạt cộng đồng",
            description:
                "Xây dựng khu vực sân chơi trẻ em, gắn thiết bị vui chơi; bố trí quầy siêu thị mini, phòng sinh hoạt cộng đồng với thiết bị giải trí cơ bản",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống camera an ninh và kiểm soát ra vào",
            description:
                "Cài đặt camera CCTV tại hành lang, hầm xe; lắp đầu đọc thẻ ra vào, barie khu đậu xe; kết nối hệ thống với bộ phận bảo vệ",
            priority: "medium",
        },
        {
            name: "Kiểm tra hệ thống cấp nước, điện, PCCC",
            description:
                "Thử áp lực ống cấp nước, kiểm tra rò rỉ; kiểm tra các tủ điện, nguồn dự phòng; thử nghiệm hệ thống chữa cháy, đầu phun",
            priority: "medium",
        },
        {
            name: "Nghiệm thu, cấp điện nước, bàn giao căn hộ",
            description:
                "Kiểm tra toàn bộ hạng mục, nghiệm thu với cơ quan chức năng: PCCC, Sở Xây dựng; bàn giao chìa khóa, hợp đồng dịch vụ cho cư dân",
            priority: "hight",
        },
        {
            name: "Hướng dẫn cư dân sử dụng tiện ích chung cư",
            description:
                "Hướng dẫn sử dụng thang máy, phòng cháy chữa cháy, hệ thống đèn khẩn cấp; phát tờ rơi hướng dẫn quản lý rác thải, giữ vệ sinh chung",
            priority: "hight",
        },
        {
            name: "Theo dõi giai đoạn bảo hành và sửa chữa",
            description:
                "Khảo sát sau 1 tháng, 6 tháng; kiểm tra hệ thống điện, nước, PCCC; sửa chữa các vết nứt, vật liệu bong tróc, bảo hành thang máy",
            priority: "hight",
        },
    ],

    // === CÔNG NGHIỆP ===
    // 4) Nhà xưởng
    nha_xuong: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát khu đất và khảo sát địa chất",
            description:
                "Đánh giá nền đất chịu tải, mực nước ngầm, gần nguồn nước thải; xác định khả năng thoát nước, mức độ ô nhiễm trước xây dựng",
            priority: "low",
        },
        {
            name: "Lập bản vẽ kiến trúc & kết cấu thép",
            description:
                "Thiết kế sơ đồ bố trí xưởng: khu sản xuất, kho nguyên liệu, văn phòng; tính toán kết cấu khung thép theo tải trọng máy móc",
            priority: "low",
        },
        {
            name: "Lập dự toán chi phí và lập kế hoạch vật tư",
            description:
                "Dự toán toàn bộ chi phí vật liệu thép, bê tông, hệ thống PCCC, điện; xác định thời gian đặt hàng, dự phòng thời gian giao hàng",
            priority: "low",
        },
        {
            name: "Xin giấy phép đầu tư & PCCC",
            description:
                "Hoàn tất thủ tục hành chính xin giấy phép xây dựng; xin giấy phép PCCC cho xưởng sản xuất, hệ thống chữa cháy chịu áp lực",
            priority: "low",
        },
        {
            name: "Lập kế hoạch quản lý an toàn lao động và môi trường",
            description:
                "Thiết lập quy định an toàn: mũ bảo hộ, bảo hộ tai cho công nhân; phương án xử lý bụi, tiếng ồn, chất thải nguy hại",
            priority: "low",
        },
        // Giai đoạn thi công phần móng
        {
            name: "Thi công móng bê tông chịu tải lớn",
            description:
                "Đổ móng bê tông cốt thép, gia cố bằng thép phi lớn; sử dụng bê tông mác cao, kiểm tra độ nén và độ lún sau 7, 14 ngày",
            priority: "low",
        },
        {
            name: "Kiểm tra độ chịu tải nền móng",
            description:
                "Thử tải móng bằng thép hoặc bằng tải thực tế; đo đạc độ lún; xác nhận đủ điều kiện chịu tải cho khung thép",
            priority: "low",
        },
        // Giai đoạn khung thép
        {
            name: "Lắp dựng khung thép chính",
            description:
                "Lắp ráp cột, dầm thép, hệ giàn kèo theo bản vẽ kết cấu; hàn nối chuẩn, kiểm tra mối hàn; kiểm tra độ thăng bằng khung",
            priority: "low",
        },
        {
            name: "Lắp đặt hệ thống tôn và panel cách nhiệt",
            description:
                "Lắp mái tôn chống nóng, panel cách nhiệt tường; kiểm tra kín khít, chống dột; lắp cửa cuốn công nghiệp vùng sản xuất",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống xử lý nước thải và PCCC",
            description:
                "Xây bể điều hòa, bể tách dầu, hệ thống bơm nước thải; lắp đặt hệ thống chữa cháy: bình chữa cháy, họng nước, đường ống Sprinkler",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống điện, chiếu sáng và máy móc",
            description:
                "Lắp đường điện trung thế, trạm biến áp nhỏ; lắp hệ thống chiếu sáng công nghiệp: đèn highbay; đấu nối máy móc sản xuất, lắp ắc-quy dự phòng",
            priority: "medium",
        },
        {
            name: "Hoàn thiện khoang sản xuất & văn phòng",
            description:
                "Lắp vách ngăn, sơn epoxy sàn nhà xưởng, lắp trần panel văn phòng; hoàn thiện phòng điều khiển, phòng nghỉ công nhân",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống thông gió công nghiệp và xử lý bụi",
            description:
                "Lắp quạt hút công nghiệp, đường ống dẫn gió, hệ thống lọc bụi; lắp đặt máy lạnh xưởng, hệ thống làm mát không khí (evaporative cooler)",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống tự động hóa cấp điện (PLC/SCADA)",
            description:
                "Cài đặt PLC, HMI cho điều khiển máy móc chính; kết nối SCADA giám sát: nhiệt độ, áp suất, tình trạng hoạt động",
            priority: "medium",
        },
        {
            name: "Kiểm định an toàn lao động, tiếng ồn, bụi",
            description:
                "Đo đạc mức ồn, nồng độ bụi tường; kiểm định hệ thống chống ồn, hệ thống xử lý bụi; báo cáo an toàn lao động",
            priority: "medium",
        },
        {
            name: "Thiết lập khu vực lưu trữ nguyên liệu và thành phẩm",
            description:
                "Lắp đặt kệ công nghiệp, pallet; phân khu vực lưu nguyên liệu dễ cháy, chất độc hại; bố trí lối đi, biển báo an toàn",
            priority: "medium",
        },
        {
            name: "Kiểm định chất lượng, nghiệm thu và bàn giao",
            description:
                "Kiểm tra, chạy thử máy móc, thử tải, nghiệm thu PCCC; lập biên bản nghiệm thu hạng mục; bàn giao đưa vào hoạt động",
            priority: "hight",
        },
        {
            name: "Hướng dẫn vận hành máy móc và bảo trì định kỳ",
            description:
                "Đào tạo nhân viên vận hành, lập quy trình bảo trì; lên lịch kiểm tra định kỳ: máy móc, hệ thống điện, xử lý môi trường",
            priority: "hight",
        },
    ],

    // 5) Kho bãi
    kho_bai: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát mặt bằng và đánh giá nền đất",
            description:
                "Đo đạc khu vực, kiểm tra độ cứng nền đất; xác định tải trọng bánh xe nâng, tải trọng hàng lưu trữ",
            priority: "low",
        },
        {
            name: "Lập thiết kế kho lưu trữ và bố trí kệ",
            description:
                "Lên bản vẽ kiến trúc kho: kích thước trần, cột, lối đi giữa các kệ; lựa chọn loại kệ pallet, kệ tầng, kệ drive-in",
            priority: "low",
        },
        {
            name: "Lập dự toán vật tư và phương án logistics",
            description:
                "Tính số lượng bê tông, thép, tôn; lên kế hoạch vận chuyển vật liệu; xác định vị trí bãi xe nâng, lối ra vào xe tải",
            priority: "low",
        },
        {
            name: "Xin giấy phép xây dựng & PCCC",
            description:
                "Hoàn tất thủ tục pháp lý liên quan đến kho bãi: giấy phép xây dựng, cấp phép PCCC, cấp phép vệ sinh an toàn thực phẩm (nếu lưu trữ lương thực)",
            priority: "low",
        },
        {
            name: "Lập kế hoạch quản lý an toàn và xử lý chất thải",
            description:
                "Thiết kế hệ thống thu gom phế liệu gỗ, kim loại; phương án xử lý dầu mỡ, rác thải nguy hại; quy định an toàn xe nâng",
            priority: "low",
        },
        // Giai đoạn thi công phần móng
        {
            name: "Đào và đổ móng bê tông chịu tải",
            description:
                "Chuẩn bị nền đất, đầm chặt; đổ móng bê tông mác cao, gia cố lưới thép; kiểm tra độ phẳng sàn bê tông",
            priority: "low",
        },
        {
            name: "Kiểm tra chất lượng bê tông móng",
            description:
                "Lấy mẫu bê tông thử nén; đo lún móng sau thi công; xử lý phẳng bề mặt sàn theo tiêu chuẩn kỹ thuật",
            priority: "low",
        },
        // Giai đoạn kết cấu
        {
            name: "Xây khung kết cấu bê tông hoặc thép",
            description:
                "Lắp dựng cột bê tông cốt thép hoặc khung thép; xây tường gạch hoặc tôn panel; thi công kết cấu dầm mái",
            priority: "low",
        },
        {
            name: "Xây tường bao và lắp cửa trượt lớn",
            description:
                "Xây tường gạch hoặc ốp panel cách nhiệt; lắp cửa cuốn, cửa trượt tự động cho xe nâng và xe tải",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống PCCC và điện chiếu sáng",
            description:
                "Lắp đặt trụ chữa cháy, đầu phun sprinkler, họng nước; lắp đặt hệ thống điện công nghiệp: đèn highbay, tủ điện phân phối",
            priority: "medium",
        },
        {
            name: "Trải sàn bê tông kỹ thuật và chống bụi",
            description:
                "Hoàn thiện sàn bê tông mài, phủ sơn epoxy chống bụi; kiểm tra độ phẳng, chống thấm, chịu tải pallet",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống kệ pallet và giá đỡ",
            description:
                "Thiết lập hệ thống kệ pallet tiêu chuẩn công nghiệp; lắp đặt giá đỡ, đo đạc khoảng cách an toàn giữa kệ",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống kiểm soát truy cập tự động",
            description:
                "Lắp đặt cổng từ, hệ thống đọc mã vạch hoặc RFID cho khu kiểm soát vật liệu ra vào; lắp camera giám sát bãi xe",
            priority: "medium",
        },
        {
            name: "Hoàn thiện văn phòng quản lý và phòng bảo vệ",
            description:
                "Thiết kế và thi công văn phòng điều hành: vách kính, trần thạch cao; xây dựng phòng bảo vệ, lắp đặt bộ đàm nội bộ",
            priority: "medium",
        },
        {
            name: "Kiểm tra, nghiệm thu PCCC và bàn giao",
            description:
                "Thử nghiệm hệ thống PCCC: bật họng nước, thử động cơ bơm; nghiệm thu và ký biên bản với Phòng Cảnh sát PCCC; bàn giao đưa vào sử dụng",
            priority: "hight",
        },
        {
            name: "Hướng dẫn vận hành kho và bảo trì thiết bị",
            description:
                "Đào tạo nhân viên: vận hành xe nâng, hệ thống kệ; lập kế hoạch bảo trì định kỳ: kiểm tra PCCC, bảo dưỡng kệ, vệ sinh nhà xưởng",
            priority: "hight",
        },
    ],

    // === HẠ TẦNG ===
    // 6) Cầu đường
    cau_duong: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát địa hình và cao độ",
            description:
                "Đo đạc topo, lập bản đồ cao độ chi tiết; kiểm tra độ nghiêng, địa chất nền đường hoặc vị trí trụ cầu; xác định vật cản, cốt nền",
            priority: "low",
        },
        {
            name: "Lập thiết kế kỹ thuật và kết cấu",
            description:
                "Thiết kế bản vẽ kết cấu cầu hoặc mặt đường: đáy đường, lớp móng, lớp áo; tính toán tải trọng, áp lực nước; thiết kế chuyển tiếp đường nhánh",
            priority: "low",
        },
        {
            name: "Xin giấy phép thi công & giải phóng mặt bằng",
            description:
                "Hoàn tất thủ tục hành chính: xin phép khai thác đất đá, cho phép thi công; GPMB: di dời dân, hạ ngầm đường dây điện, đường ống ngầm",
            priority: "low",
        },
        {
            name: "Lập kế hoạch giao thông tạm thời",
            description:
                "Thiết kế phương án điều tiết giao thông: đặt biển báo, rào chắn; hướng dẫn phương tiện đi đường vòng; thỏa thuận với cảnh sát giao thông",
            priority: "low",
        },
        // Giai đoạn thi công nền
        {
            name: "Thi công nền đường hoặc trụ cầu",
            description:
                "Gia cố nền bằng đá dăm, cát đầm chặt; đổ trụ cầu bê tông cốt thép chịu lực; thi công kích thước trụ theo bản vẽ, đảm bảo thẳng đứng",
            priority: "low",
        },
        {
            name: "Kiểm tra nền và cốt liệu bê tông",
            description:
                "Lấy mẫu bê tông, thử nén; kiểm tra độ chặt nền đường: độ chặt RLTK; kiểm tra lớp móng, vật liệu đắp, độ ẩm nền",
            priority: "low",
        },
        // Giai đoạn thi công mặt cầu hoặc mặt đường
        {
            name: "Đổ bê tông mặt cầu/mặt đường",
            description:
                "Thi công bê tông bản mặt cầu hoặc đường theo cấp phối đá dăm, xi măng; đảm bảo độ dày, xi măng mác cao, phân phối cốt thép đúng vị trí",
            priority: "low",
        },
        {
            name: "Lắp đặt hệ thống thoát nước dọc đường",
            description:
                "Thiết lập cống hộp, mương dẫn nước hai bên; lắp đặt hố ga thu nước mặt; đảm bảo độ dốc thoát nước phù hợp",
            priority: "medium",
        },
        {
            name: "Lắp đặt lan can cầu hoặc rào chắn an toàn",
            description:
                "Lắp lan can cầu bằng kim loại hoặc bê tông đúc sẵn; giằng rào chắn an toàn dọc đường; kiểm tra độ chắc chắn, chống va đập",
            priority: "medium",
        },
        {
            name: "Sơn kẻ vạch đường và lắp biển báo phụ trợ",
            description:
                "Đánh dấu vạch sơn đường: vạch dừng, vạch phân làn, vạch qua đường; lắp biển báo tốc độ, biển báo nguy hiểm, gương cầu lồi",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống chiếu sáng an toàn",
            description:
                "Lắp đặt trụ điện đường, đèn LED tiết kiệm năng lượng; đấu nối vào lưới điện quốc gia hoặc hệ thống điện mặt trời; kiểm tra độ rọi ánh sáng",
            priority: "medium",
        },
        {
            name: "Lắp đặt thiết bị giám sát giao thông (nếu có)",
            description:
                "Lắp đặt camera giám sát, cảm biến đo tốc độ; kết nối về trung tâm quản lý giao thông; đảm bảo cấp điện liên tục",
            priority: "medium",
        },
        {
            name: "Kiểm tra chất lượng vật liệu đường",
            description:
                "Thử nghiệm độ bền nhựa đường: kiểm tra độ lún, vết rạn; thử nghiệm bê tông xi măng: độ bền nén, độ chống ăn mòn",
            priority: "medium",
        },
        {
            name: "Kiểm định chất lượng, nghiệm thu và bàn giao",
            description:
                "Thử tải cầu: xe tải thử tải; kiểm tra độ võng sàn cầu; nghiệm thu toàn bộ hạng mục, lập biên bản bàn giao đưa vào sử dụng",
            priority: "hight",
        },
        {
            name: "Bảo trì mặt đường, cầu giai đoạn đầu",
            description:
                "Giám sát và xử lý vết nứt nhỏ: bơm vá, trám khe co giãn; kiểm tra lan can, biển báo; bảo dưỡng sơn kẻ vạch",
            priority: "hight",
        },
        {
            name: "Kiểm tra định kỳ và bảo trì kết cấu",
            description:
                "Khảo sát sau 3 tháng, 6 tháng; kiểm tra mối nối co giãn, khe co giãn; bảo dưỡng hệ thống chiếu sáng, lan can",
            priority: "hight",
        },
    ],

    // 7) Hệ thống cấp thoát nước
    he_thong_cap_thoat_nuoc: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát tuyến ống và địa chất",
            description:
                "Xác định đường đi ống cấp và thoát nước; kiểm tra địa chất nền: độ xốp, tầng nước ngầm; khảo sát hiện trạng hệ thống cũ (nếu có)",
            priority: "low",
        },
        {
            name: "Thiết kế hệ thống cấp thoát nước và phòng chống ngập",
            description:
                "Lập bản vẽ mạng lưới ống: ống HDPE, PVC, uPVC; tính toán lưu lượng, áp lực; thiết kế hố ga, trạm bơm, biện pháp chống ngập úng",
            priority: "low",
        },
        {
            name: "Lập dự toán chi phí và kế hoạch thi công",
            description:
                "Tính toán khối lượng đất đào, ống cấp, ống thoát, van khóa; lập kế hoạch sử dụng máy móc: máy xúc, máy lu, máy khoan địa chất",
            priority: "low",
        },
        {
            name: "Xin giấy phép thi công hạ tầng và PCCC",
            description:
                "Xin phép đào đường, lắp ống, kết nối nước thải về trạm xử lý; xin giấy phép PCCC cho hệ thống bơm, trạm bơm",
            priority: "low",
        },
        {
            name: "Lập kế hoạch quản lý môi trường và an toàn lao động",
            description:
                "Biện pháp quản lý bùn đất, phế thải; lắp rào chắn công trường, đặt biển báo; quy trình cấp cứu người lao động khi gặp tai nạn",
            priority: "low",
        },
        // Giai đoạn thi công ống cấp nước
        {
            name: "Đào rãnh và lắp đặt ống cấp nước chính",
            description:
                "Thi công rãnh theo thiết kế, độ sâu đúng yêu cầu; lắp ống HDPE, kiểm tra mối nối hàn nhiệt; lấp đất, lu nền bảo vệ ống",
            priority: "low",
        },
        {
            name: "Thi công đường ống nhánh và đấu nối vào nhà dân",
            description:
                "Lắp đặt ống nhánh cấp nước, van khóa; đấu nối vào đồng hồ nước, hộ pát đấu; kiểm tra kín khít, thử áp lực",
            priority: "medium",
        },
        // Giai đoạn thi công ống thoát nước
        {
            name: "Đào rãnh và lắp đặt ống thoát nước thải",
            description:
                "Thi công rãnh theo độ dốc yêu cầu (1-2%); lắp ống PVC đường kính phù hợp; lắp hố ga, chân rãnh thu nước mặt",
            priority: "low",
        },
        {
            name: "Lắp đặt hệ thống xử lý nước thải",
            description:
                "Thiết lập bể điều hòa, bể lắng, bể xử lý hóa học: xây bể, đặt van, lắp hệ thống khuấy trộn; chạy thử quy trình xử lý",
            priority: "medium",
        },
        {
            name: "Lắp đặt trạm bơm và van khóa",
            description:
                "Lắp đặt trạm bơm áp lực cho mạng cấp nước; lắp van điều tiết, van một chiều, đồng hồ đo áp suất; kết nối điện cho trạm bơm",
            priority: "medium",
        },
        {
            name: "Hoàn thiện mặt bằng, lấp rãnh và tái lập mặt đáy",
            description:
                "Đầm chặt đất, lát lại mặt đường/công viên, hoàn trả vỉa hè; kiểm tra độ phẳng, tránh trũng ngập cục bộ",
            priority: "medium",
        },
        {
            name: "Kiểm tra áp lực, thử nước và xét nghiệm chất lượng",
            description:
                "Thử nghiệm áp lực hệ thống cấp: đạt 3-5 bar; kiểm tra rò rỉ; lấy mẫu xét nghiệm nước sau xử lý đạt tiêu chuẩn xả ra môi trường",
            priority: "medium",
        },
        {
            name: "Nghiệm thu, bàn giao và vận hành thử",
            description:
                "Chạy thử hệ thống cấp và thoát nước 24-48 giờ; kiểm tra hở, rò rỉ, lưu lượng; nghiệm thu PCCC trạm bơm; bàn giao cho chủ đầu tư",
            priority: "hight",
        },
        {
            name: "Hướng dẫn vận hành và bảo trì định kỳ",
            description:
                "Đào tạo nhân viên vận hành: chạy trạm bơm, thay màng lọc, kiểm tra van; lập lịch bảo trì hàng tháng, nhân viên kỹ thuật trực gác",
            priority: "hight",
        },
    ],

    // === CÔNG CỘNG ===
    // 8) Trường học
    truong_hoc: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát hiện trạng khu đất và hạ tầng cũ",
            description:
                "Đo đạc khuôn viên, kiểm tra độ an toàn của hạ tầng cũ: tường rào, điện, nước, cây xanh; đánh giá rủi ro sạt lở hoặc ngập úng",
            priority: "low",
        },
        {
            name: "Lập quy hoạch tổng thể và phối cảnh",
            description:
                "Thiết kế sơ bộ: vị trí các phòng học, phòng thí nghiệm, thư viện, nhà đa năng; dựng mô hình 3D phối cảnh cho toàn khuôn viên",
            priority: "low",
        },
        {
            name: "Lập dự toán chi phí và quyết toán ngân sách",
            description:
                "Tổng hợp chi phí bê tông, thép, gạch, trang thiết bị phòng học, máy tính, bàn ghế; dự phòng chi phí trang trí, sân chơi, vỉa hè",
            priority: "low",
        },
        {
            name: "Lập hồ sơ xin phép xây dựng & PCCC",
            description:
                "Hoàn thiện hồ sơ pháp lý, bản vẽ kỹ thuật; xin cấp phép xây dựng, xin giấy chứng nhận PCCC cho hạng mục trường học; xin giấy phép vệ sinh an toàn thực phẩm (nếu có căng tin)",
            priority: "low",
        },
        {
            name: "Lập kế hoạch quản lý an toàn lao động và phòng chống cháy nổ",
            description:
                "Xây dựng quy trình giám sát an toàn: trang bị bảo hộ, biển báo nguy hiểm; lập phương án thoát hiểm, lối chạy bộ tình huống khẩn cấp",
            priority: "low",
        },
        // Giai đoạn thi công phần thô
        {
            name: "Thi công móng và sàn tầng trệt",
            description:
                "Đổ móng bê tông mác cao cho phòng học, hành lang; lắp đặt ống luồn cáp điện ngầm dưới sàn; kiểm tra độ phẳng sàn sớm",
            priority: "low",
        },
        {
            name: "Kiểm tra ổn định móng và nền",
            description:
                "Thử tải móng, đo độ lún, kiểm tra độ ổn định nền; xử lý nền yếu bằng gia cố vữa xi măng",
            priority: "low",
        },
        {
            name: "Xây dựng khung, tường và kết cấu mái",
            description:
                "Xây tường gạch 200mm, trát vữa; thi công dầm, cột, đà kiềng; lót hệ khung mái thép, lợp mái ngói hoặc tôn lạnh",
            priority: "low",
        },
        // Giai đoạn lắp đặt hệ thống cơ điện
        {
            name: "Lắp đặt hệ thống điện, chiếu sáng, mạng LAN",
            description:
                "Đi dây âm tường, lắp tủ điện trung tâm, đèn LED tiết kiệm điện; chạy hệ thống mạng LAN cho phòng máy tính, phòng giảng dạy",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống điều hòa và thông gió",
            description:
                "Lắp điều hòa âm trần hoặc treo tường cho phòng học; lắp đặt quạt thông gió, ống gió khắp hành lang; đảm bảo thông khí tự nhiên",
            priority: "medium",
        },
        {
            name: "Hoàn thiện nội thất phòng học và hành lang",
            description:
                "Lắp bàn ghế, bảng viết, bảng tương tác điện tử, kệ tủ; sơn tường, ốp lát sàn; lắp trần thạch cao khi cần làm âm trần",
            priority: "medium",
        },
        {
            name: "Thiết lập thư viện và phòng thí nghiệm",
            description:
                "Trang bị kệ sách, bàn ghế; lắp đặt máy tính, máy chiếu; phòng thí nghiệm: lắp tủ hóa chất, quầy thí nghiệm, máy hút khí",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống camera giám sát và báo cháy",
            description:
                "Cài đặt camera CCTV tại hành lang, sân trường; lắp đầu báo khói kết nối về phòng trực; lắp bình chữa cháy di động và cố định",
            priority: "medium",
        },
        {
            name: "Thi công sân chơi, bồn cây và hệ thống thoát nước",
            description:
                "Lát sân bê tông nhám, kẻ vạch sân bóng; trồng cây bóng mát, cây kiểng; lắp ống thoát nước sân trường, hố ga thu nước",
            priority: "medium",
        },
        {
            name: "Kiểm tra an toàn, nghiệm thu và bàn giao",
            description:
                "Kiểm tra hệ thống PCCC, phòng chống ngập; thử điện, thử nước; nghiệm thu tổng thể từng hạng mục với Sở Xây dựng, PCCC; bàn giao cho trường",
            priority: "hight",
        },
        {
            name: "Hướng dẫn bảo trì định kỳ và vận hành cơ sở vật chất",
            description:
                "Đào tạo đội ngũ bảo trì: kiểm tra thang máy, thang bộ, bình chữa cháy; lập kế hoạch kiểm tra định kỳ 3 tháng, 6 tháng",
            priority: "hight",
        },
    ],

    // 9) Bệnh viện
    benh_vien: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát hạ tầng và điều kiện site",
            description:
                "Đánh giá hiện trạng hạ tầng điện, nước, khí y tế, hạ tầng cũ; kiểm tra luồng bệnh nhân và quy hoạch giao thông ngoài trời",
            priority: "low",
        },
        {
            name: "Lập quy hoạch tổng mặt bằng và phân khu chức năng",
            description:
                "Phân chia khu cấp cứu, khám bệnh, nội trú, ngoại trú, hành lang; xác định hướng xây, độ chênh cốt phù hợp đường rẽ",
            priority: "low",
        },
        {
            name: "Lập dự toán chi phí chuyên dụng y tế",
            description:
                "Tính toán chi phí bê tông mác cao, thép, gạch kháng khuẩn, sơn chống mốc, hệ thống lọc không khí; dự toán trang thiết bị y tế lớn (máy X-quang, MRI)",
            priority: "low",
        },
        {
            name: "Lập bản vẽ kiến trúc & hệ thống y tế",
            description:
                "Thiết kế bản vẽ phòng mổ, phòng cấp cứu, phòng ICU, phòng phẫu thuật; tích hợp hệ thống khí y tế: oxy, khí nén, hút chân không",
            priority: "low",
        },
        {
            name: "Xin giấy phép xây dựng & PCCC chuyên ngành y tế",
            description:
                "Hoàn thiện thủ tục xin phép xây dựng, trang bị hệ thống PCCC chuyên dụng; xin giấy phép vệ sinh môi trường y tế, cấp phép xử lý chất thải y tế",
            priority: "low",
        },
        {
            name: "Lập kế hoạch quản lý an toàn lao động và vô trùng",
            description:
                "Quy trình an toàn: khu vực cách ly, hướng dẫn bác sĩ, điều dưỡng; biện pháp chống nhiễm khuẩn: phòng áp lực âm, phòng vô trùng",
            priority: "low",
        },
        // Giai đoạn thi công phần móng
        {
            name: "Thi công móng chịu tải lớn",
            description:
                "Đổ móng cọc bê tông chịu tải: sử dụng bê tông mác cao, gia cố đáy hố móng; kiểm tra độ lún, độ ẩm nền; xử lý nền yếu bằng gia cố xi măng",
            priority: "low",
        },
        {
            name: "Kiểm tra độ chịu lực của móng",
            description:
                "Thử tải móng bằng thép hoặc bằng thiết bị chuyên dụng; đánh giá độ lún, độ ổn định; lập biên bản kiểm tra và xử lý khuyết tật trước khi thi công tiếp",
            priority: "low",
        },
        // Giai đoạn thi công khung và bao che
        {
            name: "Thi công khung bê tông cốt thép",
            description:
                "Xây dựng dầm, cột, sàn chịu lực cho phòng mổ, phòng hành lang; lắp đặt coffa, đổ bê tông, bảo dưỡng bê tông đúng quy định 28 ngày",
            priority: "low",
        },
        {
            name: "Lắp đặt hệ thống điện y tế và cấp thoát nước",
            description:
                "Thiết lập hệ thống điện riêng biệt cho phòng mổ, phòng cấp cứu; lắp đặt hệ thống cấp nước sạch, cấp nước vô trùng; hệ thống thoát nước chống tắc",
            priority: "medium",
        },
        {
            name: "Thi công chia phòng và vách ngăn vô trùng",
            description:
                "Xây tường gạch chắn ẩm, vách kính vô trùng cho phòng mổ; lắp cửa trượt tự động kèm hệ thống đệm không khí để giảm bụi",
            priority: "medium",
        },
        {
            name: "Lắp đặt thiết bị y tế, điều hòa, hút khí",
            description:
                "Lắp đặt máy gây mê, máy thở, bàn mổ; lắp điều hòa áp lực dương/âm chuyên dụng; lắp hệ thống hút khí và lọc HEPA cho phòng mổ",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống oxy và khí y tế",
            description:
                "Xây bể chứa oxy, đường ống trung tâm oxy, điều chỉnh áp suất; lắp đặt hệ thống chân không, máy nén khí y tế",
            priority: "medium",
        },
        {
            name: "Hoàn thiện nội thất và sơn tường",
            description:
                "Thiết kế, lắp đặt nội thất phòng mổ: sàn chống tĩnh điện, tường phủ sơn kháng khuẩn; lắp sàn vinyl cho hành lang, phòng bệnh",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống camera giám sát, báo cháy tự động",
            description:
                "Cài đặt camera ở hành lang, buồng bệnh; lắp đầu báo khói, báo gas độc, kết nối đến trung tâm điều khiển; lắp đặt đèn exit, đèn khẩn cấp",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống xử lý chất thải y tế",
            description:
                "Lắp đặt phòng khử trùng, lò đốt hoặc phối hợp với trạm xử lý chung; xây bồn chứa nước rỉ rác; ký hợp đồng vận chuyển chất thải y tế với đơn vị chuyên nghiệp",
            priority: "medium",
        },
        {
            name: "Nghiệm thu PCCC, kiểm định y tế và bàn giao",
            description:
                "Thử nghiệm hệ thống PCCC chuyên dụng: đám cháy giả lập; kiểm định thiết bị y tế: máy X-quang, MRI; nghiệm thu với Sở Y tế, PCCC và bàn giao",
            priority: "hight",
        },
        {
            name: "Đào tạo nhân viên vận hành thiết bị y tế và bảo trì",
            description:
                "Hướng dẫn sử dụng máy móc: máy thở, bơm tiêm điện; lập kế hoạch bảo trì định kỳ: thay lọc HEPA, kiểm tra áp suất oxy; đào tạo quy trình xử lý sự cố y tế",
            priority: "hight",
        },
        {
            name: "Theo dõi vận hành và tiếp nhận phản hồi sau đưa vào sử dụng",
            description:
                "Khảo sát sau 1 tháng, 6 tháng: đánh giá chất lượng phòng mổ, phòng bệnh; thu thập phản hồi từ bác sĩ, y tá về tiện ích và sửa chữa khắc phục nhanh",
            priority: "hight",
        },
    ],

    // 10) Trung tâm thương mại
    trung_tam_thuong_mai: [
        // Giai đoạn chuẩn bị
        {
            name: "Khảo sát hiện trạng khu đất và lưu lượng giao thông",
            description:
                "Đo đạc, phân tích lưu lượng khách hàng, lưu lượng xe; đánh giá hạ tầng xung quanh: bãi đậu xe, công viên, lối gió mùa",
            priority: "low",
        },
        {
            name: "Lập quy hoạch tổng thể mặt bằng & kiến trúc",
            description:
                "Thiết kế sơ bộ: phân chia khu vực shop, khu ẩm thực, khu vui chơi giải trí; dựng phối cảnh 3D tòa nhà, tường kính, mái che, quảng trường ngoài trời",
            priority: "low",
        },
        {
            name: "Lập dự toán chi phí và phân tích hiệu quả kinh tế",
            description:
                "Chi phí xây dựng: móng, khung bê tông, mặt dựng kính, nội thất; chi phí đầu tư trang thiết bị: thang cuốn, thang máy, hệ thống BMS; phân tích ROI, thời gian hoàn vốn",
            priority: "low",
        },
        {
            name: "Xin giấy phép xây dựng & PCCC thương mại",
            description:
                "Hoàn thiện thủ tục hành chính: xin phép xây dựng, giấy tiếp nhận đánh giá tác động môi trường, giấy phép PCCC cho khu dịch vụ ăn uống",
            priority: "low",
        },
        {
            name: "Lập kế hoạch quản lý dự án và giám sát chất lượng",
            description:
                "Xây dựng quy trình giám sát tiến độ: thi công móng, khung, hoàn thiện; xác định KPIs an toàn lao động, KPI chất lượng; lập quy trình báo cáo định kỳ",
            priority: "low",
        },
        // Giai đoạn thi công phần ngầm
        {
            name: "Thi công móng sâu và hầm đậu xe",
            description:
                "Đào móng, đổ bê tông hầm để xe nhiều tầng; xử lý chống thấm hầm: màng khò nóng, gia cố vữa polyme; lắp hệ thống thoát nước hầm, bơm thoát nước",
            priority: "low",
        },
        {
            name: "Kiểm tra chất lượng bê tông hầm và cọc",
            description:
                "Thử tải cọc khoan nhồi, cọc ép; kiểm tra chống thấm hầm: thử rò rỉ; đo độ lún hầm sau 7 ngày, 28 ngày để đảm bảo ổn định",
            priority: "low",
        },
        // Giai đoạn thi công khung bê tông
        {
            name: "Thi công khung kết cấu bê tông cốt thép",
            description:
                "Xây dựng cột, dầm, sàn chịu tải lớn; sử dụng khung giàn giáo an toàn; đổ bê tông mác cao cho trần; bảo dưỡng bê tông đúng quy trình",
            priority: "low",
        },
        {
            name: "Lắp kính mặt ngoài và ốp đá ngoại thất",
            description:
                "Hoàn thiện mặt dựng kính Low-E; ốp đá Granite, vỉ gỗ nhựa ngoài trời; kiểm tra độ kín khít, chống thấm khe nối, keo silicone chịu tia UV",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống điện, điều hòa và PCCC",
            description:
                "Lắp đặt trạm biến áp riêng biệt; lắp hệ thống lạnh trung tâm: AHU, FCU; lắp đường ống chiller; lắp đặt hệ thống chữa cháy: họng nước, đầu phun sprinkler, trung tâm điều khiển PCCC",
            priority: "medium",
        },
        {
            name: "Hoàn thiện nội thất khu thương mại & khu ẩm thực",
            description:
                "Lát sàn Granite, gỗ công nghiệp; sơn tường, thi công trần thạch cao; lắp thiết bị bếp, kệ chứa, bàn ghế; kiểm tra hệ thống hút mùi, ống dẫn khói bếp",
            priority: "medium",
        },
        {
            name: "Lắp đặt thang cuốn, thang máy, biển hiệu",
            description:
                "Lắp thang máy tiêu chuẩn chở hàng và khách; lắp thang cuốn hai chiều; gắn biển chỉ dẫn, biển quảng cáo, hệ thống đèn neon trang trí",
            priority: "medium",
        },
        {
            name: "Thiết lập hệ thống quản lý tòa nhà BMS (Building Management System)",
            description:
                "Cài đặt hệ thống giám sát điện, điều hòa, chiếu sáng tự động; tích hợp cảm biến nhiệt độ, ánh sáng, CO2; lập trình tự động điều chỉnh theo thời điểm",
            priority: "medium",
        },
        {
            name: "Lắp đặt hệ thống camera an ninh và kiểm soát ra vào",
            description:
                "Cài đặt camera CCTV tại cửa chính, hành lang, bãi xe; lắp đặt barie tự động, đầu đọc thẻ, vòng từ kiểm soát ra vào; kết nối với trung tâm an ninh",
            priority: "medium",
        },
        {
            name: "Thi công khu vui chơi trẻ em và phòng chiếu phim nhỏ",
            description:
                "Thiết kế khu vui chơi: lắp đặt thiết bị vui chơi, sàn cao su chống trượt; xây phòng chiếu phim nhỏ: ghế, màn chiếu, hệ thống âm thanh cinema",
            priority: "medium",
        },
        {
            name: "Kiểm tra an toàn, nghiệm thu và khai trương",
            description:
                "Thử nghiệm hệ thống điều hòa, PCCC, chiếu sáng; nghiệm thu chất lượng kết cấu, kiểm định phòng chống cháy; bàn giao và tổ chức lễ khai trương",
            priority: "hight",
        },
        {
            name: "Duy trì vận hành thử giai đoạn đầu",
            description:
                "Theo dõi và khắc phục sự cố ban đầu: điều hòa, thang cuốn, thang máy; bảo trì thiết bị, dọn dẹp khu vực; đánh giá mức độ hài lòng của khách thuê",
            priority: "hight",
        },
        {
            name: "Theo dõi bảo hành và mở rộng dịch vụ",
            description:
                "Khảo sát sau 1 tháng, 3 tháng: thu thập phản hồi từ khách hàng, điều chỉnh điều hòa, chiếu sáng; triển khai dịch vụ mới: cho thuê gian hàng pop-up, tổ chức sự kiện nhỏ",
            priority: "hight",
        },
    ],
};




export default messages;