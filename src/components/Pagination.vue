<template>
  <ul class="wrap-content-pagination">
    <li
      class="item"
      :class="{ disable: active < limit }"
      @click="changePage(1)"
    >
      <a>First</a>
    </li>
    <li class="item" v-if="active >= limit"><a>...</a></li>
    <li class="item" v-for="(page, index) in perPages" :key="index">
      <a
        @click="changePage(page)"
        :class="{ 'item-active': active == page }"
      >
        <span>{{ page }}</span>
      </a>
    </li>
    <li class="item" v-if="active < total - 1"><a>...</a></li>
    <li
      class="item"
      :class="{ disable: active > total - 1 }"
      @click="changePage(total)"
    >
      <a>Last</a>
    </li>
  </ul>
</template>

<script>
// import _ from "lodash";

export default {
  props: {
    total: {
        type: Number,
        default: 0
    },
    active: {
        type: Number,
        default: 0
    },
    limit: {
        type: Number,
        default: 0
    },
    perPages: {
        type: Array,
        default: () => []
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  async mounted() {},
  methods: {
    changePage(value) {
        this.$emit('updatePage', value);
    }
  },
};
</script>

<style lang="scss" scoped>
.wrap-content-pagination {
  padding: 0;
  list-style: none;
  display: flex;
  flex: 0 0 50%;
  max-width: 50%;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  text-align: center;
//   @media (max-width: $r-ipad) {
//     flex: 0 0 100%;
//     max-width: 100%;
//   }
  .item {
    min-width: 30px;
    display: flex;
    margin: 0 2px;
    cursor: pointer;
    &-active {
    font-weight: 500;
    color: #fff;
    background: #185ae9;
    }
    // @media (max-width: $r-ipad) {
    //   margin-bottom: 10px;
    // }
    a {
    //   font-family: $f-o-light;
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      padding: 5px 10px;
      border-radius: 4px;
      background: #cfcfcf;
      color: #3c3c3c;
    }
  }
}
</style>
