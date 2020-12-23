<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price | currency }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const digitsRE = /(\d{3})(?=\d)/g

export default {
  computed: mapState({
    products: state => state.products.all
  }),
  filters:{
    currency: function (value, currency, decimals) {
      value = parseFloat(value)
      if (!isFinite(value) || (!value && value !== 0)) return ''
      currency = currency != null ? currency : '$'
      decimals = decimals != null ? decimals : 2
      var stringified = Math.abs(value).toFixed(decimals)
      var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
      var i = _int.length % 3
      var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
      var _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
      var sign = value < 0 ? '-' : ''
      return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
    }
  },
  methods: mapActions('cart', [
    'addProductToCart'
  ]),
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>
