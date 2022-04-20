"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserHelper {
    static USER_ROLE_GUEST = "public";
    static getGuestUser() {
        return {
            role: UserHelper.USER_ROLE_GUEST,
            id: null,
            email: null,
            title: null,
            first_name: "Guest",
            last_name: "Guest"
        };
    }
    static isGuest(user) {
        return !user?.role || user?.role === UserHelper.USER_ROLE_GUEST; //if no role found or role is "public" a user is a guest
    }
}
exports.default = UserHelper;
