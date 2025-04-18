const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/evaluation-service';

async function fetchUsers() {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data.users;
}

async function fetchUserPosts(userId) {
  const res = await axios.get(`${BASE_URL}/users/${userId}/posts`);
  return res.data.posts || [];
}

async function fetchPostComments(postId) {
  const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
  return res.data.comments || [];
}

module.exports = { fetchUsers, fetchUserPosts, fetchPostComments };
