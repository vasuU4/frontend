var environment = {
    Development: {
      API_URL: "http://localhost:8080/store",
      BASE_URL: "http://localhost:9000",
    },
    //tomcat production
    // Production: {
    //   API_URL: "http://localhost:8080/store",
    //   BASE_URL: "http://localhost:8080/stores",
    // },

    //apache production

    Production: {
      API_URL: "http://localhost:8080/store",
      BASE_URL: "http://localhost/stores",
    },


  };
  
  //productio ->
  var env = process.env.VUE_APP_ENVIRONMENT || "Production";

  //local ->
  //var env = process.env.VUE_APP_ENVIRONMENT || "Development";
  
  export default environment[env];
  