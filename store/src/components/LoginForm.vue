<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height:100vh"
    >
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <form
              @keyup="clearErrors"
              @submit.prevent="loginUser"
              autocomplete="off"
            >
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  v-model="userLogin.username"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  v-model="userLogin.password"
                />
              </div>
              <button type="submit" class="btn btn-primary">login</button>

              <span v-if="checkLogin">{{ output }}</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mappings from "@/mappings";
import constants from "@/constants";
import sessionHelper from "@/helpers/sessionHelper";
import loginService from "@/services/loginService";
export default {
  data() {
    return {
      userLogin: {
        username: null,
        password: null,
      },
      checkLogin: false,
      output: null,
    };
  },
  mounted() {},
  methods: {
    loginUser() {
      let that = this;
      loginService
        .loginUser(this.userLogin)
        .done((data) => {
          if (data.token.length > 0) {
            that.output = null;
            that.checkLogin = false;
            sessionHelper.setSession(data);
            //production ->
            window.location.href = constants.BASE_URL + mappings.STORE;
            //local ->
            //window.location.href = mappings.STORE;
          } else {
            that.output = data.status;
            that.checkLogin = true;
          }
        })
        .fail((error) => {
          console.log("failed");
        });
    },
    clearErrors: function() {
      let that = this;
      that.output = null;
    },
  },
};
</script>
