import config from '../config';

const UserService = {
  saveUserId(userId) {
    window.sessionStorage.setItem(config.USER_ID, userId);
  },
  getUserId() {
    return window.sessionStorage.getItem(config.USER_ID);
  },
  clearUserId() {
    window.sessionStorage.removeItem(config.USER_ID);
  },
  hasUserId() {
    return !!UserService.getUserId();
  }
};

export default UserService;