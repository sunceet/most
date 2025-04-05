// import { defineStore } from "pinia";
// import { ref, computed } from "vue";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

// export const useProductStore = defineStore("productStore", () => {
//   const products = ref<Product[]>([]);
//   const selectedCategory = ref<string>("all");
//   const searchQuery = ref<string>("");
//   // const loading=ref(false);
//   // const error = ref<string | null>(null);

//   const filteredProducts = computed(() => {
//     return products.value.filter((product) => {
//       const matchesCategory =
//         selectedCategory.value === "all" ||
//         product.category === selectedCategory.value;
//       const matchesSearch = product.title
//         .toLowerCase()
//         .includes(searchQuery.value.toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   });

//   async function fetchProducts() {
//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       products.value = await res.json();
//       console.log(products);
//     } catch (error) {
//       console.error("Failed to parse products:", error);
//     }
//   }

//   return {
//     products,
//     filteredProducts,
//     selectedCategory,
//     fetchProducts,
//     searchQuery,
//   };
// });
