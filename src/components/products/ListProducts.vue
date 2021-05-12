<template>
  <div class="list-products-component">
    <ul class="wrap-data">
      <li
        class="wrap-data-item"
        v-for="(item, index) in listData"
        :key="index"
        @click="openModalDetails(item)"
      >
        <div class="img">
          <img
            :src="idError === index ? filename : item.imageUrl"
            alt="product"
            @error="errorHandler(index, item.imageUrl)"
          />
        </div>
        <div class="item-description">
          <p class="name">{{ item.name }}</p>
          <p class="name">Brand: {{ item.brand }}</p>
          <p class="price">
            <span>{{ item.price | currency }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemDetails: {},
      imgError: false,
      idError: -1,
      imgUrl: "",
    };
  },
  components: {},
  computed: {
    filename() {
      return this.imgError ? require("@/assets/logo.png") : this.imgUrl;
    },
  },
  watch: {
    listData: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.resetData();
        }
      },
    },
  },
  async mounted() {},
  methods: {
    errorHandler(id, item) {
      this.idError = id;
      this.imgError = true;
      this.imgUrl = item;
    },
    resetData() {
      this.imgError = false;
      this.idError = -1;
      this.imgUrl = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';
.list-products-component {
  .wrap-data {
    display: flex;
    flex: 0 0 100%;
    max-width: 100%;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    &-item {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin: 0 calc(10% / 6) 20px;
      border: none;
      border-radius: 4px;
      box-shadow: 0 0 5px #3333331e;
      transition: 0.3s ease;
      cursor: pointer;
      @media (max-width: $breakpoint-ipad) {
        width: 100%;
        margin: 0 0 25px 0;
      }
      &:hover {
        box-shadow: 0 0 5px #33333387;
        .img {
          img {
            height: 150px;
            transform: scale(1.05);
          }
        }
      }
      .img {
        width: 100%;
        height: 150px !important;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: 0.3s ease;
        }
      }
      .item-description {
        padding: 15px;
        background: #b2cfcd1c;
        height: calc(100% - 150px);
        .name {
          font-size: 14px;
          font-weight: 300;
          min-height: 35px;
          text-overflow: ellipsis;
          margin: 0 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .price {
          margin: 0;
          span {
            font-size: 14px;
            font-weight: 500;
            color: #1435c3;
          }
        }
      }
    }
  }
}
</style>
