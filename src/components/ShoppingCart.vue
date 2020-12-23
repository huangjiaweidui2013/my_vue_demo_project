<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li
        v-for="product in products"
        :key="product.id">
        {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
const digitsRE = /(\d{3})(?=\d)/g
export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
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
  methods: {
    checkout (products) {
      debugger;
      this.$store.dispatch('cart/checkout', products)
    }
  }
}
</script>
