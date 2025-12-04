// ====================================
// カート画面 JavaScript
// ====================================

let cart = [];

// DOM要素
const cartItemsContainer = document.getElementById('cart-items-container');
const emptyCart = document.getElementById('empty-cart');
const totalBar = document.querySelector('.total-bar'); // 合計金額バー
const tabBar = document.querySelector('.tab-bar'); // タブバー
const cartTotalDisplay = document.getElementById('cart-total');
const modalTotalDisplay = document.getElementById('modal-total');
const placeOrderBtn = document.getElementById('place-order-btn');
const confirmOrderBtn = document.getElementById('confirm-order-btn');

// カートの読み込みと描画
function loadAndRenderCart() {
    cart = getCart();
    
    if (cart.length === 0) {
        emptyCart.classList.remove('hidden');
        cartItemsContainer.innerHTML = '';
        if (totalBar) totalBar.style.display = 'none';
        if (tabBar) tabBar.style.display = 'none';
    } else {
        emptyCart.classList.add('hidden');
        if (totalBar) totalBar.style.display = 'flex';
        if (tabBar) tabBar.style.display = 'flex';
        renderCartItems();
        updateCartTotal();
    }
}

// カートアイテムの描画
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    const lang = getCurrentLanguage();
    
    cart.forEach((item, index) => {
        const cartItemEl = createCartItemElement(item, index, lang);
        cartItemsContainer.appendChild(cartItemEl);
    });
}

// カートアイテム要素の作成
function createCartItemElement(item, index, lang) {
    const name = item[`name_${lang}`] || item.name_ja;
    
    // オプション文字列を作成
    let optionsText = '';
    if (item.options) {
        const opts = [];
        if (item.options.spiciness) {
            opts.push(item.options.spiciness[`name_${lang}`] || item.options.spiciness.name_ja);
        }
        if (item.options.main) {
            opts.push(item.options.main[`name_${lang}`] || item.options.main.name_ja);
        }
        if (item.options.drink) {
            opts.push(item.options.drink[`name_${lang}`] || item.options.drink.name_ja);
        }
        if (item.options.toppings && item.options.toppings.length > 0) {
            item.options.toppings.forEach(topping => {
                opts.push(topping[`name_${lang}`] || topping.name_ja);
            });
        }
        optionsText = opts.join(', ');
    }
    
    // 小計計算
    let itemTotal = item.price * item.quantity;
    if (item.options) {
        if (item.options.main) itemTotal += item.options.main.price * item.quantity;
        if (item.options.drink) itemTotal += item.options.drink.price * item.quantity;
        if (item.options.toppings) {
            item.options.toppings.forEach(topping => {
                itemTotal += topping.price * item.quantity;
            });
        }
    }
    
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <img src="${item.image_url}" alt="${name}" class="image">
        <div class="details">
            <div class="name">${name}</div>
            ${optionsText ? `<div class="options">${optionsText}</div>` : ''}
            ${item.notes ? `<div class="options">📝 ${item.notes}</div>` : ''}
            <div class="price">${formatPrice(itemTotal)}</div>
        </div>
        <div class="actions">
            <button class="btn btn-sm btn-danger" onclick="removeCartItem(${index})">
                🗑️
            </button>
            <div class="quantity-control mt-sm">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
        </div>
    `;
    
    return div;
}

// 数量変更
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        removeCartItem(index);
    } else {
        saveCart(cart);
        loadAndRenderCart();
    }
}

// カートアイテムの削除
function removeCartItem(index) {
    const lang = getCurrentLanguage();
    const message = lang === 'ja' ? '削除しました' :
                   lang === 'en' ? 'Item removed' :
                   'वस्तु हटाइयो';
    
    cart.splice(index, 1);
    saveCart(cart);
    loadAndRenderCart();
    showToast(message, 'success', 2000);
}

// カート合計の更新
function updateCartTotal() {
    let total = 0;
    
    cart.forEach(item => {
        let itemPrice = item.price;
        
        if (item.options) {
            if (item.options.main) itemPrice += item.options.main.price;
            if (item.options.drink) itemPrice += item.options.drink.price;
            if (item.options.toppings) {
                item.options.toppings.forEach(topping => {
                    itemPrice += topping.price;
                });
            }
        }
        
        total += itemPrice * item.quantity;
    });
    
    cartTotalDisplay.textContent = formatPrice(total);
    modalTotalDisplay.textContent = formatPrice(total);
}

// 注文ボタンのクリック
placeOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        const lang = getCurrentLanguage();
        const message = lang === 'ja' ? 'カートが空です' :
                       lang === 'en' ? 'Cart is empty' :
                       'कार्ट खाली छ';
        showToast(message, 'error');
        return;
    }
    
    showModal('confirm-order-modal');
});

// 注文確定ボタンのクリック
confirmOrderBtn.addEventListener('click', () => {
    // 注文データを保存
    const session = getSessionData();
    const orderData = {
        tableNumber: session.tableNumber,
        items: cart,
        orderTime: new Date().toISOString(),
        status: 'pending'
    };
    
    // 既存の注文履歴を取得
    let orderHistory = JSON.parse(localStorage.getItem('hirolia_orders') || '[]');
    orderHistory.push(orderData);
    localStorage.setItem('hirolia_orders', JSON.stringify(orderHistory));
    
    // カートをクリア
    clearCart();
    
    // モーダルを閉じる
    hideModal('confirm-order-modal');
    
    // 成功メッセージ
    const lang = getCurrentLanguage();
    const message = lang === 'ja' ? '注文を受け付けました!' :
                   lang === 'en' ? 'Order placed!' :
                   'अर्डर स्वीकृत!';
    showToast(message, 'success', 3000);
    
    // 注文履歴画面に遷移
    setTimeout(() => {
        navigateTo('/customer/history');
    }, 3000);
});

// UI言語の更新
function updateUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });
    
    loadAndRenderCart();
}

// グローバル関数として定義（HTMLから呼び出すため）
window.updateQuantity = updateQuantity;
window.removeCartItem = removeCartItem;

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
});