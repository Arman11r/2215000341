const { fetchUsers, fetchUserPosts, fetchPostComments } = require('./fetchService');

async function getTopUsers() {
  const users = await fetchUsers();
  const userCommentCounts = [];

  for (const userId in users) {
    const posts = await fetchUserPosts(userId);
    let commentCount = 0;

    for (const post of posts) {
      const comments = await fetchPostComments(post.id);
      commentCount += comments.length;
    }

    userCommentCounts.push({ userId, name: users[userId], commentCount });
  }

  userCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
  return userCommentCounts.slice(0, 5);
}

async function getPopularPosts() {
  const users = await fetchUsers();
  let allPosts = [];

  for (const userId in users) {
    const posts = await fetchUserPosts(userId);
    allPosts = allPosts.concat(posts);
  }

  const postsWithCommentCount = [];
  for (const post of allPosts) {
    const comments = await fetchPostComments(post.id);
    postsWithCommentCount.push({ ...post, commentCount: comments.length });
  }

  const maxComments = Math.max(...postsWithCommentCount.map(p => p.commentCount));
  return postsWithCommentCount.filter(p => p.commentCount === maxComments);
}

async function getLatestPosts() {
  const users = await fetchUsers();
  let allPosts = [];

  for (const userId in users) {
    const posts = await fetchUserPosts(userId);
    allPosts = allPosts.concat(posts);
  }

  allPosts.sort((a, b) => b.id - a.id); // assuming higher ID = newer
  return allPosts.slice(0, 5);
}

module.exports = { getTopUsers, getPopularPosts, getLatestPosts };