import $ from "jquery";
import _ from "lodash";
import loginService from "@/services/loginService";

export default {
  setSession(session) {
    localStorage.removeItem("session");
    localStorage.setItem("session", JSON.stringify(session));
  },
  getSession() {
    var sessionStr = localStorage.getItem("session");
    if (!sessionStr) {
      this.logout();
    }
    return JSON.parse(sessionStr);
  },
  logout() {
    this.removeSession();
    window.dispatchEvent(new CustomEvent("unauthorized-token"));
  },
  removeSession() {
    localStorage.removeItem("session");
  },
  validateSession() {
    var session = this.getSession();
    var promise = $.Deferred();
    var hasSession = true;
    let that = this;
    if (hasSession) {
      loginService
        .validateUserSession(this.getToken())
        .done((data) => {
          data.token = session.token;
          that.setSession(data);
          promise.resolve();
        })
        .fail((error) => {
          that.removeSession();
          promise.reject();
        });
    } else {
      promise.reject();
    }
    return promise;
  },

  getToken() {
    var session = this.getSession();
    return session ? session.token : null;
  },
};
