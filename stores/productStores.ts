import { defineStore } from "pinia";

interface ProductRating {
  rate: number;
  count: number;
}
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: ProductRating;
}

export const useProductsStore = defineStore("products", {
  state: () => ({ products: [] as Product[], error: null as string | null }),
  actions: {
    async fetchProducts() {
      try {
        const { data } = await useFetch<Product[]>(
          "https://fakestoreapi.com/products"
        );
        this.products = data.value || [];
      } catch {
        this.error = "Ошибка загрузки товаров";
      }
    },

    async fetchProduct(id: number) {
      try {
        const { data } = await useFetch<Product>(
          `https://fakestoreapi.com/products/${id}`
        );
        if (data.value) this.products.push(data.value);
      } catch {
        this.error = "Ошибка загрузки товара";
      }
    },
  },
  getters: {
    getProductById: (state) => (id: number) =>
      state.products.find((product) => product.id === id),
  },
});
