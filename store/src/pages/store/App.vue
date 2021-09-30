<template>
  <div v-if="isPathResolved" id="app">
     <success-page :storeName="storeName"></success-page>
  </div>
</template>
<script type="text/javascript">
import constants from "@/constants";
import mappings from "@/mappings";
import sessionHelper from "@/helpers/sessionHelper";
import routerHelper from "@/helpers/routerHelper";
import SuccessPage from "@/components/SuccessPage";
export default {
  components : {
    SuccessPage,
  },
  data() {
    return {
      isPathResolved: false,
      storeName : sessionHelper.getSession().store.name,
    };
  },
  created: function() {
    this.resolvePath();
  },
  mounted: function() {

  },
  methods: {
     resolvePath() {
            let that = this;
            sessionHelper.validateSession().done(() => {
                   that.isPathResolved = true;
            }).fail(() => {
                var url = constants.BASE_URL + mappings.LOGIN_URL;
                window.location.href = url;
               // var url = url + "?came_from=" + that.$route.path
                //routerHelper.openUrl(url);
            });
        }

  },
};
</script>
