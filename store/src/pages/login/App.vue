<template>
  <div v-if="pathResolved">
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
import constants from "@/constants";
import mappings from "@/mappings";
import sessionHelper from "@/helpers/sessionHelper";
import routerHelper from "@/helpers/routerHelper";

export default {
  data() {
    return {
      pathResolved: false,
    };
  },
  mounted() {
    this.resolvePath();
  },
  methods: {
    resolvePath: function() {
      let that = this;
      sessionHelper.validateSession().done(() => {
           window.location.href = constants.BASE_URL + mappings.STORE;
           //window.location.href = mappings.STORE +"#"+routerHelper.getUrlParams("came_from");
        })
        .fail(() => {
          that.pathResolved = true;
        });
    },
  },
};
</script>
