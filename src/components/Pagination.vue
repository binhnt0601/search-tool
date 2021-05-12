<template>
  <ul class="wrap-content-pagination">
    <li
      class="item"
      :class="{ 'disable': active === 1 }"
      @click="changePage(1)"
    >
      <a>First</a>
    </li>
    <li class="item" v-if="active !== 1" @click="morePage('prev')"><a>Prev</a></li>
    <li class="item" v-for="(page, index) in perPages" :key="index">
      <a @click="changePage(page)" :class="{ 'active': active == page }">
        <span>{{ page }}</span>
      </a>
    </li>
    <li class="item" v-if="active < total" @click="morePage('next')"><a>Next</a></li>
    <li
      class="item"
      :class="{ 'disable': active > total - 1 }"
      @click="changePage(total)"
    >
      <a>Last</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
    perPages: {
      type: Array,
      default: () => [],
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
      if(value === this.active) {
        return;
      }
      this.$emit("updatePage", value);
    },
    morePage(status) {
      switch(status) {
        case 'next': 
          this.$emit("updatePage", this.active + 1);
          break;
        default:
          this.$emit("updatePage", this.active - 1);
          break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';

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
  @media (max-width: $breakpoint-ipad) {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .item {
    min-width: 30px;
    display: flex;
    margin: 0 2px;
    cursor: pointer;
    @media (max-width: $breakpoint-ipad) {
      margin-bottom: 10px;
    }
    a {
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      padding: 5px 10px;
      border-radius: 4px;
      background: #cfcfcf;
      color: #3c3c3c;
    }
    .active {
      font-weight: 500;
      color: #fff;
      background: #185ae9;
    }
  }
  .disable {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
