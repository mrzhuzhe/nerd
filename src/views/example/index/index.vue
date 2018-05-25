<template>
    <div class="page">
      <h1>I am Index Page</h1>

    </div>

</template>

<script>
console.log("index loaded")
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

    },
    mounted() {
      console.log(1)
    },
    components: {
    }
};
</script>

<style lang="less">
.page {
  padding: 10px;
}
</style>
