<template>
    <div class="checkout-component">
        <b-container>
            <b-row>
                <b-col xs="12" md="6">
                    <b-card class="payment-info mx-auto">
                        <h3>Payment info</h3>
                        <b-form @submit.stop.prevent="handleShop">
                            <b-card-body>
                                <b-form-group
                                    id="input-group-1"
                                    label="Email:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                        id="input-1"
                                        placeholder="Enter Email"
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-2"
                                    label="Full Name:"
                                    label-for="input-2"
                                >
                                    <b-form-input
                                        id="input-2"
                                        placeholder="Enter Name"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-3"
                                    label="Address:"
                                    label-for="input-3"
                                >
                                    <b-form-input
                                        class="mb-2"
                                        id="input-3"
                                        placeholder="Street"
                                        required
                                    ></b-form-input>
                                    <b-form-input
                                        class="mb-2"
                                        placeholder="Zip Code"
                                        required
                                    ></b-form-input>
                                    <b-form-input
                                        placeholder="City"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    class="mt-4"
                                    id="input-group-4"
                                    label="Card Details"
                                    label-for="input-4"
                                >
                                    <b-form-input
                                        class="mb-2"
                                        id="input-4"
                                        placeholder="Name on card"
                                        required
                                    ></b-form-input>
                                    <b-input-group id="input-5" class="mt-2">
                                        <b-form-input
                                            id="input-5"
                                            required
                                            placeholder="Card number"
                                        ></b-form-input>
                                        <b-input-group-prepend is-text>
                                            <b-icon icon="credit-card"></b-icon>
                                        </b-input-group-prepend>
                                    </b-input-group>
                                </b-form-group>

                                <b-row>
                                    <b-col md="8">
                                        <b-form-group
                                            class="mt-2"
                                            id="input-group-6"
                                            label="Expiry date"
                                        >
                                            <b-input-group class="mt-2">
                                                <b-form-select
                                                    required
                                                    :options="month"
                                                ></b-form-select>
                                                <b-form-select
                                                    required
                                                    :options="year"
                                                ></b-form-select>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="4" xs="6">
                                        <b-form-group
                                            class="mt-2"
                                            id="input-group-7"
                                            label="CVV"
                                        >
                                            <b-input-group class="mt-2">
                                                <b-form-input
                                                    required
                                                ></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-button variant="success" type="submit"
                                    >Pay Now</b-button
                                >
                            </b-card-body>
                        </b-form>
                    </b-card>
                </b-col>
                <!-- Cart to the right -->
                <b-col xs="12" md="4">
                    <b-card>
                        <h3>My cart</h3>
                        <!-- Card component for every item in the cart -->
                        <div
                            v-for="(product, id) in $store.state.cart"
                            :key="id"
                        >
                            <b-card
                                :img-src="
                                    require('../../assets/' + product.img)
                                "
                                img-alt="Card image"
                                img-left
                                class="mb-3"
                            >
                                <b-card-text class="product-type">
                                    {{ product.productType }} x
                                    {{ product.counter }}
                                </b-card-text>

                                <b-card-text class="product-price">
                                    {{ product.price }}kr
                                </b-card-text>
                            </b-card>
                        </div>
                        <div
                            class="mb-3 bg-secondary text-light font-weight-bolder"
                        >
                            Total: {{ totalAmount }}kr
                        </div>
                        <div class="btn-group">
                            <b-button variant="default" to="/">
                                <b-icon icon="arrow-left"></b-icon> Continue
                                Shopping</b-button
                            >
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-modal
            id="thanks"
            ok-only
            @ok="backToStore"
            ok-title="Back to the store"
            >Thank you for your order, {{ currentUser.username }}!</b-modal
        >
    </div>
</template>

<script>
    export default {
        name: 'CheckoutComp',
        computed: {
            cart() {
                return this.$store.state.cart
            },
            totalAmount() {
                if (this.$store.state.cart.length > 0) {
                    return this.$store.state.cart
                        .map(product => product.price * product.counter)
                        .reduce((total, amount) => total + amount)
                } else {
                    return 0
                }
            }
        },
        created() {
            for (let i = 0; i < this.$store.state.users.length; i++) {
                if (this.username === this.$store.state.users[i].username) {
                    this.currentUser = this.$store.state.users[i]
                }
            }
            console.log(this.myCart)
        },
        methods: {
            handleShop() {
                this.$bvModal.show('thanks')
                this.$store.commit('addOrder', {
                    id: this.currentUser.id,
                    order: this.myCart,
                    price: this.totalAmount
                })
                this.$store.commit('emptyCart', [])
            },
            backToStore() {
                this.$router.push('/')
            }
        },
        data() {
            return {
                month: [
                    '01',
                    '02',
                    '03',
                    '04',
                    '05',
                    '06',
                    '07',
                    '08',
                    '09',
                    '10',
                    '11',
                    '12'
                ],
                year: [
                    '2021',
                    '2022',
                    '2023',
                    '2024',
                    '2025',
                    '2026',
                    '2027',
                    '2028'
                ],
                myCart: this.$store.state.cart.slice(0),
                username: localStorage.getItem('username'),
                currentUser: null
            }
        }
    }
</script>

<style scoped>
    div.card-body {
        display: flex;
        flex-direction: column;
    }
    div.row {
        justify-content: center;
    }
    div.favourite {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .favourite-text {
        margin-right: 10px;
    }
    .card-img-left {
        height: 100px;
    }
    .btn-group {
        display: flex;
        justify-content: space-between;
    }
</style>
