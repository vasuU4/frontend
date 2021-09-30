<template>
    <div id="app">
        {{storeName}}
     </div>
  
</template>
<script>
export default {
  props : {
     storeName : {
       type : String,
       default : null
     }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
