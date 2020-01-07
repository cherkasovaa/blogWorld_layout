let data;
fetch('https://api.myjson.com/bins/6a8eg')
  .then((response) => response.json())
  .then((obj) => {
    renderHTML(obj);
  });

const doc = document;
// eslint-disable-next-line max-statements
function renderHTML(jsonData) {
  data = jsonData;

  const blogWrapper = doc.getElementById('blog-wrapper');
  const container = doc.createElement('div');
  const row = doc.createElement('div');
  const docFragment = new DocumentFragment();

  (function () {
    container.className = 'container';
    blogWrapper.appendChild(container);
  })();

  (function () {
    row.className = 'row';
    container.appendChild(row);
    createSearch(row);
  })();

  (function () {
    const articles = data.blog.content;
    articles.forEach((article) => {
      createPost(article);
    });
    container.appendChild(docFragment);
    const btn = data.blog.button;
    const buttonReadMore = createReadMore(btn);
    container.appendChild(buttonReadMore);
  })();

  function createSearch(parent) {
    const wrapper = doc.createElement('div');
    wrapper.className = 'search-wrapper';
    const searchForm = doc.createElement('form');
    searchForm.className = 'search';
    searchForm.setAttribute('action', '#');
    searchForm.setAttribute('method', 'post');
    wrapper.appendChild(searchForm);
    parent.appendChild(wrapper);
    createSearchBox(searchForm);
  }

  function createSearchBox(parent) {
    const searchBox = doc.createElement('input');
    searchBox.className = 'search__box';
    searchBox.setAttribute('type', 'text');
    searchBox.setAttribute('name', 'search');
    searchBox.setAttribute('id', 'author-search');
    searchBox.setAttribute('placeholder', 'Search by author');
    parent.appendChild(searchBox);
    createPeopleList(parent);
  }
  function createPeopleList(parent) {
    const resultList = doc.createElement('ul');
    resultList.className = 'search__result';
    const userArray = data.blog.search;
    userArray.forEach((human) => {
      createUserLink(resultList, human);
    });
    parent.appendChild(resultList);
  }

  function createUserLink(parent, human) {
    const {user, className} = human;
    const author = doc.createElement('li');
    const userLink = doc.createElement('a');
    author.className = 'search__result-item';
    userLink.className = 'search__result-author';
    userLink.setAttribute('href', '#');
    userLink.textContent = user;
    addClassName(author, `search__result-item--${className}`);
    author.appendChild(userLink);
    parent.appendChild(author);
  }

  function createPost(article) {
    const postContainer = doc.createElement('article');
    const media = createMediaWrapper(article);
    const content = createArticleContent();
    createIconWrapper(content, article);
    createAuthorInformation(content, article);
    createBlogTitle(content, article);
    createMusicPlayer(content, article);
    createBlogLead(content, article);
    createArticleButton(content, article);
    postContainer.className = 'blog-container';

    article.type === 'text'
      ? postContainer.classList.add('blog-container--wide')
      : postContainer.appendChild(media);

    postContainer.appendChild(content);

    docFragment.appendChild(postContainer);
  }

  function createVideo(wrapper, media) {
    const video = doc.createElement('video');
    const {source, image} = media;
    video.className = 'video__blog';
    video.setAttribute('src', source);
    video.setAttribute('poster', image);
    wrapper.appendChild(video);
  }

  function createImage(wrapper, media) {
    const image = doc.createElement('img');
    const {source, alt} = media;
    image.className = 'blog-container__image-blog';
    image.setAttribute('src', source);
    image.setAttribute('alt', alt);
    wrapper.appendChild(image);
  }

  function createMusicPlayer(parent, media) {
    if (!media.audio) {
      return;
    }
    const audio = doc.createElement('audio');
    const {source, description} = media.audio;
    audio.className = 'blog-container__audio';
    audio.setAttribute('src', source);
    audio.setAttribute('controls', 'controls');
    audio.textContent = description;
    parent.appendChild(audio);
  }

  function createMediaWrapper(content) {
    const mediaWrapper = doc.createElement('div');
    const {type, media} = content;
    mediaWrapper.className = 'blog-container__media-wrapper';
    switch (type) {
      case 'video':
        createVideo(mediaWrapper, media);
        break;
      case 'image':
        createImage(mediaWrapper, media);
        break;
    }
    return mediaWrapper;
  }

  function createArticleContent() {
    const contentSection = doc.createElement('section');
    contentSection.className = 'blog-container__content';
    return contentSection;
  }

  function createIconWrapper(parent, article) {
    const iconWrapper = doc.createElement('div');
    const iconImage = doc.createElement('img');
    const {source, alt} = article.icon;
    iconWrapper.className = 'blog-container__icon-wrapper';
    iconImage.className = 'blog-container__icon';
    iconImage.setAttribute('src', source);
    iconImage.setAttribute('alt', alt);
    iconWrapper.appendChild(iconImage);
    parent.appendChild(iconWrapper);
  }

  // eslint-disable-next-line max-statements
  function createAuthorInformation(parent, article) {
    const author = doc.createElement('div');
    const authorInfo = doc.createElement('div');
    const info = doc.createElement('ul');
    createAuthorName(authorInfo, article);
    createAuthorPhoto(author, article);
    author.className = 'author';
    authorInfo.className = 'author__info';
    info.className = 'post-info';

    const {postDate, readingTime, comments, rating} = article.postInfo;
    author.appendChild(authorInfo);
    authorInfo.appendChild(info);

    createPostInfo('date', postDate, info);
    createPostInfo('reading-time', readingTime, info);
    createPostInfo('comments', comments, info);
    createPostInfo('rating', rating, info);
    parent.appendChild(author);
  }

  function createAuthorName(parent, info) {
    const userName = doc.createElement('p');
    userName.className = 'author__name';
    userName.textContent = info.userName;
    parent.appendChild(userName);
  }

  function createAuthorPhoto(parent, info) {
    const userPhoto = doc.createElement('div');
    userPhoto.className = 'author__photo-wrapper';
    addClassName(userPhoto, `author__photo-wrapper--${info.userPhoto}`);
    parent.appendChild(userPhoto);
  }

  function createPostInfo(className, info, parent) {
    const inputInfo = doc.createElement('li');
    inputInfo.className = `post-info__${className}`;
    inputInfo.innerHTML = info;
    parent.appendChild(inputInfo);
  }

  function createBlogTitle(parent, content) {
    const title = doc.createElement('h3');
    title.className = 'blog-container__title';
    title.textContent = content.title;
    parent.appendChild(title);
  }

  function createBlogLead(parent, content) {
    const text = doc.createElement('p');
    text.className = 'blog-container__lead';
    text.textContent = content.lead;
    parent.appendChild(text);
  }

  function createArticleButton(parent, article) {
    const button = doc.createElement('div');
    const buttonInfo = article.button;
    const link = createLinkButton(buttonInfo);
    button.className = 'btn';
    addClassName(button, `btn__${buttonInfo.className}`);
    button.appendChild(link);
    parent.appendChild(button);
    return button;
  }

  function createLinkButton(info) {
    const link = doc.createElement('a');
    link.className = 'btn__link';
    const {source, content} = info;
    link.setAttribute('href', source);
    link.textContent = content;
    return link;
  }

  function addClassName(tag, className) {
    return tag.classList.add(className);
  }

  function createReadMore(btn) {
    const readMoreDiv = doc.createElement('div');
    readMoreDiv.className = 'read-more';
    const button = doc.createElement('button');
    button.className = 'btn';
    const {className, content} = btn;
    addClassName(button, `btn__${className}`);
    button.textContent = content;
    readMoreDiv.appendChild(button);
    return readMoreDiv;
  }
}
