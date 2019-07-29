<template>
    <div class="container">
      <legend>this is performace </legend>
    </div>

</template>

<script>
export default {
    name: 'index',
    mixins: [],
    directives: {
    },
    data() {
        return {

        };
    },
    computed: {

    },

    methods: {
      async getMockData () {
        const url = "/performace/testApi";
        const result = await this.$ajax.get(url);
        console.log('getMockData', result);
      }

    },

    mounted() {
      this.getMockData();
    },
    components: {
    }
};
</script>

<style lang="less">
.page {
  padding: 10px;
  margin: 10px;
}
</style>
