<template>
  <div class="search-component">
    <label for="search-name" :class="{ focus: name != '' || isFocus }"
      >Search Here !</label
    >
    <input
      id="search-name"
      v-model="name"
      @input="search"
      autocomplete="off"
      @focus="$emit('update:isFocus', true)"
      @blur="$emit('update:isFocus', false)"
    />
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    isFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
    };
  },
  components: {},
  computed: {},
  async mounted() {},
  methods: {
    search: _.debounce(function (e) {
      this.$emit("search", e.target.value);
    }, 500),
    resetData() {
      this.name = "";
    }
  },
};
</script>

<style lang="scss" scoped>
.search-component {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-right: 10px;
  input {
    width: 100%;
    height: 35px;
    padding: 0 15px;
    border: 1px solid #98c7dc;
    border-radius: 4px;
    outline: none;
  }
  label {
    position: absolute;
    font-size: 14px;
    color: #333;
    font-weight: 300;
    line-height: 24px;
    top: 6px;
    left: 10px;
    transition: 0.5s ease;
    &.focus {
      top: -12px;
      background: #fff;
    }
  }
}
</style>
