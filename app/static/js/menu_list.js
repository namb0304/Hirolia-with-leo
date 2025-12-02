// ====================================
// メニュー一覧画面 JavaScript
// ====================================

let currentCategory = 'all';
let menuItems = [];

// DOM要素
const categoryTabs = document.querySelectorAll('.category-tab');
const menuGrid = document.getElementById('menu-grid');
const loading = document.getElementById('loading');
const cartBadge = document.getElementById('cart-badge');
const tableInfo = document.getElementById('table-info');
const callTableNumber = document.getElementById('call-table-number');

// タブバー要素
const tabCart = document.getElementById('tab-cart');
const tabNaan = document.getElementById('tab-naan');
const tabCall = document.getElementById('tab-call');
const tabHistory = document.getElementById('tab-history');
const confirmCallBtn = document.getElementById('confirm-call-btn');

// カテゴリタブのクリック
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 既存の選択を解除
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // 新しいカテゴリを選択
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        
        // メニューを再描画
        renderMenuItems();
    });
});

// メニューアイテムの描画
function renderMenuItems() {
    // フィルタリング
    let filteredItems = menuItems;
    if (currentCategory !== 'all') {
        filteredItems = menuItems.filter(item => item.category === currentCategory);
    }
    
    // グリッドをクリア
    menuGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div class="card text-center" style="grid-column: 1 / -1;">
                <p class="text-secondary">このカテゴリには商品がありません</p>
            </div>
        `;
        return;
    }
    
    // 商品カードを生成
    filteredItems.forEach(item => {
        const card = createProductCard(item);
        menuGrid.appendChild(card);
    });
}

// 商品カードの作成
function createProductCard(item) {
    const lang = getCurrentLanguage();
    const name = item[`name_${lang}`] || item.name_ja;
    const description = item[`description_${lang}`] || item.description_ja;
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${item.image_url}" alt="${name}" class="image">
        <div class="content">
            <div class="name">${name}</div>
            <div class="price">${formatPrice(item.price)}</div>
            <div class="description">${description}</div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        // 商品詳細画面に遷移
        navigateTo(`/customer/menu/${item.id}`);
    });
    
    return card;
}

// メニューデータの読み込み
function loadMenuItems() {
    loading.classList.remove('hidden');
    
    // ダミーデータを使用
    setTimeout(() => {
        menuItems = getDummyMenuItems();
        renderMenuItems();
        loading.classList.add('hidden');
    }, 500);
}

// カートバッジの更新
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }
}

// タブバーのイベント
tabCart.addEventListener('click', () => {
    navigateTo('/customer/cart');
});

tabNaan.addEventListener('click', () => {
    // ナンをカートに追加
    const naanItem = menuItems.find(item => item.category === 'naan' && item.id === 4); // プレーンナン
    
    if (naanItem) {
        const cart = getCart();
        const existingItem = cart.find(item => item.id === naanItem.id && !item.options);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: naanItem.id,
                name_ja: naanItem.name_ja,
                name_en: naanItem.name_en,
                name_ne: naanItem.name_ne,
                price: naanItem.price,
                image_url: naanItem.image_url,
                quantity: 1,
                options: null
            });
        }
        
        saveCart(cart);
        updateCartBadge();
        
        const lang = getCurrentLanguage();
        const message = lang === 'ja' ? 'ナンをカートに追加しました' :
                       lang === 'en' ? 'Naan added to cart' :
                       'कार्टमा नान थपियो';
        showToast(message, 'success', 2000);
    }
});

tabCall.addEventListener('click', () => {
    const session = getSessionData();
    callTableNumber.textContent = session.tableNumber || '-';
    showModal('call-staff-modal');
});

confirmCallBtn.addEventListener('click', () => {
    // ここで実際のAPIを呼び出す（将来実装）
    console.log('Staff call requested for table:', getSessionData().tableNumber);
    
    hideModal('call-staff-modal');
    
    const lang = getCurrentLanguage();
    const message = lang === 'ja' ? '店員を呼び出しました' :
                   lang === 'en' ? 'Staff has been called' :
                   'स्टाफलाई बोलाइएको छ';
    showToast(message, 'success', 2000);
});

tabHistory.addEventListener('click', () => {
    navigateTo('/customer/history');
});

// UI言語の更新
function updateUILanguage() {
    const lang = getCurrentLanguage();
    const session = getSessionData();
    
    // テーブル情報
    const tableLabel = lang === 'ja' ? 'テーブル' :
                      lang === 'en' ? 'Table' :
                      'टेबल';
    tableInfo.textContent = `${tableLabel}: ${session.tableNumber || '-'}`;
    
    // 翻訳可能な要素を更新
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });
    
    // メニューを再描画
    renderMenuItems();
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // セッションチェック
    const session = getSessionData();
    if (!session.tableNumber || !session.language) {
        navigateTo('/customer/table');
        return;
    }
    
    // UI言語を更新
    updateUILanguage();
    
    // メニューを読み込み
    loadMenuItems();
    
    // カートバッジを更新
    updateCartBadge();
    
    // 定期的にカートバッジを更新
    setInterval(updateCartBadge, 1000);
});