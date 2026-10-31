/**
 * QazaqPeek Cyber Club Astana - Home Page Controller
 * Author: Dias Tursynbay
 */

'use strict';

// 7 Authentic 2GIS player reviews
const REVIEWS_DATA = [
  {
    id: 1,
    author: 'Постоянный клиент',
    role: 'Regular Player',
    rating: 5,
    category: 'hardware',
    categoryLabel: 'Bonus & PCs',
    text: 'Отличное место, цены очень хорошие плюс бонусная система просто топ. По характеристикам компов очень отличное место. Поэтому заранее бронируйте и кайфуйте по атмосфере.',
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
    text: 'Компьютерный клуб отличный — уютная атмосфера, хорошее оборудование и стабильный интернет. Администратор всегда внимательна и быстро помогает решить любые вопросы.',
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
    text: 'Отличный клуб! Очень клиентоориентированные сотрудники, решают технические а также системные проблемы за короткое время. Остался очень довольным!',
    date: '2026-10-12',
    verifiedUrl: 'https://2gis.kz/reviews/70000001101281437/review/266230830'
  },
  {
    id: 4,
    author: 'Ернар Б.',
    role: 'VIP 2 Captain',
    rating: 5,
    category: 'hardware',
    categoryLabel: 'Hardware & Rig',
    text: 'Ryzen 7 7800X3D и 360Hz Alienware в VIP 2 — это лучший сетап в Астане для CS2 и Valorant. Пинг стабильный 25ms, девайсы AULA чистые.',
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
    role: 'Night Package Player',
    rating: 5,
    category: 'hardware',
    categoryLabel: 'Night Package',
    text: 'Ночной пакет с 22:00 до 08:00 за 3,000 тенге в Стандарте — супер выгодно. Вкусные энергетики и свежий кофе на баре.',
    date: '2026-09-22',
    verifiedUrl: 'https://2gis.kz/astana/firm/70000001101281437'
  }
];

// Reusable function: builds a single review card with safe textContent
function createReviewCard(review) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4 review-item-col';

  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  col.innerHTML = `
    <div class="card bg-custom-card text-light h-100 shadow-sm border-secondary d-flex flex-column justify-content-between p-3">
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="text-warning fw-bold">${stars} ${review.rating}.0</span>
          <span class="badge bg-info text-dark">${review.categoryLabel}</span>
        </div>
        <blockquote class="blockquote small text-light mb-3">
          <p class="fst-italic mb-0 review-text-content"></p>
        </blockquote>
      </div>
      <div class="pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
        <div>
          <span class="small fw-bold text-light d-block review-author-content"></span>
          <small class="text-muted">${review.role} • ${review.date}</small>
        </div>
        <a href="${review.verifiedUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-info btn-sm">2GIS →</a>
      </div>
    </div>
  `;

  // Safe textContent assignment prevents script injection
  col.querySelector('.review-text-content').textContent = `“${review.text}”`;
  col.querySelector('.review-author-content').textContent = review.author;

  return col;
}

// Filter reviews by category and keyword query
function filterReviews(reviews, category, searchQuery) {
  const q = searchQuery ? searchQuery.trim().toLowerCase() : '';
  const cat = category || 'all';

  return reviews.filter(item => {
    const matchCategory = cat === 'all' || item.category === cat;
    const matchQuery = q === '' ||
      item.text.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });
}

// Renders the review list into the container and shows empty state if empty
function renderReviewsList(reviews, container) {
  if (!container) return;
  container.innerHTML = '';

  if (reviews.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'col-12 text-center py-5';
    empty.innerHTML = `
      <div class="p-4 bg-dark rounded border border-secondary">
        <h3 class="h5 text-warning mb-2">No matching reviews found</h3>
        <p class="text-muted small mb-3">Try adjusting your search terms or category filter.</p>
        <button type="button" class="btn btn-outline-info btn-sm" id="btn-reset-reviews">Reset Filters</button>
      </div>
    `;
    empty.querySelector('#btn-reset-reviews').addEventListener('click', () => {
      const search = document.getElementById('reviews-search-input');
      if (search) search.value = '';
      const allBtn = document.getElementById('review-filter-all');
      if (allBtn) allBtn.click();
    });
    container.appendChild(empty);
    return;
  }

  reviews.forEach(r => container.appendChild(createReviewCard(r)));
}

// Math.random(): picks a random spotlight review of the day
function pickSpotlightReview(reviews) {
  if (!reviews || reviews.length === 0) return null;
  return reviews[Math.floor(Math.random() * reviews.length)];
}

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('reviews-section');
  if (!section) return;

  const row = section.querySelector('.row.g-4');
  if (!row) return;

  const activeReviews = [...REVIEWS_DATA];
  let currentCategory = 'all';

  // Build filter and search bar
  const controls = document.createElement('div');
  controls.className = 'bg-custom-card p-3 rounded border border-secondary mb-4 shadow-sm';
  controls.innerHTML = `
    <div class="row g-3 align-items-center">
      <div class="col-12 col-md-5">
        <input type="search" id="reviews-search-input" class="form-control bg-dark text-light border-secondary" placeholder="Search reviews by keyword...">
      </div>
      <div class="col-12 col-md-7 d-flex flex-wrap gap-2 justify-content-md-end" id="review-filter-btns">
        <button type="button" class="btn btn-sm btn-info text-dark fw-bold" id="review-filter-all" data-cat="all">All</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-cat="hardware">Hardware</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-cat="service">Service</button>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-cat="support">Support</button>
        <button type="button" class="btn btn-sm btn-outline-info ms-auto ms-md-0" id="btn-toggle-review-form">+ Write Review</button>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary small text-muted">
      <span id="reviews-count-indicator">Showing all ${activeReviews.length} community reviews</span>
      <span id="reviews-spotlight-text" class="text-accent"></span>
    </div>
  `;
  section.insertBefore(controls, row);

  // Review submission form container
  const formBox = document.createElement('div');
  formBox.className = 'p-3 bg-dark rounded border border-info mb-4 d-none';
  formBox.id = 'new-review-box';
  formBox.innerHTML = `
    <h3 class="h6 fw-bold text-accent mb-3">Share Your Feedback (Demonstration)</h3>
    <form id="submit-review-form" novalidate>
      <div class="row g-2 mb-2">
        <div class="col-12 col-md-5">
          <input type="text" class="form-control form-control-sm bg-dark text-light border-secondary" id="review-author" placeholder="Your Gamer Tag" required>
        </div>
        <div class="col-12 col-md-4">
          <select class="form-select form-select-sm bg-dark text-light border-secondary" id="review-category">
            <option value="hardware">Hardware & PCs</option>
            <option value="service">Staff & Service</option>
            <option value="support">Fast Tech Support</option>
          </select>
        </div>
        <div class="col-12 col-md-3">
          <select class="form-select form-select-sm bg-dark text-light border-secondary" id="review-rating">
            <option value="5">★★★★★ (5.0)</option>
            <option value="4">★★★★☆ (4.0)</option>
            <option value="3">★★★☆☆ (3.0)</option>
          </select>
        </div>
      </div>
      <div class="mb-2">
        <textarea class="form-control form-control-sm bg-dark text-light border-secondary" id="review-text" rows="2" maxlength="250" placeholder="Your experience at QazaqPeek..." required></textarea>
        <div class="d-flex justify-content-between small text-muted mt-1">
          <span id="review-error-msg" class="text-danger d-none"></span>
          <span id="review-char-count">0 / 250 (min 10 chars)</span>
        </div>
      </div>
      <div class="d-flex gap-2 justify-content-end">
        <button type="button" class="btn btn-secondary btn-sm" id="btn-cancel-review">Cancel</button>
        <button type="submit" class="btn btn-info btn-sm fw-bold text-dark">Submit Review</button>
      </div>
    </form>
  `;
  section.insertBefore(formBox, row);

  // Set random spotlight
  const spotlight = pickSpotlightReview(activeReviews);
  if (spotlight) {
    document.getElementById('reviews-spotlight-text').textContent = `★ Spotlight: ${spotlight.author} (${spotlight.categoryLabel})`;
  }

  const searchInput = document.getElementById('reviews-search-input');
  const countIndicator = document.getElementById('reviews-count-indicator');

  function updateReviews() {
    const filtered = filterReviews(activeReviews, currentCategory, searchInput.value);
    renderReviewsList(filtered, row);
    countIndicator.textContent = `Showing ${filtered.length} of ${activeReviews.length} community reviews`;
  }

  // Filter button clicks
  document.querySelectorAll('#review-filter-btns button[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#review-filter-btns button[data-cat]').forEach(b => {
        b.className = 'btn btn-sm btn-outline-secondary';
      });
      btn.className = 'btn btn-sm btn-info text-dark fw-bold';
      currentCategory = btn.getAttribute('data-cat');
      updateReviews();
    });
  });

  searchInput.addEventListener('input', updateReviews);

  // Toggle review form
  const toggleBtn = document.getElementById('btn-toggle-review-form');
  toggleBtn.addEventListener('click', () => {
    formBox.classList.toggle('d-none');
    toggleBtn.textContent = formBox.classList.contains('d-none') ? '+ Write Review' : '✕ Close';
  });

  document.getElementById('btn-cancel-review').addEventListener('click', () => {
    formBox.classList.add('d-none');
    toggleBtn.textContent = '+ Write Review';
  });

  // Character counter
  const textarea = document.getElementById('review-text');
  const charCount = document.getElementById('review-char-count');
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} / 250 (min 10 chars)`;
    charCount.classList.toggle('text-danger', len < 10);
  });

  // Review submission
  const reviewForm = document.getElementById('submit-review-form');
  const errorMsg = document.getElementById('review-error-msg');

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('review-author').value.trim();
    const text = textarea.value.trim();
    const rating = parseInt(document.getElementById('review-rating').value, 10);
    const catSelect = document.getElementById('review-category');
    const category = catSelect.value;
    const categoryLabel = catSelect.options[catSelect.selectedIndex].text;

    if (author.length < 2) {
      errorMsg.textContent = 'Please enter at least 2 characters for your name.';
      errorMsg.classList.remove('d-none');
      return;
    }
    if (text.length < 10) {
      errorMsg.textContent = 'Feedback must be at least 10 characters long.';
      errorMsg.classList.remove('d-none');
      return;
    }

    errorMsg.classList.add('d-none');

    // Add new review to array and re-render
    activeReviews.unshift({
      id: activeReviews.length + 1,
      author,
      role: 'Verified Community Review',
      rating,
      category,
      categoryLabel,
      text,
      date: new Date().toISOString().split('T')[0],
      verifiedUrl: 'https://2gis.kz/astana'
    });

    updateReviews();
    reviewForm.reset();
    charCount.textContent = '0 / 250 (min 10 chars)';
    formBox.classList.add('d-none');
    toggleBtn.textContent = '+ Write Review';

    if (typeof displayGlobalToast === 'function') {
      displayGlobalToast('Review Added', 'Your feedback was rendered on the page (Demonstration Mode).', 'success');
    }
  });

  // Newsletter subscription validation
  const newsForm = document.getElementById('newsletter-form');
  const newsEmail = document.getElementById('newsletter-email');
  const newsFeedback = document.getElementById('newsletter-feedback');

  if (newsForm && newsEmail && newsFeedback) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newsFeedback.className = 'alert alert-danger mt-2 mb-0';
        newsFeedback.textContent = 'Please enter a valid email address.';
        newsFeedback.classList.remove('d-none');
        newsEmail.focus();
        return;
      }

      newsFeedback.className = 'alert alert-success mt-2 mb-0';
      newsFeedback.textContent = `Subscription confirmed for ${email}! (Demonstration Mode).`;
      newsFeedback.classList.remove('d-none');
      newsForm.reset();
    });
  }

  // Initial render
  updateReviews();
});
