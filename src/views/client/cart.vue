<template>
    <div class="bg-gradient-to-r from-purple-200 to-pink-200 w-full h-2 my-7"></div>
    <div class="flex flex-row">
    <div class="flex flex-col pl-4" v-if="cartdetail">
    <div v-if="cartdetail.length === 0">No items in the cart</div>
      <div class="w-4/6 border-purple-100 border-4 rounded-lg mb-5" v-for="(detail, index) in cartdetail" :key="detail.orderId">
        <div class="flex flex-row">
          <div class="ml-2 flex justify-center">
            <input type="checkbox" class="mr-2" @click="checkClick(detail.orderId, detail.productId, $event)" />
          </div>  
          <div class="w-2/5 pr-8">
            <div >
              <img :src="detail.productImage" alt="product">
            </div>
          </div>
          <div class="w-3/5 pt-2">
            <span>{{ detail.productName}}</span>
            <div class="flex flex-row pt-2">
              <div class="border-2 border-gray-400 w-10 h-7" @click="minusClick(detail.productId)">
                <button class="flex justify-center items-center w-full">-</button>
              </div>
              <div class="border-t-2 border-b-2 border-gray-400 w-10 h-7">
                <span class="flex justify-center items-center w-full">{{ detail.quantity }}</span>
              </div>
              <div class="border-2 border-gray-400 w-10 h-7" @click="addClick(detail.productId)">
                <button class="flex justify-center items-center w-full">+</button>
              </div>
            </div>
            <div class=" items-center pt-2 ">
            <span >{{ detail.productPrice }}$</span>
          </div>
           
          </div>
          <div class="flex justify-center items-center m-3" @click="deleteCartDetail(detail.orderId, detail.productId)">
            <span class="pi pi-trash" ></span>
            </div>
        </div>
      </div>
    </div>
    <div class="w-2/6 border-pink-300 border-4 rounded-lg h-32" v-if="cartdetail.length >=0">
      <div class="flex justify-center m-5 w-[200px]">
        <div class="flex flex-col">
          <strong class="">Total Quantity: {{ totalquanlity }} </strong>
          <strong class="">Total Amount:   {{ total }}</strong>
        </div>
        
      </div>
     
    </div>
    </div>
  </template>

<script>
import { mapActions, mapState } from 'vuex/dist/vuex.cjs.js';   
import axiosClient from '../../axiosClient';
export default {
    data() {
        return{
            total: 0,
            totalquanlity: 0,
            selectedItems: [],
            checkitem:{},
            cartdetailUP :{
              orderId: null,
              productId: null,
              quantity: null,
            }
        }
    },
    computed: {
        ...mapState(['cart', 'cartdetail', 'products']),
    },
    async mounted() {
      await this.GetCart(this.$route.params.id).then(() => {
        this.GetCartDetail(this.cart.orderId).then(() =>{
          console.log("Carthhh:", );
          console.log("CartDetail loaded:", this.cartdetail);
        })
      });
      await this.GetProducts().then(() => {
        console.log("Products loaded:", this.products);
      });
    },

    methods:{
      ...mapActions(['GetCartDetail', 'GetCart', 'GetProducts']),
     
      async updateCartDetail(orderId, productId, quantity) {
        this.cartdetailUP.orderId = orderId
        this.cartdetailUP.productId = productId 
        this.cartdetailUP.quantity = quantity
        try{
        const response = await axiosClient.put('OrderDetail/UpdateCartDetail', this.cartdetailUP);
        }catch(error){
          if(error.response){
            switch (error.response.status) {
                case 409:
                  alert("Sản phầm đã hết hàng");
                  break;
                case 400:{
                  alert("Bạn đã thêm vào giỏ quá số lượng mặt hàng còn lại");
                  break;
                }
                default:
                  alert("Đã xảy ra lỗi không xác định!");
              }
          }
        }
      },

      addClick(productId) {
            const product = this.products.find(product => product.productId === productId);
            const detail = this.cartdetail?.find(detail => detail.orderId === this.cart.orderId && detail.productId === productId);
            if (detail) {
            if(detail.quantity < product.quantity){
              detail.quantity++;
              this.updateCartDetail(detail.orderId, productId, detail.quantity);
            }else{
              alert("Bạn đã thêm vào giỏ quá số lượng mặt hàng còn lại");
            }
          } else {
              console.error(`No detail found for cartID:${detail.orderId}  and productID: ${productId}`);
          }
        },
        minusClick( productId) {
          const detail = this.cartdetail?.find(detail => detail.orderId === this.cart.orderId && detail.productId === productId);

            if(detail.quantity > 1) {
              detail.quantity--;
            this.updateCartDetail(detail.orderId, productId, detail.quantity);
            
            }else if(detail.quantity === 1) {
              this.deleteCartDetail(detail.orderId, productId);
            }
        },

        async deleteCartDetail(cartID, productID) {
    const userConfirmed = window.confirm("Are you sure you want to delete this item from the cart?");

    if (userConfirmed) {
        const response = await axiosClient.delete(`OrderDetail/DeleteCartDetails?orderId=${cartID}&productId=${productID}`);
        const detail = this.cartdetail.find(detail => detail.orderId === cartID && detail.productId === productID);
        console.log("Detddddail:", detail);
        if (response.status === 200) {
            if (detail) {
                const index = this.cartdetail.findIndex(d => d.orderId === cartID && d.productId === productID);
                if (index !== -1) {
                    this.cartdetail.splice(index, 1);
                }
            } 
        }
    }
},



        async checkClick(cartID, productID, event) {
        const isChecked = event.target.checked;
        const amount = this.cartdetail
                           .filter(detail => detail.orderId == cartID && detail.productId == productID)
                           .reduce((acc, detail) => detail.productPrice * detail.quantity, 0);
        if (isChecked) {
          this.totalquanlity += 1
          this.total += amount;
        } else {
          this.totalquanlity -= 1
          this.total -= amount;
        }
      },
    }
    
}
</script>

