<template>
  <div id="products-page">
      <HeaderComponent />
      <ProductsComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import ProductsComponent from '@/components/ProductsComponent';

export default {
  data() {
    return {};
  },
  components: {
    HeaderComponent,
    ProductsComponent
  },
  computed: {},
  async mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#products-page {
    padding: 16px;
}
</style>
