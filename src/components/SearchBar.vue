<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search stories by title, URL, or author"
      v-model="query"
      @input="onSearch"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.query);
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
  position: relative;
}

.search-bar input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.search-bar input:focus {
  border-color: #aaa; 
  outline: none;
}
</style>
