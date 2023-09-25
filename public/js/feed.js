// public/js/feed.js

// フィードの投稿を非同期で読み込む
async function loadPosts(userId) {
  try {
    const response = await fetch(`/users/${userId}/posts.json`);
    if (!response.ok) {
      throw new Error('投稿の読み込みに失敗しました');
    }
    const data = await response.json();

    const postsContainer = document.getElementById('user-posts');
    postsContainer.innerHTML = '';

    // フィードに投稿を表示
    data.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.textContent = post.content;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('エラー: ', error);
    const errorContainer = document.getElementById('error-message');
    errorContainer.textContent = '投稿の読み込み中にエラーが発生しました';
  }
}

// ページ読み込み時にフィードを読み込む
document.addEventListener('DOMContentLoaded', () => {
  const userIdElement = document.getElementById('user-id');
  if (userIdElement) {
    const userId = userIdElement.dataset.userId;
    loadPosts(userId);
  }
});

// ユーザーの通知を非同期で読み込む
async function loadNotifications(userId) {
  try {
    const response = await fetch(`/users/${userId}/notifications.json`);
    if (!response.ok) {
      throw new Error('通知の読み込みに失敗しました');
    }
    const notifications = await response.json();

    const notificationsContainer = document.getElementById('user-notifications');
    notificationsContainer.innerHTML = '';

    // 通知を表示
    notifications.forEach(notification => {
      const notificationElement = document.createElement('div');
      notificationElement.classList.add('notification');
      notificationElement.textContent = notification.message;
      notificationsContainer.appendChild(notificationElement);
    });
  } catch (error) {
    console.error('エラー: ', error);
    const errorContainer = document.getElementById('error-message');
    errorContainer.textContent = '通知の読み込み中にエラーが発生しました';
  }
}
