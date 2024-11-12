<template>
  <div class="post-item">
    <div class="post-header">
      <router-link :to="{ name: 'post-detail', params: { id: post.id } }" class="post-title">
        {{ post.title }}
      </router-link>
    </div>
    <div class="post-meta">
      <span>{{ post.score }} points by {{ post.by }} | </span>&nbsp;
      <span>{{ formatTime(post.time) }} | </span>&nbsp;
      <router-link :to="{ name: 'post-detail', params: { id: post.id } }" class="comment-button">
        <i class="fa fa-comment"></i> {{ post.descendants || 0 }}
      </router-link>
    </div>
    <a v-if="post.url" :href="post.url" target="_blank" class="post-url">Read more</a>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000); 
      return date.toLocaleString(); 
    },
  },
};
</script>


<style scoped>
.post-item {
  padding: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e6e6e6; 
}

.post-header {
  margin-bottom: 5px;
}

.post-title {
  font-size: 18px;
  color: #333;
  text-decoration: none;
  font-weight: 600;
}

.post-title:hover {
  text-decoration: underline;
}

.post-meta {
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
}

.comment-button {
  display: flex;
  align-items: center;
  color: #888;
  text-decoration: none;
  margin-left: 5px;
}

.comment-button i {
  margin-right: 3px;
}

.comment-button:hover {
  color: #333;
}

.post-url {
  display: block;
  margin-top: 5px;
  color: #0056b3;
  font-size: 13px;
  text-decoration: none;
}

.post-url:hover {
  text-decoration: underline;
}
</style>
