<template>
  <div class="min-h-screen bg-gradient-to-r from-gray-500 to-white-100">
    <div class="flex items-center justify-center h-screen">
      <div class="p-6 max-w-xl mx-auto bg-white border rounded-lg shadow-lg">
        <NuxtLink to="/" class="text-blue-800 hover:underline">
          ← Назад
        </NuxtLink>

        <div v-if="error" class="text-red-500">
          Ошибка загрузки данных: {{ error.message }}
        </div>

        <div v-else class="text-center">
          <h1 class="text-2xl text-slate-700 font-semibold mb-4">
            {{ product.title }}
          </h1>
          <img
            :src="product.image"
            alt="Product Image"
            class="w-60 h-60 object-contain mx-auto mb-4 border border-gray-900 shadow-xl rounded-xl"
          />
          <h2 class="text-xl text-slate-700 mb-4">
            {{ product.description }}
          </h2>
          <div class="flex items-rig justify-end space-x-2">
            <img src="../../content/star.svg" class="w-7 h-7" />
            <h4 class="text-xl text-yellow-500">
              {{ product.rating.rate }}
            </h4>
          </div>
          <h5 class="text-0.5xl text-right text-zinc-700">
            Count:
            {{ product.rating.count }}
          </h5>
          <h3 class="text-xl font-bold text-zinc-700">
            Price: ${{ product.price }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const { data: product, error } = await useFetch(
  `https://fakestoreapi.com/products/${route.params.id}`,
  {
    transform: (data) => ({
      ...data,
      rating: {
        rate: data.rating.rate,
        count: data.rating.count,
      },
    }),
  }
);
</script>
