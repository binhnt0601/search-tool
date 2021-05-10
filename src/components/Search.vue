<template>
    <div class="search-component">
        <input :value="name" @input="search" />
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    props: {
        name: {
            type: String,
            default: ""
        }
    },
  data() {
    return {};
  },
  components: {},
  computed: {},
  async mounted() {},
  methods: {
    search: _.debounce(function (e) {
        this.$emit('update:name', e.target.value);
    }, 1000),
  }
};
</script>

<style lang="scss" scoped>
.search-component {
    text-align: center;
}
</style>
