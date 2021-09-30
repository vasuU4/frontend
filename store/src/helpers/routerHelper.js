import constants from "@/constants";

export default {
    
  openUrl(url) {
    window.location.href = url;
  },
  getUrlParams(key = null) {
    var params = {};
    window.location.search.replace("?", "").split("&").forEach((param) => {
      var values = param.split("=");
      params[values[0]] = values[1];
    });
    if (key === null) {
      return params
    } else {
      return params[key] || ""
    }
  },
  openWindow(url){
  	window.open(url, '_blank');
  }
}
