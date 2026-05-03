const products = [
  { id: 1, name: 'العود الملكي', category: 'رجالي', price: 320, description: 'تركيبة فاخرة بخشب العود والزعفران مع قاعدة العنبر.', badge: 'الأكثر مبيعًا' },
  { id: 2, name: 'زهرة الصباح', category: 'نسائي', price: 245, description: 'رائحة زهرية عليا بنفحات الياسمين والورد الأبيض.', badge: 'الجديد' },
  { id: 3, name: 'نسيم البحر', category: 'موحد', price: 210, description: 'عطر منعش بمكونات الحمضيات وخشب الأرز.', badge: 'خيار مميز للشباب' },
  { id: 4, name: 'الورد الشرقي', category: 'نسائي', price: 275, description: 'تركيبة شرقية دافئة مع العود والورد الدمشقي.', badge: 'خيار مميز للنساء' },
  { id: 5, name: 'ليل العطور', category: 'رجالي', price: 295, description: 'رائحة غامرة مع لمسات العنبر والجلد المدبوغ.', badge: 'الأكثر مبيعًا' },
  { id: 6, name: 'حرير الفجر', category: 'موحد', price: 230, description: 'عطر ناعم مع مسك وخشب الصندل والفواكه العودية.', badge: 'خيار مميز للشباب' },
  { id: 7, name: 'عبير العنبر', category: 'نسائي', price: 260, description: 'قوام دافئ وأنثوي مع عبير العنبر والمسك الأبيض.', badge: 'الجديد' },
  { id: 8, name: 'سحر الليل', category: 'رجالي', price: 310, description: 'رائحة غامرة بمكونات التوابل والعود الأسود.', badge: 'خيار مميز للشباب' },
  { id: 9, name: 'نفحات المسك', category: 'موحد', price: 220, description: 'تركيبة ناعمة تعمل طوال اليوم برائحة مسكية أنيقة.', badge: 'الأكثر مبيعًا' },
  { id: 10, name: 'أفراح الورد', category: 'نسائي', price: 285, description: 'مزيج من الورد الدمشقي والفل مع لمسات الفواكه.', badge: 'خيار مميز للنساء' },
  { id: 11, name: 'وليمة العود', category: 'رجالي', price: 330, description: 'تركيبة فاخرة تضم أفضل أنواع العود والزعفران.', badge: 'الجديد' },
  { id: 12, name: 'لحن الأزهار', category: 'نسائي', price: 255, description: 'عطر رقيق بلمسات الفل والورد الأبيض.', badge: 'خيار مميز للنساء' },
  { id: 13, name: 'نسيم البرية', category: 'موحد', price: 215, description: 'عطر شاب بروائح العشب الطازج والأخشاب الخفيفة.', badge: 'الجديد' },
  { id: 14, name: 'زهرة الليمون', category: 'نسائي', price: 240, description: 'انتعاش حمضي بنفحات الليمون والفل.', badge: 'خيار مميز للشباب' },
  { id: 15, name: 'ظل العنبر', category: 'رجالي', price: 305, description: 'طاقة فاخرة مع العنبر وخشب الصندل.', badge: 'الأكثر مبيعًا' },
  { id: 16, name: 'نسمات السحر', category: 'موحد', price: 225, description: 'عطر يومي خفيف مع مسك وخوخ مبرد.', badge: 'خيار مميز للشباب' },
  { id: 17, name: 'ملكة المساء', category: 'نسائي', price: 295, description: 'عطر أنثوي ناعم مع عبير الزهور البيضاء.', badge: 'الأكثر مبيعًا' },
  { id: 18, name: 'إكسير الليل', category: 'رجالي', price: 325, description: 'تركيبة مميزة من التوابل والجلد والعنبر.', badge: 'خيار مميز للشباب' },
  { id: 19, name: 'قطرات الفجر', category: 'نسائي', price: 235, description: 'رائحة صباحية بالحيوية وخفة الزهور.', badge: 'الجديد' },
  { id: 20, name: 'أريج الشرق', category: 'موحد', price: 250, description: 'عطر شرقي دافئ بخامات العود والمسك.', badge: 'خيار مميز للنساء' }
];

const cart = {};
let activeBadgeFilter = 'all';
const productGrid = document.getElementById('product-grid');
const cartToggle = document.getElementById('cart-toggle');
const cartPanel = document.getElementById('cart-panel');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const checkoutForm = document.getElementById('checkout-form');
const summaryItems = document.getElementById('summary-items');
const summaryTotal = document.getElementById('summary-total');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-button');
let activeCategory = 'all';
const badgeFilterButtons = document.querySelectorAll('.badge-filter-button');
const showAllButton = document.getElementById('show-all');
const scrollProductsButton = document.getElementById('scroll-products');
const closeCart = document.getElementById('close-cart');

function formatPrice(value) {
  return `${value.toLocaleString()} ر.س`;
}

function updateCartInfo() {
  const items = Object.values(cart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);
  summaryItems.textContent = count;
  summaryTotal.textContent = formatPrice(total);
}

function renderProducts(list) {
  productGrid.innerHTML = list.map(product => {
    return `
      <article class="product-card">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-meta">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span>${product.category}</span>
        </div>
        <button class="add-to-cart" data-id="${product.id}">أضف إلى السلة</button>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
    });
  });
}

function renderCart() {
  const items = Object.values(cart);

  if (!items.length) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">السلة فارغة. أضف بعض العطور الآن.</p>';
    updateCartInfo();
    return;
  }

  cartItemsContainer.innerHTML = items.map(item => {
    const subtotal = item.quantity * item.price;
    return `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>السعر: ${formatPrice(item.price)}</p>
        <p>الكمية: ${item.quantity}</p>
        <div class="cart-actions">
          <button aria-label="إنقاص الكمية" data-action="decrement" data-id="${item.id}">-</button>
          <button aria-label="زيادة الكمية" data-action="increment" data-id="${item.id}">+</button>
          <button aria-label="حذف المنتج" data-action="remove" data-id="${item.id}">✕</button>
        </div>
        <p>المجموع: ${formatPrice(subtotal)}</p>
      </div>
    `;
  }).join('');

  cartItemsContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = Number(button.dataset.id);
      const action = button.dataset.action;
      if (action === 'increment') updateQuantity(productId, 1);
      if (action === 'decrement') updateQuantity(productId, -1);
      if (action === 'remove') removeFromCart(productId);
    });
  });

  updateCartInfo();
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  if (!cart[productId]) {
    cart[productId] = { ...product, quantity: 0 };
  }

  cart[productId].quantity += 1;
  renderCart();
  openCart();
}

function updateQuantity(productId, delta) {
  if (!cart[productId]) return;
  cart[productId].quantity += delta;

  if (cart[productId].quantity <= 0) {
    delete cart[productId];
  }

  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  renderCart();
}

function openCart() {
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
}

function closeCartPanel() {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = products.filter(product => {
    const matchesQuery = product.name.includes(query) || product.description.includes(query);
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesBadge = activeBadgeFilter === 'all' || product.badge === activeBadgeFilter;
    return matchesQuery && matchesCategory && matchesBadge;
  });

  renderProducts(filtered);
}

badgeFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    badgeFilterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeBadgeFilter = button.dataset.badge;
    filterProducts();
  });
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeCategory = button.dataset.category;
    filterProducts();
  });
});

checkoutForm.addEventListener('submit', event => {
  event.preventDefault();
  const productCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  if (!productCount) {
    alert('يرجى إضافة منتجات إلى السلة أولاً.');
    return;
  }

  checkoutForm.reset();
  Object.keys(cart).forEach(key => delete cart[key]);
  renderCart();
  window.location.href = 'order-success.html';
});

cartToggle.addEventListener('click', () => {
  openCart();
});

closeCart.addEventListener('click', closeCartPanel);
checkoutButton.addEventListener('click', () => {
  closeCartPanel();
  document.getElementById('name').focus();
});

searchInput.addEventListener('input', filterProducts);
showAllButton.addEventListener('click', () => {
  categoryButtons.forEach(btn => btn.classList.remove('active'));
  const allButton = document.querySelector('.category-button[data-category="all"]');
  if (allButton) allButton.classList.add('active');
  activeCategory = 'all';
  renderProducts(products);
});
scrollProductsButton.addEventListener('click', () => {
  document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('load', () => {
  renderProducts(products);
  renderCart();
});
