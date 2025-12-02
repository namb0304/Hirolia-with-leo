// ====================================
// 注文履歴・会計画面 JavaScript
// ====================================

let orders = [];

// DOM要素
const ordersContainer = document.getElementById('orders-container');
const emptyOrders = document.getElementById('empty-orders');
const checkoutBottomBar = document.getElementById('checkout-bottom-bar');
const grandTotalDisplay = document.getElementById('grand-total');
const modalGrandTotal = document.getElementById('modal-grand-total');
const modalOrderCount = document.getElementById('modal-order-count');
const checkoutBtn = document.getElementById('checkout-btn');
const confirmCheckoutBtn = document.getElementById('confirm-checkout-btn');

// タブバー要素
const tabNaan = document.getElementById('tab-naan');
const tabCall = document.getElementById('tab-call');

// 注文履歴の読み込みと描画
function loadAndRenderOrders() {
    orders = JSON.parse(localStorage.getItem('hirolia_orders') || '[]');
    
    if (orders.length === 0) {
        emptyOrders.classList.remove('hidden');
        ordersContainer.innerHTML = '';
        checkoutBottomBar.style.display = 'none';
    } else {
        emptyOrders.classList.add('hidden');
        checkoutBottomBar.style.display = 'block';
        renderOrders();
        updateGrandTotal();
    }
}

// 注文の描画
function renderOrders() {
    ordersContainer.innerHTML = '';
    const lang = getCurrentLanguage();
    
    // 注文を新しい順に表示
    const reversedOrders = [...orders].reverse();
    
    reversedOrders.forEach((order, index) => {
        const orderEl = createOrderElement(order, orders.length - 1 - index, lang);
        ordersContainer.appendChild(orderEl);
    });
}

// 注文要素の作成
function createOrderElement(order, orderIndex, lang) {
    const orderTime = new Date(order.orderTime);
    const timeString = orderTime.toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // ステータスバッジ
    const statusText = order.status === 'served' ? 
        (lang === 'ja' ? '提供済み' : lang === 'en' ? 'Served' : 'परोसिएको') :
        (lang === 'ja' ? '調理中' : lang === 'en' ? 'Preparing' : 'तयारी हुँदै');
    const statusClass = order.status === 'served' ? 'status-served' : 'status-preparing';
    
    const div = document.createElement('div');
    div.className = 'order-group';
    
    let itemsHtml = '';
    order.items.forEach(item => {
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
        
        itemsHtml += `
            <div class="order-item">
                <div class="order-item-header">
                    <div class="order-item-name">${name}</div>
                    <div class="order-item-quantity">×${item.quantity}</div>
                    <div class="order-item-price">${formatPrice(itemTotal)}</div>
                </div>
                ${optionsText ? `<div class="order-item-options">${optionsText}</div>` : ''}
                ${item.notes ? `<div class="order-item-options">📝 ${item.notes}</div>` : ''}
            </div>
        `;
    });
    
    div.innerHTML = `
        <div class="card">
            <div class="order-time">
                <span>⏰ ${timeString}</span>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            ${itemsHtml}
        </div>
    `;
    
    return div;
}

// 合計金額の更新
function updateGrandTotal() {
    let grandTotal = 0;
    
    orders.forEach(order => {
        order.items.forEach(item => {
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
            
            grandTotal += itemPrice * item.quantity;
        });
    });
    
    grandTotalDisplay.textContent = formatPrice(grandTotal);
    modalGrandTotal.textContent = formatPrice(grandTotal);
    modalOrderCount.textContent = `${orders.length}件`;
}

// 会計ボタンのクリック
checkoutBtn.addEventListener('click', () => {
    if (orders.length === 0) {
        const lang = getCurrentLanguage();
        const message = lang === 'ja' ? '注文がありません' :
                       lang === 'en' ? 'No orders' :
                       'अर्डर छैन';
        showToast(message, 'error');
        return;
    }
    
    showModal('checkout-confirm-modal');
});

// 会計確定ボタンのクリック
confirmCheckoutBtn.addEventListener('click', () => {
    // 会計データを保存
    const session = getSessionData();
    const checkoutData = {
        tableNumber: session.tableNumber,
        orders: orders,
        checkoutTime: new Date().toISOString(),
        totalAmount: calculateGrandTotal()
    };
    
    // セッションに会計データを保存
    saveSessionData({
        checkoutData: checkoutData,
        isCheckedOut: true
    });
    
    // モーダルを閉じる
    hideModal('checkout-confirm-modal');
    
    // 成功メッセージ
    const lang = getCurrentLanguage();
    const message = lang === 'ja' ? '会計を確定しました' :
                   lang === 'en' ? 'Checkout confirmed' :
                   'भुक्तानी पुष्टि भयो';
    showToast(message, 'success', 2000);
    
    // レジ案内画面に遷移
    setTimeout(() => {
        navigateTo('/customer/receipt');
    }, 2000);
});

// 合計金額計算
function calculateGrandTotal() {
    let total = 0;
    
    orders.forEach(order => {
        order.items.forEach(item => {
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
    });
    
    return total;
}

// ナンおかわり
tabNaan.addEventListener('click', () => {
    const menuItems = getDummyMenuItems();
    const naanItem = menuItems.find(item => item.category === 'naan' && item.id === 4);
    
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
        
        const lang = getCurrentLanguage();
        const message = lang === 'ja' ? 'ナンをカートに追加しました' :
                       lang === 'en' ? 'Naan added to cart' :
                       'कार्टमा नान थपियो';
        showToast(message, 'success', 2000);
    }
});

// 店員呼び出し
tabCall.addEventListener('click', () => {
    const session = getSessionData();
    console.log('Staff call requested for table:', session.tableNumber);
    
    const lang = getCurrentLanguage();
    const message = lang === 'ja' ? '店員を呼び出しました' :
                   lang === 'en' ? 'Staff has been called' :
                   'स्टाफलाई बोलाइएको छ';
    showToast(message, 'success', 2000);
});

// UI言語の更新
function updateUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });
    
    loadAndRenderOrders();
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // セッションチェック
    const session = getSessionData();
    if (!session.tableNumber || !session.language) {
        navigateTo('/customer/table');
        return;
    }
    
    // 既に会計済みの場合はレシート画面へ
    if (session.isCheckedOut) {
        navigateTo('/customer/receipt');
        return;
    }
    
    // UI言語を更新
    updateUILanguage();
});