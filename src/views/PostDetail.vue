<template>
  <div class="post-detail" v-if="post">
    <h1>{{ post.title }}</h1>
    <p><strong>By:</strong> {{ post.by }}</p>
    <p><strong>Score:</strong> {{ post.score }}</p>
    <p><strong>Comments:</strong> {{ post.descendants }}</p>
    <div v-if="post.url">
      <a :href="post.url" target="_blank">Read the full post</a>
    </div>
    <div v-if="comments.length > 0">
      <h3>Comments</h3>
      <div v-for="comment in comments" :key="comment.id">
        <div class="comment">
          <p><strong>{{ comment.by }} </strong><span v-if="comment.time">&nbsp; {{ formatTime(comment.time) }}</span></p>
          <p v-html="comment.text"></p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No comments available.</p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import apiService from '../services/apiService'; 

export default {
  name: 'PostDetail',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      postLoaded: false,
      comments: [], 
    };
  },
  mounted() {
    // Check if the user is offline
    if (!navigator.onLine) {
      // If offline, load post data from LocalStorage
      this.loadPostDataFromLocalStorage();
    } else {
      // If online, fetch post data and comments
      this.loadPostData();
    }

    // Listen for online and offline events
    window.addEventListener('online', this.loadPostData);
    window.addEventListener('offline', this.loadPostDataFromLocalStorage);
  },
  beforeDestroy() {
    // Clean up event listeners when component is destroyed
    window.removeEventListener('online', this.loadPostData);
    window.removeEventListener('offline', this.loadPostDataFromLocalStorage);
  },
  methods: {
    // Load post data from API and store it in LocalStorage
    async loadPostData() {
      try {
        const postId = this.$route.params.id;
        const post = await apiService.getPostDetails(postId);
        this.post = post;
        this.postLoaded = true;
        this.fetchComments(); 

        // Store the post in LocalStorage
        localStorage.setItem('post_' + postId, JSON.stringify(post));

        // Store the comments in LocalStorage
        if (this.post.kids && this.post.kids.length > 0) {
          const commentPromises = this.post.kids.map(id =>
            apiService.getPostDetails(id)
          );
          const comments = await Promise.all(commentPromises);
          this.comments = comments;
          localStorage.setItem('comments_' + postId, JSON.stringify(comments));
        }
      } catch (error) {
        console.error('Error loading post data:', error);
        this.postLoaded = false;
      }
    },

    // Load post data from LocalStorage when offline
    loadPostDataFromLocalStorage() {
      const postId = this.$route.params.id;
      const cachedPost = localStorage.getItem('post_' + postId);
      const cachedComments = localStorage.getItem('comments_' + postId);

      if (cachedPost) {
        this.post = JSON.parse(cachedPost);
        this.postLoaded = true;
      }

      if (cachedComments) {
        this.comments = JSON.parse(cachedComments);
      }
    },

    // Fetch comments from API (will be called after post data is loaded)
    async fetchComments() {
      if (this.post.kids && this.post.kids.length > 0) {
        try {
          const commentPromises = this.post.kids.map(id =>
            apiService.getPostDetails(id) 
          );
          const comments = await Promise.all(commentPromises);
          this.comments = comments; 
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    },

    formatTime(timestamp) {
      const currentTime = Date.now(); 
      const timeDifference = currentTime - timestamp * 1000; 

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        return `${seconds} seconds ago`;
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else {
        return `${days} days ago`;
      }
    },
  },
};
</script>

<style scoped>
.comment {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}
.post-detail {
  margin-left: 120px;
}

span {
  color: #0000EE;
}
</style>
