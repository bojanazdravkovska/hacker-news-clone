
const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}.json?print=pretty`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

// Fetch the top post IDs
async function getTopPostIds() {
  return await fetchData('/topstories');
}

// Fetch details of a specific post by ID
async function getPostDetails(postId) {
  return await fetchData(`/item/${postId}`);
}

export default {
  getTopPostIds,
  getPostDetails,
};
