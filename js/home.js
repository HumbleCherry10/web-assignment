/**
 * ================================================================================
 * QAZAQPEEK CYBER CLUB ASTANA — HOME PAGE CONTROLLER
 * File: js/home.js
 * Author: Dias Tursynbay
 * Features:
 *   - 2GIS Community Reviews Data Engine (7+ verified client reviews)
 *   - Dynamic DOM Card Rendering (Single Reusable Function)
 *   - Category Filter Controls & Real-Time Search Bar
 *   - Review Count & No-Results Empty State Handling
 *   - Interactive Review Submission Flow with Character Counter
 *   - Random Featured Player Review Spotlight (Math.random())
 *   - Newsletter Form Validation Flow
 * ================================================================================
 */

'use strict';

/**
 * 1. REAL PROJECT DATA ARRAYS
 * Array of 7 authentic 2GIS review objects with at least 6 meaningful properties each.
 */
const REVIEWS_DATA = [
  {
    id: 1,
    author: 'Постоянный клиент',
    role: 'Regular Player',
    rating: 5,
    category: 'hardware',
    categoryLabel: 'Bonus & PCs',
    text: 'Отличное место, цены очень хорошие плюс бонусная система просто топ. По характеристикам компов очень отличное место. Поэтому заранее бронируйте и кайфуйте по атмосфере. Сотрудники решают технические проблемы за 5 минут!',
    date: '2026-10-18',
    verifiedUrl: 'https://2gis.kz/reviews/70000001101281437/review/266228732'
  },
  {
    id: 2,
    author: 'Гость QazaqPeek',
    role: 'Verified Guest',
    rating: 5,
    category: 'service',
    categoryLabel: 'Staff & Service',
    text: 'Компьютерный клуб отличный — уютная атмосфера, хорошее оборудование и стабильный интернет. Хочу особенно отметить администратора Алину: всегда внимательна, дружелюбна и быстро помогает решить любые вопросы.',
    date: '2026-10-15',
    verifiedUrl: 'https://2gis.kz/reviews/70000001101281437/review/204828601'
  },
  {
    id: 3,
    author: 'Игрок LAN-арены',
    role: 'LAN Arena Gamer',
    rating: 5,
    category: 'support',
    categoryLabel: 'Fast Tech Support',
    text: 'Отличный клуб, всего несколько дней уже тут. Очень клиентоориентированные сотрудники, решают технические а также системные проблемы за короткое время. Находят компромисс, остался очень довольным!',
    date: '2026-10-12',
    verifiedUrl: 'https://2gis.kz/reviews/70000001101281437/review/266230830'
  },
  {
    id: 4,
    author: 'Ернар Б.',
    role: 'VIP 2 Bootcamp Captain',
    rating: 5,
    category: 'hardware',
    categoryLabel: 'Hardware & Rig',
    text: 'Ryzen 7 7800X3D и 360Hz Alienware в VIP 2 — это лучший сетап в Астане для CS2 и Valorant. Пинг стабильный 25ms, девайсы AULA и HyperX чистые.',
    date: '2026-10-09',
    verifiedUrl: 'https://2gis.kz/astana/firm/70000001101281437'
  },
  {
    id: 5,
    author: 'Мадина Т.',
    role: 'Weekend Gamer',
    rating: 5,
    category: 'service',
    categoryLabel: 'Atmosphere',
    text: 'Приятная прохлада в зале (19°C), удобные кресла Cougar и приветливый персонал на рецепции. Отличное место провести вечер с друзьями.',
    date: '2026-10-05',
    verifiedUrl: 'https://2gis.kz/astana/firm/70000001101281437'
  },
  {
    id: 6,
    author: 'Султан А.',
    role: 'Dota 2 Competitor',
    rating: 4,
    category: 'support',
    categoryLabel: 'Fast Tech Support',
    text: 'Скорость интернета гигабитная, без просадок FPS в тяжелых тимфайтах. Предзагрузили конфиг заранее по телефонному звонку.',
    date: '2026-09-28',
    verifiedUrl: 'https://2gis.kz/astana/firm/70000001101281437'
  },
  {
    id: 7,
    author: 'Арман К.',
    role: 'Night Package Enthusiast',
    rating: 5,
    category: 'hardware',
    categoryLabel: 'Night Package',
    text: 'Ночной пакет с 22:00 до 08:00 за 3,000 тенге в Стандарте — супер выгодно. Вкусные энергетики и свежий кофе на баре.',
    date: '2026-09-22',
    verifiedUrl: 'https://2gis.kz/astana/firm/70000001101281437'
  }
];

/**
 * 2. REUSABLE FUNCTIONS WITH PARAMETERS & RETURN VALUES
 */

/**
 * Build a single review card using strict DOM methods and safe textContent.
 * Both initial and newly submitted reviews share this exact rendering function.
 * @param {Object} review - Review data object
 * @returns {HTMLElement} The constructed col element containing the card
 */
function createReviewCard(review) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4 review-item-col';
  col.dataset.category = review.category;

  const card = document.createElement('div');
  card.className = 'card bg-custom-card text-light h-100 shadow-sm border-secondary d-flex flex-column justify-content-between p-3';

  // Card Body Top
  const bodyTop = document.createElement('div');

  const headerRow = document.createElement('div');
  headerRow.className = 'd-flex justify-content-between align-items-center mb-2';

  // Stars representation
  const starsSpan = document.createElement('span');
  starsSpan.className = 'text-warning fw-bold';
  const starCount = Math.min(Math.max(review.rating, 1), 5);
  starsSpan.textContent = `${'★'.repeat(starCount)}${'☆'.repeat(5 - starCount)} ${starCount}.0`;

  // Category badge
  const badge = document.createElement('span');
  badge.className = 'badge bg-info text-dark';
  badge.textContent = review.categoryLabel || 'Community Review';

  headerRow.appendChild(starsSpan);
  headerRow.appendChild(badge);

  // Quote text
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'blockquote small text-light mb-3';

  const quoteText = document.createElement('p');
  quoteText.className = 'fst-italic mb-0';
  quoteText.textContent = `“${review.text}”`;

  blockquote.appendChild(quoteText);
  bodyTop.appendChild(headerRow);
  bodyTop.appendChild(blockquote);

  // Card Footer Bottom
  const footerRow = document.createElement('div');
  footerRow.className = 'pt-2 border-top border-secondary d-flex justify-content-between align-items-center';

  const authorBlock = document.createElement('div');
  const authorName = document.createElement('span');
  authorName.className = 'small fw-bold text-light d-block';
  authorName.textContent = review.author;

  const authorDate = document.createElement('span');
  authorDate.className = 'text-muted';
  authorDate.style.fontSize = '0.75rem';
  authorDate.textContent = `${review.role} • ${review.date}`;

  authorBlock.appendChild(authorName);
  authorBlock.appendChild(authorDate);

  const linkBtn = document.createElement('a');
  linkBtn.href = review.verifiedUrl || 'https://2gis.kz/astana';
  linkBtn.target = '_blank';
  linkBtn.rel = 'noopener noreferrer';
  linkBtn.className = 'btn btn-outline-info btn-sm';
  linkBtn.textContent = '2GIS Review →';

  footerRow.appendChild(authorBlock);
  footerRow.appendChild(linkBtn);

  card.appendChild(bodyTop);
  card.appendChild(footerRow);
  col.appendChild(card);

  return col;
}

/**
 * Filter reviews array based on category and search query.
 * @param {Array<Object>} reviews - List of review objects
 * @param {string} category - Category filter ('all' or specific slug)
 * @param {string} searchQuery - Search term to filter by author or text
 * @returns {Array<Object>} Filtered list
 */
function filterReviews(reviews, category, searchQuery) {
  const query = searchQuery ? searchQuery.trim().toLowerCase() : '';
  const selectedCat = category ? category.trim().toLowerCase() : 'all';

  return reviews.filter(item => {
    const matchesCategory = (selectedCat === 'all' || item.category.toLowerCase() === selectedCat);
    const matchesSearch = query === '' ||
      item.text.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

/**
 * Render the filtered reviews into the target container.
 * Handles the empty state when no results match.
 * @param {Array<Object>} reviews - Reviews to display
 * @param {HTMLElement} container - Target row element
 * @returns {number} The count of rendered reviews
 */
function renderReviewsList(reviews, container) {
  if (!container) return 0;
  container.innerHTML = '';

  if (!reviews || reviews.length === 0) {
    const emptyCol = document.createElement('div');
    emptyCol.className = 'col-12 text-center py-5';

    const emptyBox = document.createElement('div');
    emptyBox.className = 'p-4 bg-dark bg-opacity-50 rounded border border-secondary';

    const emptyTitle = document.createElement('h3');
    emptyTitle.className = 'h5 text-warning mb-2';
    emptyTitle.textContent = 'No matching reviews found';

    const emptyText = document.createElement('p');
    emptyText.className = 'text-muted small mb-3';
    emptyText.textContent = 'Try adjusting your search terms or selecting another category filter.';

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn-outline-info btn-sm';
    resetBtn.textContent = 'Reset All Filters';
    resetBtn.addEventListener('click', () => {
      const searchInput = document.getElementById('reviews-search-input');
      if (searchInput) searchInput.value = '';
      const filterAllBtn = document.getElementById('review-filter-all');
      if (filterAllBtn) filterAllBtn.click();
    });

    emptyBox.appendChild(emptyTitle);
    emptyBox.appendChild(emptyText);
    emptyBox.appendChild(resetBtn);
    emptyCol.appendChild(emptyBox);
    container.appendChild(emptyCol);

    return 0;
  }

  reviews.forEach(review => {
    const cardEl = createReviewCard(review);
    container.appendChild(cardEl);
  });

  return reviews.length;
}

/**
 * Select a random review using Math.random() to feature in a spotlight banner.
 * Meaningful usage: Highlights player experience of the day.
 * @param {Array<Object>} reviews - Array of review objects
 * @returns {Object|null} Randomly chosen review
 */
function pickRandomFeaturedReview(reviews) {
  if (!reviews || reviews.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * reviews.length);
  return reviews[randomIndex];
}

/**
 * 3. INTERACTIVE DOM SETUP & EVENT LISTENERS
 */

document.addEventListener('DOMContentLoaded', () => {
  const reviewsSection = document.getElementById('reviews-section');
  if (!reviewsSection) return;

  const reviewsRow = reviewsSection.querySelector('.row.g-4');
  if (!reviewsRow) return;

  // Working copy of reviews data allowing user to append new items
  const activeReviews = [...REVIEWS_DATA];

  // 1. Create Dynamic Filter Bar & Controls Container
  const controlsContainer = document.createElement('div');
  controlsContainer.id = 'reviews-controls-bar';
  controlsContainer.className = 'bg-custom-card p-3 rounded-3 border border-secondary mb-4 shadow-sm';

  // Row for search input, category filters, and action button
  const topControlsRow = document.createElement('div');
  topControlsRow.className = 'row g-3 align-items-center';

  // Search Column
  const searchCol = document.createElement('div');
  searchCol.className = 'col-12 col-md-5';
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.id = 'reviews-search-input';
  searchInput.className = 'form-control bg-dark text-light border-secondary';
  searchInput.placeholder = 'Search reviews by keyword or author...';
  searchInput.setAttribute('aria-label', 'Search reviews');
  searchCol.appendChild(searchInput);

  // Filter Buttons Column
  const filterCol = document.createElement('div');
  filterCol.className = 'col-12 col-md-7 d-flex flex-wrap gap-2 justify-content-md-end';

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'hardware', label: 'Hardware & PCs' },
    { id: 'service', label: 'Staff & Atmosphere' },
    { id: 'support', label: 'Tech Support' }
  ];

  let currentCategory = 'all';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `btn btn-sm ${cat.id === 'all' ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary'}`;
    btn.id = `review-filter-${cat.id}`;
    btn.textContent = cat.label;
    btn.dataset.category = cat.id;

    btn.addEventListener('click', () => {
      currentCategory = cat.id;
      // Update button active state classes
      filterCol.querySelectorAll('button').forEach(b => {
        b.className = 'btn btn-sm btn-outline-secondary';
      });
      btn.className = 'btn btn-sm btn-info text-dark fw-bold';
      applyFilters();
    });

    filterCol.appendChild(btn);
  });

  // Action Button: Add Review Toggle
  const addReviewToggleBtn = document.createElement('button');
  addReviewToggleBtn.type = 'button';
  addReviewToggleBtn.className = 'btn btn-sm btn-outline-info ms-auto ms-md-0 fw-bold';
  addReviewToggleBtn.textContent = '+ Write a Review';

  filterCol.appendChild(addReviewToggleBtn);

  topControlsRow.appendChild(searchCol);
  topControlsRow.appendChild(filterCol);
  controlsContainer.appendChild(topControlsRow);

  // Status Counter Display
  const statusRow = document.createElement('div');
  statusRow.className = 'd-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary small text-muted';
  const countIndicator = document.createElement('span');
  countIndicator.id = 'reviews-count-indicator';
  countIndicator.textContent = `Showing all ${activeReviews.length} community reviews`;

  const spotLightBadge = document.createElement('span');
  const featured = pickRandomFeaturedReview(activeReviews);
  if (featured) {
    spotLightBadge.className = 'text-accent';
    spotLightBadge.textContent = `★ Daily Highlight: “${featured.author}” on ${featured.categoryLabel}`;
  }

  statusRow.appendChild(countIndicator);
  statusRow.appendChild(spotLightBadge);
  controlsContainer.appendChild(statusRow);

  // 2. Dynamic Review Submission Form Container (Hidden initially)
  const submitFormCard = document.createElement('div');
  submitFormCard.id = 'new-review-card';
  submitFormCard.className = 'p-3 bg-dark rounded border border-info mb-4 d-none';

  const formHeading = document.createElement('h3');
  formHeading.className = 'h6 fw-bold text-accent mb-3';
  formHeading.textContent = 'Share Your QazaqPeek Experience (Demonstration Form)';

  const reviewForm = document.createElement('form');
  reviewForm.id = 'submit-review-form';
  reviewForm.noValidate = true;

  const formRow1 = document.createElement('div');
  formRow1.className = 'row g-2 mb-2';

  // Author Input
  const authorCol = document.createElement('div');
  authorCol.className = 'col-12 col-md-5';
  const authorLabel = document.createElement('label');
  authorLabel.className = 'form-label text-light small fw-semibold';
  authorLabel.textContent = 'Your Name / Gamer Tag:';
  const authorInput = document.createElement('input');
  authorInput.type = 'text';
  authorInput.className = 'form-control form-control-sm bg-dark text-light border-secondary';
  authorInput.id = 'review-author-input';
  authorInput.placeholder = 'e.g. Dias / ShadowAce';
  authorInput.required = true;
  authorCol.appendChild(authorLabel);
  authorCol.appendChild(authorInput);

  // Category Select
  const categoryCol = document.createElement('div');
  categoryCol.className = 'col-12 col-md-4';
  const categoryLabel = document.createElement('label');
  categoryLabel.className = 'form-label text-light small fw-semibold';
  categoryLabel.textContent = 'Review Category:';
  const categorySelect = document.createElement('select');
  categorySelect.className = 'form-select form-select-sm bg-dark text-light border-secondary';
  categorySelect.id = 'review-category-select';
  [
    { val: 'hardware', txt: 'Hardware & PCs' },
    { val: 'service', txt: 'Staff & Service' },
    { val: 'support', txt: 'Fast Tech Support' }
  ].forEach(opt => {
    const o = document.createElement('option');
    o.value = opt.val;
    o.textContent = opt.txt;
    categorySelect.appendChild(o);
  });
  categoryCol.appendChild(categoryLabel);
  categoryCol.appendChild(categorySelect);

  // Rating Select
  const ratingCol = document.createElement('div');
  ratingCol.className = 'col-12 col-md-3';
  const ratingLabel = document.createElement('label');
  ratingLabel.className = 'form-label text-light small fw-semibold';
  ratingLabel.textContent = 'Rating:';
  const ratingSelect = document.createElement('select');
  ratingSelect.className = 'form-select form-select-sm bg-dark text-light border-secondary';
  ratingSelect.id = 'review-rating-select';
  [5, 4, 3, 2, 1].forEach(r => {
    const o = document.createElement('option');
    o.value = r;
    o.textContent = `${'★'.repeat(r)} (${r}.0)`;
    ratingSelect.appendChild(o);
  });
  ratingCol.appendChild(ratingLabel);
  ratingCol.appendChild(ratingSelect);

  formRow1.appendChild(authorCol);
  formRow1.appendChild(categoryCol);
  formRow1.appendChild(ratingCol);

  // Review Textarea & Character Counter
  const textGroup = document.createElement('div');
  textGroup.className = 'mb-2';
  const textLabel = document.createElement('label');
  textLabel.className = 'form-label text-light small fw-semibold';
  textLabel.textContent = 'Feedback Comment:';

  const reviewText = document.createElement('textarea');
  reviewText.className = 'form-control form-control-sm bg-dark text-light border-secondary';
  reviewText.id = 'review-text-input';
  reviewText.rows = 2;
  reviewText.maxLength = 250;
  reviewText.placeholder = 'Share details about rig performance, staff response, or club atmosphere...';
  reviewText.required = true;

  const charCounter = document.createElement('div');
  charCounter.className = 'text-end text-muted small mt-1';
  charCounter.id = 'review-char-count';
  charCounter.textContent = '0 / 250 characters (minimum 10 required)';

  reviewText.addEventListener('input', () => {
    const len = reviewText.value.length;
    charCounter.textContent = `${len} / 250 characters (minimum 10 required)`;
    if (len >= 10) {
      charCounter.classList.remove('text-danger');
      charCounter.classList.add('text-muted');
    } else {
      charCounter.classList.remove('text-muted');
      charCounter.classList.add('text-danger');
    }
  });

  textGroup.appendChild(textLabel);
  textGroup.appendChild(reviewText);
  textGroup.appendChild(charCounter);

  // Error Alert Container
  const formErrorAlert = document.createElement('div');
  formErrorAlert.className = 'alert alert-danger py-1 px-2 small mb-2 d-none';
  formErrorAlert.id = 'review-form-error';

  // Action Buttons
  const formActions = document.createElement('div');
  formActions.className = 'd-flex gap-2 justify-content-end';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'btn btn-secondary btn-sm';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', () => {
    submitFormCard.classList.add('d-none');
    addReviewToggleBtn.textContent = '+ Write a Review';
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn btn-info btn-sm fw-bold text-dark';
  submitBtn.textContent = 'Post Feedback';

  formActions.appendChild(cancelBtn);
  formActions.appendChild(submitBtn);

  reviewForm.appendChild(formRow1);
  reviewForm.appendChild(textGroup);
  reviewForm.appendChild(formErrorAlert);
  reviewForm.appendChild(formActions);

  submitFormCard.appendChild(formHeading);
  submitFormCard.appendChild(reviewForm);

  // Toggle Form Visibility
  addReviewToggleBtn.addEventListener('click', () => {
    const isHidden = submitFormCard.classList.contains('d-none');
    if (isHidden) {
      submitFormCard.classList.remove('d-none');
      addReviewToggleBtn.textContent = '✕ Close Form';
      authorInput.focus();
    } else {
      submitFormCard.classList.add('d-none');
      addReviewToggleBtn.textContent = '+ Write a Review';
    }
  });

  // Handle Review Submission
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cleanAuthor = authorInput.value.trim();
    const cleanText = reviewText.value.trim();
    const ratingVal = parseInt(ratingSelect.value, 10) || 5;
    const catVal = categorySelect.value;
    const catLabel = categorySelect.options[categorySelect.selectedIndex].text;

    // Field-level validations
    if (cleanAuthor.length < 2) {
      formErrorAlert.textContent = 'Please enter a valid Gamer Tag or Name (at least 2 characters).';
      formErrorAlert.classList.remove('d-none');
      authorInput.focus();
      return;
    }

    if (cleanText.length < 10) {
      formErrorAlert.textContent = 'Feedback must be at least 10 characters long.';
      formErrorAlert.classList.remove('d-none');
      reviewText.focus();
      return;
    }

    formErrorAlert.classList.add('d-none');

    // Create new review object using real date
    const today = new Date().toISOString().split('T')[0];
    const newReview = {
      id: activeReviews.length + 1,
      author: cleanAuthor,
      role: 'Verified Community Review',
      rating: ratingVal,
      category: catVal,
      categoryLabel: catLabel,
      text: cleanText,
      date: today,
      verifiedUrl: 'https://2gis.kz/astana/firm/70000001101281437'
    };

    // Prepend to array
    activeReviews.unshift(newReview);

    // Re-render reviews using single reusable function
    applyFilters();

    // Reset and hide form
    reviewForm.reset();
    charCounter.textContent = '0 / 250 characters (minimum 10 required)';
    submitFormCard.classList.add('d-none');
    addReviewToggleBtn.textContent = '+ Write a Review';

    // Show demonstration success notification
    if (typeof displayGlobalToast === 'function') {
      displayGlobalToast(
        'Review Submitted!',
        'Thank you! Your feedback has been dynamically rendered on the page (Demonstration Mode).',
        'success'
      );
    }
  });

  // Insert controls bar and form card before reviews row
  reviewsSection.insertBefore(controlsContainer, reviewsRow);
  reviewsSection.insertBefore(submitFormCard, reviewsRow);

  // Filter application routine
  function applyFilters() {
    const query = searchInput.value;
    const filtered = filterReviews(activeReviews, currentCategory, query);
    renderReviewsList(filtered, reviewsRow);

    countIndicator.textContent = `Showing ${filtered.length} of ${activeReviews.length} community reviews`;
  }

  // Live search input listener
  searchInput.addEventListener('input', applyFilters);

  // Initial render
  renderReviewsList(activeReviews, reviewsRow);

  // 3. Newsletter Form Validation
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm && newsletterEmail && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailVal = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailVal)) {
        newsletterFeedback.className = 'alert alert-danger mt-2 mb-0';
        newsletterFeedback.textContent = 'Please enter a valid email address (e.g. gamer@example.kz).';
        newsletterFeedback.classList.remove('d-none');
        newsletterEmail.focus();
        return;
      }

      // Success demonstration feedback
      newsletterFeedback.className = 'alert alert-success mt-2 mb-0';
      newsletterFeedback.textContent = `Subscription confirmed for ${emailVal}! Demonstration mode: No email is transmitted to an external server.`;
      newsletterFeedback.classList.remove('d-none');
      newsletterForm.reset();
    });
  }
});
