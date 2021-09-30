import $ from "jquery";
import _ from "lodash";

import constants from "../constants";
import sessionHelper from "../helpers/sessionHelper";

export default {
  ajax(url, payload, additional_options) {
    var data = {
      token : sessionHelper.getToken(),
    }
    if (payload) {
      /*
          Here we change all the date objects into long.
          To prevent the changes reflect to actual object we clone the object
      */
      payload = _.clone(payload);
      if (typeof(payload) != "undefined") {
        data.payload = JSON.stringify(payload);
      }
    } else {
      data.payload = JSON.stringify({});
    }

    if (!url.startsWith("/")) {
      url = "/" + url;
    }
    var options = {
      url: constants.SERVICE_URL + url,
      method: "GET",
      data: data,
      dataType: "json"
    }
    options = _.extend(options, additional_options)
    var promise = $.Deferred()
    $.ajax(options).then(function(data) {
      if (data.status == "yes") {
        promise.resolve(data);
      } else if (data.status == "no") {
        if (data.message && data.message.length > 0) {
          promise.reject();
        }
      }else {
        promise.resolve(data);
      }
    }).fail(function(error) {
      if(error.status == 401){
        window.dispatchEvent(new CustomEvent("unauthorized-token"));
      }
      promise.reject(error);
    });
    return promise

  },


  ajaxPost(url, data, additional_options) {
    if (typeof additional_options !== "object") {
      additional_options = {};
    }
    additional_options["method"] = "POST";
    return this.ajax(url, data, additional_options);
  }

}
