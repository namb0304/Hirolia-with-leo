// ====================================
// 商品詳細画面 JavaScript
// ====================================

let currentProduct = null;
let selectedOptions = {
    spiciness: null,
    main: null,
    drink: null,
    toppings: []
};
let quantity = 1;

// DOM要素
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productBasePrice = document.getElementById('product-base-price');
const productDescription = document.getElementById('product-description');
const curryOptions = document.getElementById('curry-options');
const specialNotes = document.getElementById('special-notes');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const quantityDisplay = document.getElementById('quantity');
const totalPriceDisplay = document.getElementById('total-price');
const addToCartBtn = document.getElementById('add-to-cart-btn');

// 商品IDをURLから取得
function getProductIdFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/\/customer\/menu\/(\d+)/);
    return match ? parseInt(match[1]) : null;
}

// 商品データの読み込み
function loadProduct() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        showToast('商品が見つかりません', 'error');
        navigateTo('/customer/menu');
        return;
    }
    
    const menuItems = getDummyMenuItems();
    currentProduct = menuItems.find(item => item.id === productId);
    
    if (!currentProduct) {
        showToast('商品が見つかりません', 'error');
        navigateTo('/customer/menu');
        return;
    }
    
    renderProduct();
}

// 商品情報の描画
function renderProduct() {
    const lang = getCurrentLanguage();
    const name = currentProduct[`name_${lang}`] || currentProduct.name_ja;
    const description = currentProduct[`description_${lang}`] || currentProduct.description_ja;
    
    productImage.src = currentProduct.image_url;
    productImage.alt = name;
    productName.textContent = name;
    productBasePrice.textContent = formatPrice(currentProduct.price);
    productDescription.textContent = description;
    
    // カレーセットの場合はオプションを表示
    if (currentProduct.category === 'curry') {
        curryOptions.classList.remove('hidden');
        renderOptions();
    } else {
        curryOptions.classList.add('hidden');
    }
    
    updateTotalPrice();
}

// オプションの描画
function renderOptions() {
    const options = getDummyOptions();
    const lang = getCurrentLanguage();
    
    // 辛さ
    const spicinessContainer = document.getElementById('spiciness-options');
    spicinessContainer.innerHTML = '';
    options.spiciness.forEach(option => {
        const optionEl = createOptionElement(option, 'spiciness', 'radio', lang);
        spicinessContainer.appendChild(optionEl);
    });
    
    // メイン
    const mainContainer = document.getElementById('main-options');
    mainContainer.innerHTML = '';
    options.main.forEach(option => {
        const optionEl = createOptionElement(option, 'main', 'radio', lang);
        mainContainer.appendChild(optionEl);
    });
    
    // ドリンク
    const drinkContainer = document.getElementById('drink-options');
    drinkContainer.innerHTML = '';
    options.drinks.forEach(option => {
        const optionEl = createOptionElement(option, 'drink', 'radio', lang);
        drinkContainer.appendChild(optionEl);
    });
    
    // トッピング
    const toppingContainer = document.getElementById('topping-options');
    toppingContainer.innerHTML = '';
    options.toppings.forEach(option => {
        const optionEl = createOptionElement(option, 'topping', 'checkbox', lang);
        toppingContainer.appendChild(optionEl);
    });
}

// オプション要素の作成
function createOptionElement(option, type, inputType, lang) {
    const name = option[`name_${lang}`] || option.name_ja;
    const priceText = option.price > 0 ? ` (+${formatPrice(option.price)})` : '';
    
    const div = document.createElement('div');
    div.className = 'option-item';
    
    const input = document.createElement('input');
    input.type = inputType;
    input.name = type;
    input.value = option.id;
    input.id = `option-${option.id}`;
    
    const label = document.createElement('label');
    label.className = 'option-label';
    label.htmlFor = `option-${option.id}`;
    label.textContent = name;
    
    const price = document.createElement('span');
    price.className = 'option-price';
    price.textContent = priceText;
    
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(price);
    
    // クリックイベント
    div.addEventListener('click', (e) => {
        if (e.target !== input) {
            if (inputType === 'radio') {
                input.checked = true;
                selectedOptions[type] = option;
            } else {
                input.checked = !input.checked;
                if (input.checked) {
                    selectedOptions.toppings.push(option);
                } else {
                    selectedOptions.toppings = selectedOptions.toppings.filter(t => t.id !== option.id);
                }
            }
            updateSelectedStyles();
            updateTotalPrice();
        }
    });
    
    input.addEventListener('change', () => {
        if (inputType === 'radio') {
            selectedOptions[type] = option;
        } else {
            if (input.checked) {
                if (!selectedOptions.toppings.find(t => t.id === option.id)) {
                    selectedOptions.toppings.push(option);
                }
            } else {
                selectedOptions.toppings = selectedOptions.toppings.filter(t => t.id !== option.id);
            }
        }
        updateSelectedStyles();
        updateTotalPrice();
    });
    
    return div;
}

// 選択されたオプションのスタイル更新
function updateSelectedStyles() {
    document.querySelectorAll('.option-item').forEach(item => {
        const input = item.querySelector('input');
        if (input.checked) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// 合計金額の計算と表示更新
function updateTotalPrice() {
    let total = currentProduct.price * quantity;
    
    // カレーセットの場合、オプション料金を加算
    if (currentProduct.category === 'curry') {
        if (selectedOptions.main) {
            total += selectedOptions.main.price * quantity;
        }
        if (selectedOptions.drink) {
            total += selectedOptions.drink.price * quantity;
        }
        selectedOptions.toppings.forEach(topping => {
            total += topping.price * quantity;
        });
    }
    
    totalPriceDisplay.textContent = formatPrice(total);
}

// 数量変更
qtyMinus.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
        updateTotalPrice();
    }
});

qtyPlus.addEventListener('click', () => {
    if (quantity < 99) {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateTotalPrice();
    }
});

// カートに追加
addToCartBtn.addEventListener('click', () => {
    // カレーセットの場合、必須オプションのチェック
    if (currentProduct.category === 'curry') {
        if (!selectedOptions.spiciness || !selectedOptions.main || !selectedOptions.drink) {
            const lang = getCurrentLanguage();
            const message = lang === 'ja' ? '必須オプションを選択してください' :
                           lang === 'en' ? 'Please select required options' :
                           'आवश्यक विकल्प चयन गर्नुहोस्';
            showToast(message, 'error');
            return;
        }
    }
    
    // カートアイテムを作成
    const cartItem = {
        id: currentProduct.id,
        name_ja: currentProduct.name_ja,
        name_en: currentProduct.name_en,
        name_ne: currentProduct.name_ne,
        price: currentProduct.price,
        image_url: currentProduct.image_url,
        quantity: quantity,
        options: currentProduct.category === 'curry' ? {
            spiciness: selectedOptions.spiciness,
            main: selectedOptions.main,
            drink: selectedOptions.drink,
            toppings: selectedOptions.toppings
        } : null,
        notes: specialNotes.value.trim() || null
    };
    
    // カートに追加
    const cart = getCart();
    cart.push(cartItem);
    saveCart(cart);
    
    // 成功メッセージ
    const lang = getCurrentLanguage();
    const message = lang === 'ja' ? 'カートに追加しました' :
                   lang === 'en' ? 'Added to cart' :
                   'कार्टमा थपियो';
    showToast(message, 'success', 2000);
    
    // メニュー画面に戻る
    setTimeout(() => {
        navigateTo('/customer/menu');
    }, 2000);
});

// UI言語の更新
function updateUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });
    
    if (currentProduct) {
        renderProduct();
    }
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
    
    // 商品を読み込み
    loadProduct();
});