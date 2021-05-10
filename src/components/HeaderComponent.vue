<template>
    <div class="header-component">
        <div class="header">
            <img src="@/assets/logo.png" alt="Logo" class="header-img">
            <span class="header-title">Matthew Computers</span>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  async mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.header-component {
    border-bottom: 1px solid black;
    padding-bottom: 32px;
    .header {
        border-bottom: 1px solid black;
        padding-bottom: 12px;
        &-img {
            width: 64px;
            height: 64px;
            margin-right: 16px;
        }
        &-title {
            font-size: 64px;
        }
    }
}
</style>
