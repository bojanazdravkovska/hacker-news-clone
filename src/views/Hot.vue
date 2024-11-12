<template>
  <div class="home">
    <Sidebar />
    <div class="content">
      <SearchBar @search="handleSearch" />
      <div class="post-list" v-if="filteredPosts.length > 0">
        <PostItem v-for="post in filteredPosts" :key="post.id" :post="post" />
      </div>
      <div v-else class="no-results">
        <p>No posts found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/SideBar.vue';
import SearchBar from '../components/SearchBar.vue';
import PostItem from '../components/PostItem.vue';
import apiService from '../services/apiService.js';

export default {
  name: 'Hot',
  components: {
    Sidebar,
    SearchBar,
    PostItem,
  },
  data() {
    return {
      posts: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        const query = this.searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.by.toLowerCase().includes(query) ||
          (post.url && post.url.toLowerCase().includes(query))
        );
      });
    },
  },
  async created() {
    try {
      const postIds = await apiService.getTopPostIds();
      const postsPromises = postIds.slice(0, 10).map(id => apiService.getPostDetails(id));
      const postsData = await Promise.all(postsPromises);
      this.posts = postsData;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex: 1;
  height: 100vh;
  margin: 0; 
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px; 
  overflow: hidden; 
  margin: 0;
}

body, html, .home {
  margin: 0;
  padding: 0;
}
.post-list {
  width: 800px;
  margin-top: 20px;
}

.no-results {
  width: 800px;
  height: 200px; 
  padding: 40px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  width: 600px; 
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .content {
    padding: 10px;
    width: 100%; 
  }

  .search-bar {
    width: 100%;
    max-width: 600px;
  }
}
</style>
