// eslint-disable-next-line max-lines
let data;
fetch('https://api.myjson.com/bins/9voz0')
  .then((response) => response.json())
  .then((obj) => {
    renderHTML(obj);
  });

const doc = document;

// eslint-disable-next-line max-statements
function renderHTML(jsonData) {
  data = jsonData.index;
  const MAIN = doc.getElementById('main');
  const {header, about, posts, portfolio, testimonials, contact} = data;

  const homeSection = doc.querySelector('#home .container');
  const homeContentWrapper = createWrapper(homeSection, 'header__heading');
  createHeaderContent(homeContentWrapper, header);
  createAboutSection(MAIN, about);
  createBlogSection(MAIN, posts);
  createSectionPortfolio(MAIN, portfolio);

  const testimonialsSection = createSection(MAIN, 'testimonials');
  const containerTestimonial = createContainer(testimonialsSection);
  addSectionContent(containerTestimonial, testimonials);
  addTestimonialsSlider(containerTestimonial, testimonials);

  const contactSection = createSection(MAIN, 'contact', 'contact');
  const contactContainer = createContainer(contactSection);
  addSectionContent(contactContainer, contact);
  createIconsContainer(contactContainer, contact);

  const formSection = createSection(MAIN, 'form-container');
  const formContainer = createContainer(formSection);
  const sender = createWrapper(formContainer, 'sender');
  createSender(sender, contact);
  createFormWrapper(sender, contact);

  function createHeaderContent(parent, data) {
    const {title, intro, buttonPrimary, buttonSecondary} = data;
    const headerTitle = createElement('h2', 'header__title');
    const headerIntro = createElement('p', 'header__intro');
    addTextContent(parent, headerTitle, `${title}`);
    addTextContent(parent, headerIntro, `${intro}`);
    const explore = createButton(parent, 'btn', 'btn__primary');
    explore.textContent = `${buttonPrimary}`;
    const learnMoreButton = createButton(parent, 'btn', 'btn__secondary');
    learnMoreButton.textContent = `${buttonSecondary}`;
  }

  function addTextContent(parent, targetTag, content) {
    targetTag.textContent = `${content}`;
    parent.appendChild(targetTag);
  }

  function createFormWrapper(parent, data) {
    const formConfirmationWrapper = createWrapper(parent, 'form-confirmation');
    const contentWrapper = createWrapper(formConfirmationWrapper, 'form-confirmation__content-wrapper');
    const intro = createElement('p', 'form-confirmation__intro');
    contentWrapper.appendChild(intro);
    intro.innerHTML = `Write us a few words about your project and we will prepare proposal for you within
       <span class="form-confirmation__intro form-confirmation__intro--bold">24 hours</span>`;
    const formWrapper = createWrapper(contentWrapper, 'form-confirmation__wrapper');
    createForm(formWrapper, data);
    createWrapper(formWrapper, 'form-confirmation__map-wrapper');
    parent.appendChild(formConfirmationWrapper);
  }

  function createForm(parent, data) {
    const {content} = data.sender.button;
    const form = createElement('form', 'form-confirmation__form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'POST');
    setFormContent(form);
    const buttonForm = createButton(form, 'btn', 'btn__primary');
    buttonForm.classList.add('btn__primary--wide');
    buttonForm.setAttribute('type', 'submit');
    buttonForm.textContent = `${content}`;
    setFormInfo(form);
    parent.appendChild(form);
  }

  function setFormInfo(parent) {
    const info = createElement('p', 'form-confirmation__info');
    info.innerHTML = `
    If you need to have a DNA first, just contact us at
    <a href="mailto:email@gmail.com" class="form-confirmation__info form-confirmation__info--mail">
    email@gmail.com</a>`;
    parent.appendChild(info);
  }

  function setFormContent(parent) {
    parent.innerHTML = `
    <label for="user-name" class="form-confirmation__user-name">Your name</label>
    <input type="text" name="user-name" id="user-name" class="form-confirmation__name-field"/>
    <label for="mail" class="form-confirmation__address">Email</label>
    <input type="email" name="mail" id="mail" class="form-confirmation__mail-field"/>
    <label for="password" class="form-confirmation__user-password">Password
     <span class="form-confirmation__user-password-show">show</span>
     <span class="form-confirmation__user-password-hide">hide</span>
    </label>
    <input type="password" name="password" id="password" class="form-confirmation__password-field"/>
    `;
  }

  function createSender(parent, data) {
    const {title, steps} = data.sender;
    const container = createWrapper(parent, 'sender__content');
    const senderTitle = createElement('h4', 'sender__steps-title');
    const stepsList = createElement('ol', 'steps');
    steps.forEach((item) => createStep(stepsList, item));
    addTextContent(container, senderTitle, `${title}`);
    container.appendChild(stepsList);
    parent.appendChild(container);
  }

  function createStep(parent, data) {
    const {title, content} = data;
    const step = createElement('li', 'steps__step');
    const stepTitle = createElement('p', 'steps__step-title');
    const stepContent = createElement('p', 'steps__content');
    addTextContent(step, stepTitle, `${title}`);
    addTextContent(step, stepContent, `${content}`);
    parent.appendChild(step);
  }

  function createIconsContainer(parent, data) {
    const {icons} = data;
    const iconsList = createElement('ul', 'icons');
    icons.forEach((icon) => addIcons(iconsList, icon));
    parent.appendChild(iconsList);
  }

  function addIcons(parent, data) {
    const {link, icon} = data;
    const item = createElement('li', 'icons__item');
    const linkItem = createElement('a', 'icons__link');
    const iconItem = createElement('span', 'icon');
    addClassName(iconItem, `icon--${icon}`);
    linkItem.setAttribute('href', `${link}`);
    linkItem.appendChild(iconItem);
    item.appendChild(linkItem);
    parent.appendChild(item);
  }

  function addTestimonialsSlider(parent, data) {
    const slider = createWrapper(parent, 'testimonials__slider');
    const inner = createWrapper(slider, 'testimonials__inner');
    createTestimonialCard(inner, data);
    createButton(inner, 'arrow', 'arrow--prev');
    createButton(inner, 'arrow', 'arrow--next');
  }

  function createTestimonialCard(parent, data) {
    const {cards} = data;
    const wrapper = createWrapper(parent, 'testimonial-card');
    const textWrapper = createWrapper(wrapper, 'testimonial-card__text-wrapper');
    cards.forEach((userTestimonial) => createTestimonialAuthor(textWrapper, userTestimonial));
    createWrapper(wrapper, 'testimonial-card__photo');
  }

  function createTestimonialAuthor(parent, data) {
    const {userName, userPosition} = data;
    createBlockquote(parent, data);
    const name = createElement('p', 'testimonial-card__author-name');
    const position = createElement('p', 'testimonial-card__author-position');
    addTextContent(parent, name, `${userName}`);
    addTextContent(parent, position, `${userPosition}`);
  }

  function addSectionContent(parent, data) {
    addHeading(parent, data);
  }

  function createAboutSection(parent, data) {
    const about = createElement('section', 'about-us');
    about.id = 'about-us';
    const container = createContainer(about);
    parent.appendChild(about);
    addAboutUsContent(container, data);
  }

  function createSectionPortfolio(parent, data) {
    const portfolioSection = createElement('section', 'portfolio');
    portfolioSection.id = 'portfolio';
    const portfolioContainer = createContainer(portfolioSection);
    addHeading(portfolioContainer, data);
    createSlider(portfolioContainer, data);
    parent.appendChild(portfolioSection);
  }

  function createSection(parent, sectionName, id) {
    const section = createElement('section', `${sectionName}`);
    if (id) {
      section.id = `${id}`;
    }
    parent.appendChild(section);
    return section;
  }

  function createSlider(parent, data) {
    const {cards} = data;
    const slider = createWrapper(parent, 'portfolio-card-slider');
    const articles = cards;
    const {buttonText} = data;
    const wrapperCards = createWrapper(slider, 'portfolio-cards-wrapper');
    for (let i = 0; i < articles.length; i++) {
      const item = createSliderCard(wrapperCards, articles[i]);
      if (articles[i] === articles[0]) {
        item.classList.add('portfolio-card--active');
      }
    }
    const wrapper = createWrapper(slider, 'portfolio__controls');
    const allWorksWrapper = createWrapper(slider, 'portfolio__all-works');
    const seeAllWorksButton = createButton(allWorksWrapper, 'btn', 'btn__secondary');
    addContent(seeAllWorksButton, `${buttonText}`);
    createButton(wrapper, 'arrow', 'arrow--prev');
    createButton(wrapper, 'arrow', 'arrow--next');
  }

  function createWrapper(parent, className) {
    const wrapper = createElement('div', `${className}`);
    parent.appendChild(wrapper);
    return wrapper;
  }

  function addContent(parent, content) {
    parent.textContent = `${content}`;
  }

  function createButton(parent, className, extraClassName) {
    const button = createElement('button', `${className}`);
    button.classList.add(`${extraClassName}`);
    parent.appendChild(button);
    return button;
  }

  function createBlockquote(parent, data) {
    const {quote} = data;
    const quoteBox = createElement('blockquote', 'testimonial-card__quote');
    const quotes = createElement('span', 'testimonial-card__quote');
    quotes.classList.add('testimonial-card__quote--bold');
    addTextContent(quoteBox, quotes, '"');
    addTextContent(parent, quoteBox, `${quote}`);
  }

  function createSliderCard(parent, data) {
    const {image} = data;
    const item = createElement('article', 'portfolio-card');
    const itemContentWrapper = createWrapper(item, 'portfolio-card__wrapper');
    createImage(itemContentWrapper, image);
    createSliderCardContent(itemContentWrapper, data);
    parent.appendChild(item);
    return item;
  }

  function createSliderCardContent(parent, data) {
    const {source, title, genre} = data;
    const content = createWrapper(parent, 'portfolio-card__content-wrapper');
    const header = createElement('a', 'portfolio-card__title');
    const cardGenre = createElement('p', 'portfolio-card__genre');
    header.setAttribute('href', `${source}`);
    addTextContent(content, header, `${title}`);
    addTextContent(content, cardGenre, `${genre}`);
  }

  function createBlogSection(parent, data) {
    const postsContainer = createElement('section', 'posts');
    postsContainer.id = 'blog';
    parent.appendChild(postsContainer);
    const container = createContainer(postsContainer);
    addHeading(container, data);
    createPostContent(container, data);
  }

  function createPostContent(parent, data) {
    const {postCards} = data;
    const postWrapper = createWrapper(parent, 'posts-wrapper');
    postCards.forEach((post) => createPost(postWrapper, post));
  }

  function createPost(parent, data) {
    const {image, title, content, postInfo} = data;
    const post = createElement('article', 'post');
    const titlePost = createElement('a', 'post__title');
    const textPost = createElement('p', 'post__text');
    titlePost.setAttribute('src', '#');
    createImage(post, image);
    addTextContent(post, titlePost, title);
    addTextContent(post, textPost, content);
    createPostInfo(post, postInfo);
    parent.appendChild(post);
  }

  function createPostInfo(parent, data) {
    const postItemInfo = data;
    const postList = createElement('ul', 'post-info');
    postItemInfo.forEach((info) => {
      createPostData(postList, info);
    });
    parent.appendChild(postList);
  }

  function createPostData(parent, data) {
    const {className, content} = data;
    const item = createElement('li', `${className}`);
    addTextContent(parent, item, content);
  }

  function createImage(parent, data) {
    const {className, source, alt} = data;
    const imagePost = createElement('img', `${className}`);
    imagePost.setAttribute('src', `./img/${source}`);
    imagePost.setAttribute('alt', `${alt}`);
    parent.appendChild(imagePost);
  }

  function createContainer(parent) {
    return createWrapper(parent, 'container');
  }

  function addAboutUsContent(parent, data) {
    const boxInfo = data;
    const row = addRow(parent);
    addHeading(row, boxInfo);
    const rowForBox = addRow(parent);
    createAboutUsContent(rowForBox, boxInfo);
  }

  function addRow(parent) {
    const row = returnRow();
    parent.appendChild(row);
    return row;
  }

  function returnRow() {
    return createElement('div', 'row');
  }

  function addHeading(parent, data) {
    return createHeading(parent, data);
  }

  function createAboutUsContent(parent, data) {
    const {boxes, media} = data;
    const wrapper = createWrapper(parent, 'about-us__box-wrapper');
    const boxesData = boxes;
    const videoData = media;
    boxesData.forEach((box) => createBox(wrapper, box));
    createVideoBox(parent, videoData);
  }

  function createBox(parent, data) {
    const {feature} = data;
    const box = createWrapper(parent, 'about-us__box');
    const boxWrapper = createWrapper(box, 'about-us__box-wrap');
    addClassName(boxWrapper, `about-us__box-wrap--${feature}`);
    createColorBoxContent(boxWrapper, data);
  }

  function createColorBoxContent(parent, info) {
    const {alt, content} = info;
    const image = createElement('img', 'icon');
    image.classList.add('icon--box');
    image.setAttribute('src', `./img/a-icon-${alt}.svg`);
    image.setAttribute('alt', `${alt}`);
    const text = createElement('p', 'about-us__box-text');
    parent.appendChild(image);
    addTextContent(parent, text, content);
  }

  function createVideoBox(parent, data) {
    const {image, content} = data;
    const videoContainer = createWrapper(parent, 'video');
    const video = createElement('video', 'video__player');
    video.setAttribute('poster', `./img/${image}.jpeg`);
    addTextContent(videoContainer, video, content);
  }

  function addClassName(tag, className) {
    return tag.classList.add(className);
  }

  function createHeading(parent, data) {
    const sectionHeader = createWrapper(parent, 'section-header');
    createHeadingContent(sectionHeader, data);
  }

  function createHeadingContent(parent, data) {
    const {title, subtitle} = data;
    const sectionTitle = createElement('h2', 'section-header__title');
    const sectionSubtitle = createElement('p', 'section-header__subtitle');
    const border = createBorderHeader();
    sectionTitle.textContent = title;
    sectionTitle.appendChild(border);
    parent.appendChild(sectionTitle);
    if (subtitle) {
      sectionSubtitle.textContent = subtitle;
      parent.appendChild(sectionSubtitle);
    }
  }

  function createBorderHeader() {
    return createElement('span', 'section-header__border');
  }

  function createElement(tagName, className) {
    const nameElement = doc.createElement(`${tagName}`);
    nameElement.className = `${className}`;
    return nameElement;
  }

}
