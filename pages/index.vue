<script setup>
const selectedCategory = ref("all");
const searchQuery = ref("");

const { data: products, error } = await useFetch(
  "https://fakestoreapi.com/products",
  {
    transform: (products) =>
      products.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        category: p.category,
      })),
  }
);
// console.log(products);

// поиск и фильтрация
const filteredProducts = computed(() => {
  if (!products.value) return [];
  console.log(products);
  return products.value.filter((product) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      product.category === selectedCategory.value;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>

<template>
  <div
    class="min-h-screen w-full bg-gradient-to-r from-gray-400 to-gray-200 pb-8"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1
        class="text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-gray-400 to-black bg-clip-text text-5xl text-transparent font-bold text-center mb-16"
      >
        Каталог товаров
      </h1>

      <div class="relative flex flex-wrap gap-4 mb-8">
        <select
          v-model="selectedCategory"
          class="py-2 px-3 rounded-xl outline-none"
        >
          <option value="all">all items</option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>

        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.05193 3.05193C0.316021 5.78888 0.316021 10.2222 3.05193 12.9581C5.52305 15.4292 9.38022 15.6682 12.1192 13.6749L17.1235 18.6792C17.5518 19.1074 18.251 19.1064 18.6792 19.1074C19.1064 18.251 19.1074 17.5518 18.6792 17.1235L13.6749 12.1192C15.6682 9.37918 15.4292 5.52305 12.9581 3.05193C10.2222 0.316022 5.78888 0.316022 3.05193 3.05193ZM4.60763 4.60763C2.73024 6.48398 2.73024 9.5271 4.60763 11.4034C6.48398 13.2798 9.5271 13.2798 11.4034 11.4034C13.2798 9.5271 13.2798 6.48398 11.4034 4.60763C9.5271 2.73024 6.48398 2.73024 4.60763 4.60763Z"
            />
          </svg>

          <input
            v-model="searchQuery"
            class="w-full py-2 pl-10 pr-8 rounded-xl outline-none border focus:border-gray-400"
            placeholder="Search..."
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2"
            type="button"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="error" class="text-red-500 text-center">
        Ошибка загрузки данных!
      </div>
      <div v-else class="my-8 grid sm:grid-cols-4 gap-8">
        <NuxtLink
          v-for="product in filteredProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="p-4 bg-white rounded-xl shadow-xl transition hover:-translate-y-1"
        >
          <img
            :src="product.image"
            alt="Product Image"
            class="w-full h-40 object-contain mb-4"
          />
          <h1 class="truncate text-lg text-slate-700 font-semibold mb-2">
            {{ product.title }}
          </h1>
          <div
            class="inline-block px-2 py-1 text-sm text-gray-500 border rounded-lg mb-2"
          >
            {{ product.category }}
          </div>
          <div class="text-lg font-bold text-zinc-700">
            ${{ product.price }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
