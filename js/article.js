let data;
fetch('https://api.myjson.com/bins/1flbjc')
  .then((response) => response.json())
  .then((obj) => {
    renderHTML(obj);
  });

const doc = document;

// eslint-disable-next-line max-statements
function renderHTML(jsonData) {
  data = jsonData;
  const {informBlock, article} = data;
  const main = doc.getElementById('main');
  const container = createWrapper(main, 'container');
  const row = createWrapper(container, 'row');
  addArticleBlock(row, article);
  addInformationBlock(row, informBlock);

  function addTagsBlock(parent, data) {
    const {title, themes} = data;
    const blockTitle = createElement('h3', 'tags-box__title');
    blockTitle.textContent = `${title}`;
    parent.appendChild(blockTitle);
    themes.forEach((theme) => createNewTag(parent, theme));
  }

  function createNewTag(parent, data) {
    const {id, content} = data;
    const input = createInput('tags-box__toggle', 'checkbox', `${id}`);
    const label = createElement('label', 'tags-box__value');
    label.setAttribute('id', `${id}`);
    label.textContent = `${content}`;
    parent.appendChild(input);
    parent.appendChild(label);
  }

  function addArticleBlock(parent, data) {
    const {title} = data;
    const article = doc.createElement('article');
    article.className = 'article-block';
    const blockTitle = createElement('h2', 'article-block__title');
    blockTitle.textContent = `${title}`;
    article.appendChild(blockTitle);
    const infoAuthor = createWrapper(article, 'author');
    addAuthorInfo(infoAuthor, data);
    const articleContent = createWrapper(article, 'article-block__main-content');
    addContentArticle(articleContent, data);
    const reviewsBlock = createWrapper(article, 'reviews');
    addReviewsBlock(reviewsBlock, data);
    parent.appendChild(article);
  }

  function addReviewsBlock(parent, data) {
    const {title, button} = data.reviews;
    const sectionTitle = createElement('h3', 'reviews__title');
    const buttonReadMore = createButton(parent, 'btn', 'btn__secondary');
    parent.appendChild(sectionTitle);
    const reviewsWrapper = createWrapper(parent, 'reviews__wrapper');
    addReviewsCard(reviewsWrapper, data);
    parent.appendChild(buttonReadMore);
    buttonReadMore.classList.add('btn__secondary--wide');
    buttonReadMore.textContent = `${button.content}`;
    sectionTitle.textContent = `${title}`;
  }

  function addReviewsCard(parent, data) {
    const {comments} = data.reviews;
    const wrapper = createWrapper(parent, 'review-card-wrapper');
    comments.forEach((comment) => addComment(wrapper,comment));
  }

  function addComment(parent, data) {
    const {id, content} = data;
    const card = createWrapper(parent, 'review-card');
    const info = createWrapper(card, 'review-card__info');
    const comment = createElement('p', 'review-card__content');
    comment.textContent = `${content}`;
    addUserInfo(info, data);
    addClassName(card, `review-card--${id}`);
    card.appendChild(comment);
    addButtonHideText(card, id);
  }

  function addButtonHideText(parent, id) {
    const button = createElement('a', 'review-card__read-more');
    button.setAttribute('href', '#');

    if (id === 'first') {
      button.textContent = 'Read more';
    } else if (id === 'second') {
      button.textContent = 'Read less';
    } else {
      button.textContent = '';
    }

    parent.appendChild(button);
  }

  function addUserInfo(parent, data) {
    const {name, rating, time} = data;
    const userName = createElement('p', 'review-card__user-name');
    const postDate = createElement('p', 'review-card__time');
    postDate.textContent = `${time}`;
    userName.textContent = `${name}`;
    parent.appendChild(userName);
    const userRating = createWrapper(parent, 'review-card__rating');
    userRating.innerHTML = `${rating}`;
    parent.appendChild(postDate);
  }

  function createButton(parent, className, extraClassName) {
    const button = doc.createElement('button');
    button.className = `${className}`;
    button.classList.add(`${extraClassName}`);
    parent.appendChild(button);
    return button;
  }

  function addContentArticle(parent, data) {
    const {source} = data.audio;
    const articleImage = createWrapper(parent, 'article-block__image');
    const audio = createElement('audio', 'article-block__audio');
    audio.setAttribute('controls', 'controls');
    audio.setAttribute('src', `./audio/${source}`);
    audio.innerHTML = 'Your browser does not support the <code>audio</code> element.';
    parent.appendChild(articleImage);
    parent.appendChild(audio);
    addTextArticle(parent);
    const articleFooter = createWrapper(parent, 'row');
    addArticleFooter(articleFooter);
    addIconsContainer(articleFooter, data);
  }

  function addTextArticle(parent) {
    const wrapper = createWrapper(parent, 'article-block__text-wrapper');
    wrapper.innerHTML = `
    <p class="article-block__text">
      The thing you’re doing now, reading prose on a screen, is
      going out of fashion. The defining narrative of our online
      moment concerns the decline of text, and the exploding reach
      and power of audio and video.
      <span class="article-block__highlight"
        >Which come particular teens wasn't.</span
      >
      Own day designed suspension conflict unlawful. I'll stayed
      liable i've. Interact minutes see night translate.
    </p>
     <p class="article-block__text">
        Number interact already promotion someone thought run same why
        one it very. Fifteen problem friend editing away proprietary
        words shivering shivered. Shivers special worried in waive
        this we. Spider 13 house same avoid. Coffee including products
        violation legs my defamatory predominantly important again
        strictly. Including budgie we materials 17 hand harassing
        calling offensive relating. Faints comes everyone this
        developed specialises parties scream. Aren't stopped mean
        little me but what lower problem. Can usually. Middle posts
        you sometimes can yes that's rules breach.
      </p>
      <p class="article-block__text">
        Same took made faints aged. All Impersonating these.
        <span class="article-block__highlight"
          >Costs quite full make new.</span
        >
        Well see does data friend breach obliged scream no wasn't. Saw
        that's methods act. Working approach users what over register.
        Think the. Perform groups. In unacceptable by should off.
        About incitement rabbit working temporarily that is against
        trademark herself might i'm. Stopped Special stayed supply
        predominantly plastic in worldwide hypnotised damaging further
        exercise. Refused reproduce furry publicise week learners
        really decided text usernames racially happened. Become come
        glass even see you uncommon eventually relating fifteen.
      </p>
       <h3 class="article-block__text-title">Techno Trends</h3>
       <p class="article-block__text">
          This methods class of artificial intelligence is on everyone’s
          lips. And all because it solves problems not directly, but by
          learning in the process of performing many specific tasks.
        </p>
        <p class="article-block__text">
          With the help of machine learning, it is possible to
          <span
            class="article-block__highlight article-block__highlight--crossed-out"
            >increase manyfold</span
          >
          the work of websites and applications, so, in the upcoming
          year such tasks as speech, face and visual images recognition,
          process of diagnostics and results prediction, analysis and
          sorting of large data volumes will become even easier.
        </p>
         <blockquote class="quote">
            <p class="quote__text">
              <span class="quote__text quote__text--highlight"
                >Voice command is really very fast.</span
              >
              A person does not need to learn how to navigate the
              graphical interface and how to use it for an intended
              purpose. We began to speak almost from birth, and this our
              skill is very well developed.
            </p>
          </blockquote>
          <h3 class="article-block__text-title">
            Interface trend
          </h3>
          <p class="article-block__text">
            People have always sought to make things easier, but more
            effective. Digital area has already grown out a bit from
            regular graphical navigation, and one of the most affordable
            alternatives is the voice interface. However, it will
            <a href="#" class="article-block__highlight">replace</a> not
            all the functions of the UI, but will only become an
            intermediary between the user and the main function of the
            site. Why? Here are some of the key arguments.
          </p>
    `;
  }

  function addArticleFooter(parent) {
    const counterContainer = createWrapper(parent, 'likes-counter');
    const likes = createInput('likes-counter__hidden', 'checkbox', 'like');
    const customLikes = createElement('label', 'likes-counter__custom');
    customLikes.setAttribute('for', 'like');
    const likesCounter = createElement('span', 'likes-counter__counter');
    likesCounter.textContent = '75 likes';
    counterContainer.appendChild(likes);
    counterContainer.appendChild(customLikes);
    counterContainer.appendChild(likesCounter);
  }

  function addIconsContainer(parent, data) {
    const {icons} = data;
    const iconsList = document.createElement('ul');
    iconsList.className = 'icons';
    icons.forEach((icon) => addIcons(iconsList, icon));
    parent.appendChild(iconsList);
  }

  function addIcons(parent, data) {
    const {link, icon} = data;
    const item = doc.createElement('li');
    const linkItem = doc.createElement('a');
    const iconItem = doc.createElement('span');
    iconItem.className = 'icon';
    addClassName(iconItem, `icon--${icon}`);
    linkItem.setAttribute('href', `${link}`);
    linkItem.className = 'icons__link';
    item.className = 'icons__item';
    linkItem.appendChild(iconItem);
    item.appendChild(linkItem);
    parent.appendChild(item);
  }

  function addAuthorInfo(parent, data) {
    const userPhoto = createWrapper(parent, 'author__photo-wrapper');
    addClassName(userPhoto, 'author__photo-wrapper--article');
    const userInfo = createWrapper(parent, 'author__info');
    addUserInfoContent(userInfo, data);
  }

  function addUserInfoContent(parent, data) {
    const {author} = data;
    const userName = createElement('p', 'author__name');
    userName.textContent = `${author}`;
    parent.appendChild(userName);
    createAuthorInfoList(parent, data);
  }

  function createAuthorInfoList(parent, data) {
    const {postInfo, rating} = data;
    const list = createElement('ul', 'post-info');
    const ratingItem = createElement('li', 'post-info__rating');
    addRating(ratingItem, rating);
    postInfo.forEach((item) => addListItem(list, item));
    list.appendChild(ratingItem);
    parent.appendChild(list);
  }

  function addRating(parent, data) {
    const rating = data;
    const wrapper = createWrapper(parent, 'rating');
    rating.forEach((star) => addStar(wrapper, star));
  }

  function addStar(parent, data) {
    const {id} = data;
    const star = createInput('rating__star', 'radio', `${id}`);
    star.setAttribute('name', 'star');
    const label = createElement('label', 'rating__custom-star');
    label.setAttribute('for', `${id}`);
    parent.appendChild(star);
    parent.appendChild(label);
  }

  function addInformationBlock(parent, data) {
    const {latestPost, categories, tags} = data;
    const informationBlock = doc.createElement('aside');
    informationBlock.className = 'information';
    const latestPostBlock = createWrapper(informationBlock, 'latest-post');
    const categoriesBlock = createWrapper(informationBlock, 'categories');
    const tagsBlock = createWrapper(informationBlock, 'tags-box');
    addLatestPost(latestPostBlock, latestPost);
    addCategories(categoriesBlock, categories);
    addTagsBlock(tagsBlock, tags);
    parent.appendChild(informationBlock);
  }

  function addCategories(parent, data) {
    const {title, topics} = data;
    const sectionTitle = createElement('h3', 'categories__title');
    sectionTitle.textContent = `${title}`;
    parent.appendChild(sectionTitle);
    const categoriesWrapper = createWrapper(parent, 'categories__wrapper');
    topics.forEach((topic) => createTopic(categoriesWrapper, topic));
  }

  function createTopic(parent, data) {
    const {id, title, subtopic} = data;
    const wrapper = createWrapper(parent, 'categories__topic');
    const input = createInput('categories__toggle', 'checkbox', id);
    const topicName = createElement('label', 'categories__topic-name');
    topicName.setAttribute('for', `${id}`);
    topicName.textContent = `${title} (${subtopic.length})`;
    wrapper.appendChild(input);
    wrapper.appendChild(topicName);
    const list = createElement('ul', 'categories__sublist');
    subtopic.forEach((item) => addSubTopic(list, item));
    wrapper.appendChild(list);
  }

  function addSubTopic(parent, data) {
    const {source, name} = data;
    const item = createElement('li', 'categories__subtopic');
    const link = createElement('a', 'categories__subtopic-link');
    link.setAttribute('href', `${source}`);
    link.textContent = `${name}`;
    item.appendChild(link);
    parent.appendChild(item);
  }

  function createInput(className, tagType, tagId) {
    const input = createElement('input', `${className}`);
    input.setAttribute('type', `${tagType}`);
    input.setAttribute('id', `${tagId}`);
    return input;
  }

  function addLatestPost(parent, data) {
    const {title, button, cardsPost} = data;
    const titleBlock = createElement('h3', 'latest-post__title');
    const buttonBlock = createElement('button', 'btn');
    addClassName(buttonBlock, 'btn__secondary');
    titleBlock.textContent = `${title}`;
    buttonBlock.textContent = `${button}`;
    parent.appendChild(titleBlock);
    cardsPost.forEach((card) => createCard(parent, card));
    parent.appendChild(buttonBlock);
  }

  function createCard(parent, data) {
    const {intro, image, postInfo} = data;
    const {source, alt} = image;
    const card = createWrapper(parent, 'latest-post__card');
    const imageCard = createElement('img', 'latest-post__image');
    const postInfoBlock = createWrapper(card, 'latest-post__info');
    const postIntro = createElement('p', 'latest-post__intro');
    postIntro.textContent = `${intro}`;
    imageCard.setAttribute('src', `./img/${source}`);
    imageCard.setAttribute('alt', `${alt}`);
    card.appendChild(imageCard);
    postInfoBlock.appendChild(postIntro);
    createPostInfoList(postInfoBlock, postInfo);
    card.appendChild(postInfoBlock);
    parent.appendChild(card);
  }

  function createPostInfoList(parent, data) {
    const items = data;
    const list = createElement('ul', 'post-info');
    items.forEach((item) => addListItem(list, item));
    parent.appendChild(list);
  }

  function addListItem(parent, infoPost) {
    const {extraClassName, className, content} = infoPost;
    const item = createElement('li', `${className}`);
    if (content) {
      item.textContent = `${content}`;
    }
    if (extraClassName) {
      addClassName(item, `${extraClassName}`);
    }
    parent.appendChild(item);
  }

  function createWrapper(parent, className) {
    const wrapper = doc.createElement('div');
    wrapper.className = `${className}`;
    parent.appendChild(wrapper);
    return wrapper;
  }

  function createElement(tagName, className) {
    const nameElement = doc.createElement(`${tagName}`);
    nameElement.className = `${className}`;
    return nameElement;
  }

  function addClassName(tag, className) {
    return tag.classList.add(className);
  }
}
