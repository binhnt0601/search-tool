
<template>
    <div v-if="isLoading && data" class="loading">
        <div class="loader"></div>
    </div>
    <div v-else class="not-found">
       <p>No data ...</p>
    </div>
</template>

<script>

export default {
    props: {
        isLoading: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: () => []
        }
    },
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
.loading {
	text-align: center;
	font-size: 16px;
	.loader {
		border: 0.2em solid transparent;
		border-radius: 50%;
		border-top: 0.2em solid #bbbbbb;
		width: 2em;
		height: 2em;
		margin: 10% auto;
		-webkit-animation: spin 0.5s linear infinite; /* Safari */
		animation: spin 0.5s linear infinite;
	}

	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
}
.not-found {
    margin-top: 64px;
    p {
        text-align: center;
        padding: 15px;
        margin: 0;
        font-size: 32px;
        font-weight: 300;
        color: #797979;
    }
}
</style>