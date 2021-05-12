<template>
  <div class="products-component">
    <div class="select-category">
      <select id="categories" v-model="selected" >
        <option v-for="(item, index) in filterCategories" :value="item" :key="index">{{item}}</option>
      </select>
    </div>
    <div class="wrap-search">
      <Search @search="searchData" :isFocus.sync="isFocus" ref="search" />
      <div class="wrap-search-result" v-if="search && isFocus">
        <ul v-if="searchResult.length > 0">
          <li v-for="(item, index) in searchResult" :key="index">
            <a>{{ item.name }}</a>
          </li>
        </ul>
        <div v-else class="nodata">
          <p>Not found ...</p>
        </div>
      </div>
      <button class="reset" @click="resetForm">Reset</button>
    </div>

    <div v-if="!isLoading && listData.length > 0">
      <ListProducts :listData="listData" />
      <Pagination
        :total="pages.length"
        :active="activePage"
        :limit="limitPages"
        :perPages="pageOfItems"
        @updatePage="renderPagination"
      />
    </div>
    <Loading v-else :isLoading="isLoading" :data="listData" />
  </div>
</template>

<script>
import endpoints from "@/constants/endpoints";
import Loading from "@/components/Loading";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import ListProducts from "@/components/products/ListProducts";
import _ from "lodash";

export default {
  data() {
    return {
      search: "",
      searchResult: [],
      categories: [],
      listData: [],
      dataDefault: [],
      pageOfItems: [],
      activePage: 1,
      limitPages: 5,
      limit: 9,
      total: 0,
      isLoading: false,
      isShow: false,
      itemDetails: [],
      isFocus: false,
      selected: ""
    };
  },
  components: {
    Search,
    Pagination,
    Loading,
    ListProducts,
  },
  computed: {
    offset() {
      return (this.activePage - 1) * this.limit;
    },
    pages() {
      const number = Math.ceil((this.selected ? this.listData.length : this.total) / this.limit);
      let res = [];
      for (var i = 1; i <= number; i++) {
        res.push(i);
      }
      return res;
    },
    filterCategories() {
      var check = new Set();
      return this.categories.filter(obj => !check.has(obj) && check.add(obj)).sort();
    }
  },

  watch: {
    selected: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          const newList = _.cloneDeep(this.dataDefault);
          this.listData = newList.filter(el => el.brand === newVal);
          this.renderPagination();
        }
      }
    }
  },

  async mounted() {
    await this.initData();
  },
  methods: {
    async initData() {
      try {
        this.isLoading = true;
        const { data } = await this.$api.get(endpoints.getProducts);
        if (data && data.length > 0) {
          this.dataDefault = data;
          for(let i in data) {
            this.categories.push(data[i].brand);
          }
          this.total = data.length;
          this.isLoading = false;
          this.renderPagination();
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    
    searchData(value) {
      // let newArrList = [];
      this.search = value;
      const newList = _.cloneDeep(this.listData);
      // const arrValue = value.toLowerCase().split(' ');
      const result = newList.filter((e) => {
        // const arrList = e.name.toLowerCase().split(' ');
        // for(let i in arrValue) {
        //   if(arrList.includes(arrValue[i])) {
        //     newArrList.push(e.name);
        //   }
        // }
        // console.log(newArrList)

        const txtList = e.name.toLowerCase();
        const searchIndex = txtList.indexOf(value.toLowerCase());
        if (searchIndex != -1) {
          return txtList;
        }
      })
      if (value.length > 0) {
        return this.searchResult = result;
      }
    },

    resetForm() {
      this.selected = "";
      this.$refs.search.resetData();
      this.renderPagination();
    },

    renderActivePage(arrList) {
      this.isLoading = true;
      setTimeout(() => {
        const activeList = arrList.slice(this.offset, this.offset + this.limit);
        if (activeList.length > 0) {
          this.listData = activeList;
          this.isLoading = false;
        }
      }, 300);
    },
    renderPagination(numOfIndex) {
      const defaultData = _.cloneDeep(this.selected ? this.listData : this.dataDefault);
      const pages = _.cloneDeep(this.pages);
      const page_size = pages.length;
      let newArr = [];
      if (numOfIndex) this.activePage = numOfIndex;
      if (this.activePage >= this.limitPages) {
        if (this.activePage == page_size) {
          newArr = pages.filter(
            (e) => e > this.activePage - this.limitPages && e <= this.activePage
          );
        } else {
          newArr = pages.splice(
            this.activePage - (this.limitPages - 1),
            this.limitPages
          );
        }
      } else {
        if (page_size >= this.limitPages) {
          newArr = pages.filter((e) => e > 0 && e <= this.limitPages);
        } else {
          newArr = pages;
        }
      }
      this.pageOfItems = newArr;
      this.renderActivePage(defaultData);
    },
  },
};
</script>

<style lang="scss" scoped>
.products-component {
  max-width: 900px;
  margin: auto;
  .select-category {
    select {
      margin-top: 24px;
      width: 100%;
      height: 35px;
      padding: 0 15px;
      border: 1px solid #98c7dc;
      border-radius: 4px;
      outline: none;
    }
  }
  .wrap-search {
    position: relative;
    display: flex;
    max-width: 50%;
    margin: 24px auto;
    .reset {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background: #98c7dc;
      font-size: 14px;
      font-weight: 400;
      outline: none;
      cursor: pointer;
    }
    &-result {
      position: absolute;
      width: 100%;
      max-height: 300px;
      top: 100%;
      background: #fff;
      left: 0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow-y: scroll;
      padding: 0;
      margin: 0;
      box-shadow: 0 5px 10px #79797979;
      box-sizing: border-box;
      z-index: 99;
      ul {
        padding: 0;
        list-style: none;
        li {
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 300;
          line-height: 18px;
          cursor: pointer;
          border-bottom: 1px solid #dadada;
          &:hover {
            background: #3f98e0;
            color: #e9e9e9;
          }
          a {
            text-decoration: none;
          }
        }
      }
      .nodata {
        p {
          padding: 15px;
          margin: 0;
          font-size: 14px;
          font-weight: 300;
          color: #000;
        }
      }
    }
  }
}
</style>
