<template>
  <div class="p-4 max-w-md mx-auto">
    <form @submit.prevent="handleSubmit" class="mb-4">
      <input
        v-model="query"
        @input="validateInput"
        placeholder="Enter search query"
        class="border p-2 w-full mb-2 rounded-lg shadow-md"
      />
      <span v-if="error" class="text-red-500">{{ error }}</span>
      <button
        type="submit"
        :disabled="!isValid"
        class="bg-blue-500 text-white p-2 w-full mt-2 rounded-lg shadow-md disabled:bg-gray-400"
      >
        Search
      </button>
    </form>
    <div v-if="results.length" class="mt-4">
      <ul>
        <li
          v-for="(result, index) in paginatedResults"
          :key="index"
          class="border p-2 mb-2 rounded-lg shadow-md"
        >
          {{ result.郵便番号 }} {{ result.都道府県 }} {{ result.市区町村 }}
          {{ result.町域 }} {{ result.京都通り名 }} {{ result.字丁目 }}
          {{ result.事業所名 }}
          {{ result.事業所住所 }}
        </li>
      </ul>
      <div v-if="hasMore" v-intersect="loadMore" class="loader">
        Loading more...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import baseService from "../services/base.service.ts";

interface ResultT {
  郵便番号: string;
  都道府県: string;
  市区町村: string;
  町域: string;
  京都通り名: string;
  字丁目: string;
  事業所名: string;
  事業所住所: string;
}

const query = ref("");
const results = ref<Array<ResultT>>([]);
const error = ref("");
const isValid = ref(false);
const pageSize = 20;
const currentPage = ref(0);

const paginatedResults = computed<ResultT[]>(() => {
  return results.value.slice(0, (currentPage.value + 1) * pageSize);
});

const hasMore = computed(() => {
  return paginatedResults.value.length < results.value.length;
});

const validateInput = () => {
  if (!query.value.trim()) {
    error.value = "Query cannot be empty";
    isValid.value = false;
  } else {
    error.value = "";
    isValid.value = true;
  }
};

const handleSubmit = async () => {
  if (isValid.value) {
    try {
      const response = await baseService.get(`/search?q=${query.value.trim()}`);
      results.value = response as Array<ResultT>;
      currentPage.value = 0; // Reset page for new search
    } catch (e) {
      error.value = "Error fetching data";
    }
  }
};

const loadMore = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    currentPage.value += 1;
  }
};
</script>

<style scoped>
/* Add your styles here */
.loader {
  text-align: center;
  margin-top: 20px;
}
</style>
