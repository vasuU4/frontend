import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import mappings from "@/mappings";
import constants from "@/constants";
import SuccessPage from "@/components/SuccessPage";

export default new Router({
  routes: [{
    path: constants.BASE_URL + mappings.STORE,
    name: 'Success Page',
    component: SuccessPage
  }]
});
