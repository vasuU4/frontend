import api from "./api";
import apiRouter from "@/apiRouter";

export default {
  loginUser(userLogin) {
    var url = apiRouter.LOGIN_USER;
    return api.ajaxPost(url, userLogin);
  },
  validateUserSession(token) {
    var url = apiRouter.VALIDATE_USER_TOKEN;
    return api.ajaxPost(url, { token: token});
  },
};
