<template>
  <div class="p-4 container mx-auto">
    <div class="max-w-2xl mx-auto">
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
    </div>

    <div v-if="results.length" class="mt-4 overflow-x-auto">
      <table class="min-w-full bg-white border w-full">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-2 px-4 border">#</th>
            <th class="py-2 px-4 border">郵便番号</th>
            <th class="py-2 px-4 border">都道府県</th>
            <th class="py-2 px-4 border">市区町村</th>
            <th class="py-2 px-4 border">町域</th>
            <th class="py-2 px-4 border">京都通り名</th>
            <th class="py-2 px-4 border">字丁目</th>
            <th class="py-2 px-4 border">事業所名</th>
            <th class="py-2 px-4 border">事業所住所</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(result, index) in paginatedResults"
            :key="result.郵便番号"
            class="border"
          >
            <td class="py-2 px-4 border">{{ index + 1 }}</td>
            <td class="py-2 px-4 border">{{ result.郵便番号 }}</td>
            <td class="py-2 px-4 border">{{ result.都道府県 }}</td>
            <td class="py-2 px-4 border">{{ result.市区町村 }}</td>
            <td class="py-2 px-4 border">{{ result.町域 }}</td>
            <td class="py-2 px-4 border">{{ result.京都通り名 }}</td>
            <td class="py-2 px-4 border">{{ result.字丁目 }}</td>
            <td class="py-2 px-4 border">{{ result.事業所名 }}</td>
            <td class="py-2 px-4 border">{{ result.事業所住所 }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="hasMore" v-intersect="loadMore" class="loader">
        Loading more...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import baseService from "../services/base.service.ts";
import { debounce } from "../utils";

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

const paginatedResults = computed(() => {
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

const handleSubmit = debounce(
  async () => {
    if (isValid.value) {
      try {
        const response = await baseService.get(
          `/search?q=${query.value.trim()}`,
        );
        results.value = response as Array<ResultT>;
        currentPage.value = 0; // Reset page for new search
      } catch (e) {
        error.value = "Error fetching data";
      }
    }
  },
  200,
  true,
);

const loadMore = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    currentPage.value += 1;
  }
};
</script>

<style scoped>
.loader {
  text-align: center;
  margin-top: 20px;
}
</style>
