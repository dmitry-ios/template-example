'use strict';

const API_GET_COMMENTS = `https://jsonplaceholder.typicode.com/comments`;
const API_GET_POSTS = `https://jsonplaceholder.typicode.com/posts`;
const API_GET_USERS = `https://jsonplaceholder.typicode.com/users`;

let tableData = {};
let isLoading = false;

const denormalizeComments = (comments) => {
  const result = comments.reduce((previousValue, item, index, array) => {
    if (!previousValue[item.postId]) {
      previousValue[item.postId] = [];
    }

    previousValue[item.postId].push(item);

    return previousValue;
  },
  new Object());

  return result;
}

const denormalizeUsers = (users) => {
  const results = users.reduce((previousValue, item, index, array) => {
    previousValue[item.id] = item;
    previousValue[item.id].posts = [];

    return previousValue;
  },
  new Object());

  return results;
};

const denormalizeData = (posts, comments, users) => {
  posts.forEach((post) => {
    if (comments[post.id]) {
      post.comments = comments[post.id];
    }

    if (users[post.userId]) {
      users[post.userId].posts.push(post);
    }

    return post;
  });
};

const renderTableHead = () => {
  const thead = document.createElement(`thead`);

  const headRow = document.createElement(`tr`);

  const nameHead = document.createElement(`td`);
  const postHead = document.createElement(`td`);
  const commentsHead = document.createElement(`td`);

  nameHead.textContent = `Имя`;
  postHead.textContent = `Название`;
  commentsHead.textContent = `Количество`;

  headRow.append(nameHead);
  headRow.append(postHead);
  headRow.append(commentsHead);

  thead.append(headRow);

  return thead;
};

const renderRowTemplate = (name) => {
  const row = document.createElement(`tr`);

  const nameCell = document.createElement(`td`);
  nameCell.textContent = name;

  row.append(nameCell);

  return row;
};

const renderTableRow = (postId, user, title, length) => {
  const postRow = renderRowTemplate(user.name);

  const titleCell = document.createElement(`td`);
  const commentsCell = document.createElement(`td`);

  postRow.addEventListener(`click`, (evt) => {
    if (isLoading) {
      return;
    }

    isLoading = true;

    const array = [``, `.`, `..`, `...`];
    let currentIndex = 0;

    const timerId = setInterval(() => {
      commentsCell.textContent = array[currentIndex];
      currentIndex = (currentIndex + 1) % array.length;
    }, 250);

    updateData(user, postId, (length) => {
      clearInterval(timerId);
      isLoading = false;
      commentsCell.textContent = length;
    });
  });

  postRow.style = `cursor: pointer;`;

  titleCell.textContent = title;
  commentsCell.textContent = length;

  postRow.append(titleCell);
  postRow.append(commentsCell);

  return postRow;
};

const renderTableBody = (data) => {
  const tbody = document.createElement(`tbody`);

  for (let userId in data) {
    const user = data[userId];

    user.posts.forEach((post) => {
      const postRow = renderTableRow(post.id, user, post.title, post.comments.length);

      tbody.append(postRow);
    });
  }

  return tbody;
}

const renderTable = (data) => {
  const table = document.createElement(`table`);

  table.append(renderTableHead());
  table.append(renderTableBody(data));

  document.body.prepend(table);
};

const updateData = (user, postId, callback) => {
  let post = user.posts.filter((post) => { post.id === postId});

  if (post) {
    fetch(API_GET_COMMENTS)
    .then((commentsResponse) => commentsResponse.json())
    .then((commentsData) => {
      let comments = commentsData.filter((item) => item.postId === postId);
      post.comments = comments;
      callback(comments.length);
    });
  }
};

const createTable = (usersData, commentsData, postsData) => {
  let users = denormalizeUsers(usersData);
  let comments = denormalizeComments(commentsData);

  denormalizeData(postsData, comments, users);
  renderTable(users);

  tableData = users;
};

const loadPosts = (usersData, commentsData) => {
  fetch(API_GET_POSTS)
    .then((postsResponse) => postsResponse.json())
    .then((postsData) => {
      createTable(usersData, commentsData, postsData);
    });
};

const loadComments = (usersData) => {
  fetch(API_GET_COMMENTS)
    .then((commentsResponse) => commentsResponse.json())
    .then((commentsData) => {
      loadPosts(usersData, commentsData);
    });
};

const loadUsers = () => {
  fetch(API_GET_USERS)
    .then((usersResponse) => usersResponse.json())
    .then((usersData) => {
      loadComments(usersData);
    });
};

loadUsers();
