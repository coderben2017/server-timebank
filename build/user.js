"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, name, trueName, creditValue, domicile, phoneNumber, idCard) {
        this.id = id;
        this.name = name;
        this.trueName = trueName;
        this.creditValue = creditValue;
        this.domicile = domicile;
        this.phoneNumber = phoneNumber;
        this.idCard = idCard;
    }
    return User;
}());
exports.User = User;
function getUser() {
    return [
        new User(1, 'CoderBen', '金奔', 193, '山大学15宿舍楼', 13567898765, null),
        new User(2, '小明', '王明', 68, '高区金沙滩小区', 13974892734, null)
    ];
}
exports.getUser = getUser;
//# sourceMappingURL=user.js.map