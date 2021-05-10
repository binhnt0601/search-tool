<template>
    <div class="products-component">
        <Search :name.sync="value" />
        <span>{{value}}</span>
        <ListProducts :listData="listData" />
        <Pagination 
            v-if="pages.length > 1"
            :total='pages.length'
            :active='activePage'
            :limit='limitPages'
            :perPages="pageOfItems"
            @updatePage="renderPagination"
        />
    </div>
</template>

<script>
import endpoints from "@/constants/endpoints";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import ListProducts from "@/components/products/ListProducts";
import _ from 'lodash';

export default {
  data() {
    return {
        value: "",
        listData: [],
        dataDefault: [],
        pageOfItems: [],
        activePage: 1,
        limitPages: 5,
        limit: 12,
        total: 0,
    };
  },
  components: {
      Search,
      Pagination,
      ListProducts
  },
  computed: {
    offset() {
      return (this.activePage - 1) * this.limit;
    },
    pages() {
      const number = Math.ceil(this.total / this.limit);
      let res = [];
      for (var i = 1; i <= number; i++) {
        res.push(i);
      }
      return res;
    },
  },
  async mounted() {
    await this.initData();
    this.renderPagination();
  },
  methods: {
    async initData() {
        try {
            const { data } = await this.$api.get(endpoints.getProducts);
            if (data && data.length > 0) {
                this.dataDefault = data;
                this.total = data.length;
            }
        } catch (error) {
            console.log(error)
        }
    },
    renderActivePage(arrList) {
        const activeList = arrList.slice( this.offset, this.offset + this.limit );
        if (activeList.length > 0) {
            this.listData = activeList;
        }
    },
    renderPagination(numOfIndex, searchData) {
      const defaultData = _.cloneDeep(this.dataDefault);
      const pages =  _.cloneDeep(this.pages);
      const page_size = pages.length;
      let newArr = [];
      if (numOfIndex) this.activePage = numOfIndex;
      if (this.activePage >= this.limitPages) {
        if (this.activePage == page_size) {
          newArr = pages.filter((e) => e > (this.activePage - this.limitPages) && e <= this.activePage);
        } else {
          newArr = pages.splice(this.activePage - (this.limitPages - 1), this.limitPages);
        }
      } else {
        if(page_size >= this.limitPages){
          newArr = pages.filter((e) => e > 0 && e <= this.limitPages);
        }else {
          newArr = pages;
        }
      }
      this.pageOfItems = newArr;
      if (searchData) {
        this.renderActivePage(searchData);
      } else {
        this.renderActivePage(defaultData);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.products-component {
    max-width: 900px;
    margin: auto;
}
</style>
