<template>
    <section class="bg-gray-300 min-h-screen flex items-center justify-center mt-4">
     <!-- Login contaoner -->
      <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          <!-- Form -->
          <div class="sm:w-1/2 px-16">
             <h2 class="font-bold text-2xl">Register</h2>
             <!-- <p class="text-sm mt-4">If you already a member, eassily login</p> -->
             <form  @submit.prevent="handleSubmit" action="" class="flex flex-col gap-4">
                <div class="relative">
                    <input v-model="register.username" class="p-2 mt-8 rounded-xl border" type="text" name="username" placeholder="Enter your username">
                    <input v-model="register.password" class="p-2 mt-8 rounded-xl border" type="password" name="password" placeholder="Enter your password">
                    <input v-model="confirmpassword" class="p-2 mt-8 rounded-xl border" type="password" name="password" placeholder="Enter your confirm password">
                </div>    
                <button class="bg-purple-800 rounded-xl text-white py-2 hover:scale-105 duration-300 w-full">Register</button>
               
            </form>
           
            <div class="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                <router-link :to="{name: 'login'}">Do you already have an account?</router-link>
            </div>
          </div >
          <!-- Image -->
          <div class="w-1/2 p-5 items-center">
              <img class="md:block hidden rounded-xl w-72 h-96" :src=imgUrl alt="library">
          </div>
      </div>
    </section>
  </template>
  

<script>
import axiosClient from '../axiosClient';
export default {
    data(){
      return{
        register: {
          username: '',
          password: '',
        },
        confirmpassword: '',
        username: '',
        imgUrl: "src/assets/img/login.jpg"
    }
  },
  methods:{
    async handleSubmit(){
      if( !this.register.password || !this.register.username || !this.confirmpassword){
          alert('Please enter your email and password');
          return;
      }
      if(this.register.password !== this.confirmpassword){
        alert('Password and confirm password do not match');
        return;
      }
      try {
          const response = await axiosClient.post(`Authentication/Register`, {
              username: this.register.username,
              password: this.register.password,
              });
          if (response.status === 200) {
            console.log(response)
          await this.createCart(response.data);  
          alert('Register successfully. Please login to continue.');
          this.$router.push('/login');
          }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(error)
          console.log(response)
        } else {
          console.error('Register error:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    },
    async createCart(id){
      const response = await axiosClient.post(`Order/AddOrder`, {
        userId: id,
      });
      if (response.status === 200) {
        console.log('Create cart successfully');
      }
    }
  },
}
</script>

<style>

</style>