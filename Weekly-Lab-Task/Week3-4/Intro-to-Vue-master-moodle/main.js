Vue.component('product',{
    props:{
        premium: {
            type: Boolean,
            required:true
        }
    }, 
    template:`
    <div class="product">

        <div class="product-image">
        <img v-bind:src="image"></img>
    
    <div class="product-info"></div>
        <h1>{{ title }} </h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }} </p>

    <ul>
          <li v-for="detail in details">{{detail}}</li>
    </ul>
    <div v-for="(variant, index) in variants" 
             :key="variant.variantId" 
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
    </div>
    <button v-on:click="addToCart" 
        :disabled="!inStock"
        :class="{ disabledButton: !inStock}">Add to Cart</button>
    
    </div> 

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
    <product-review> @review-submitted="addReview" </product-review>
    </div>
    `,
    data(){
        return {brand: 'Vue Mastery',
        product : "Socks",
        selectedVariant: 0,


        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants:[
            {
                variantId: 2234,
                variantColor:"green",
                variantImage: "./assets/images/socks_green.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor:"blue",
                variantImage: "./assets/images/socks_blue.jpg",
                variantQuantity: 0
            }
        ],

        reviews: []

    }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },

        //Challenge Task 9 
        // removeFromCart() {
        //     this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        // },
        updateProduct: function(index){
            this.selectedVariant = index
            console.log(index)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
          }
        
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if(this.premium){
                return "Free"
            }
            return 2.99
        }
    }
})

  
Vue.component('product-review',{
    template:`
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review" required></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <label for="recommend"> Would you recommend this product ? </label>
        <input type="radio" id="recommend" name="recommend" value="yes" v-model="recommend"> Yes
        <input type="radio" id="recommend" name="recommend" value="yes" v-model="recommend"> No
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data(){
        return{
            name:null,
            review:null,
            rating:null,
            recommend:null,
            errors: []
        }
    },
    method:{
        onSubmit() {
            if(this.name && this.review && this.rating) {
              let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend //Challenge Task 10
              }
              this.$emit('review-submitted', productReview)
              this.name = null
              this.review = null
              this.rating = null,
              this.recommend= null //Challenge Task 10
            } else {
              if(!this.name) this.errors.push("Name required.")
              if(!this.review) this.errors.push("Review required.")
              if(!this.rating) this.errors.push("Rating required.")
              if(!this.recommend) this.errors.push("Recommend required.") //Challenge Task 10
            }
          }
    }
})

var app = new Vue({
    el:'#app',
    data: {
        premium: false,
        cart: [],
        //Challenge Task 8
        // details: ['80% cotton', '20% polyester', 'Gender-neutral']
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        },
    
        //Challenge Task 9 
        // removeFromCart(id) {
        //     this.cart.pop(id)
        // }
    }
// Challenge Task 8

// Vue.component('product-details', {
//     props: {
//       details: {
//         type: Array,
//         required: true
//       }
//     },
//     template: `
//       <ul>
//         <li v-for="detail in details">{{ detail }}</li>
//       </ul>
//     `
//   })
    //     //Challenge Task 7
    //     //onSale: true,

    //     //Challenge Task 2
    //     // link: "https://youtube.com",

    //     // Challenge Task 3
    //     // inStock: true,

    //     // Challenge Task 4
    //     // sizes: ["S","M","L","XL"],

    //     // Challenge Task 5
    //     // decrementCart(){
    //     //     this.cart -=1
    //     // },

    // computed:{
    //     // Challenge Task 7
    //     title(){
    //         // if (this.onSale) {
    //         //     return this.brand + ' ' + this.product + ' is on Sale!';
    //         //   } else {
    //         //     return this.brand + ' ' + this.product;
    //         //   }
    //         return this.brand + ' ' + this.product
    //     },
      

})