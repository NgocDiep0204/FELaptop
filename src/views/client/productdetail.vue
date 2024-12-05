<template>
    <div v-if="imageByModelId">
      <div class="gap-10 w-full max-w-6xl my-10" v-if="imageByModelId.length">
        <div class="rounded-lg" >
          <div class="flex md:flex-row flex-col justify-center items-center px-5 pb-10">
            <div class="w-2/5 relative group">
              <!-- <div class="flex justify-center"> -->
                  <img :src="currentImageUrl" alt="" class="w-64 h-64">
                  <button @click="prevImage" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button @click="nextImage" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
                      <path class="" stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                  <p class="flex justify-center w-full" ><img :src="product.productImage" alt="" class="w-44 h-40"></p>
              </div>
            <div class="pl-6 w-3/5">
              <h3 class="pb-6 font-bold">{{ imageByModelId[0].product.variant.model.modelName }}</h3>
              <!-- <div class="">
                <div class="flex md:flex-row flex-col">
                  <span class="pr-8">Colors:</span><ColorComponent v-if="colorByModelId.length" :colors="colorByModelId"  @color-click="handleColorClick" />
                </div>
                <div class="flex md:flex-row flex-col">
                  <span class="pr-5">Variants:</span><VariantComponent v-if="variantByModelId.length" :variants="variantByModelId" @variant-click="handleVariantClick" />
                </div>
              </div> -->
              <div class="flex md:flex-row flex-col">
                <label class="pr-4">Quantity:</label> 
              <div class="flex flex-row-3">
                <div class="border-2 border-gray-400 w-10 h-7" @click="minusClick">
                  <button class="flex justify-center items-center w-full">-</button>
                </div>
                <div class="border-t-2 border-b-2 border-gray-400 w-10 h-7">
                  <span class="flex justify-center items-center w-full">{{ addcartdetail.quantity }}</span>
                </div>
                <div class="border-2 border-gray-400 w-10 h-7" @click="addClick">
                  <button class="flex justify-center items-center w-full">+</button>
                </div>
              </div>
              </div>
              <div class="flex flex-rowl">
                <span class="pr-2">
                  Price:
                </span>
                <p class="text-gray-600 pl-9" v-if="!productByColorAndVariant">{{ minPrice }}$ -> {{maxPrice}}$</p>
                <p class="text-gray-600 pl-9" v-if="productByColorAndVariant">{{ minPrice }}$</p>
              </div>
              <div class="flex flex-row">
                <span class="pr-2">
                  Description:
                </span><p>{{imageByModelId[0].product.description}}</p>
              </div>
              <div class="flex flex-row justify-between items-center pt-10">
                <button @click="addToCartClick" class="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-1 px-2 text-gray-50 text-sm  flex items-center hover:from-pink-600 hover:to-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>