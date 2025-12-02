// ====================================
// Hirolia - 共通JavaScript関数
// ====================================

// ----- 多言語対応 -----
const LANGUAGES = {
    ja: {
        code: 'ja',
        name: '日本語',
        flag: '🇯🇵'
    },
    en: {
        code: 'en',
        name: 'English',
        flag: '🇺🇸'
    },
    ne: {
        code: 'ne',
        name: 'नेपाली',
        flag: '🇳🇵'
    }
};

// 翻訳データ
const translations = {
    ja: {
        // 共通
        'confirm': '確認',
        'cancel': 'キャンセル',
        'back': '戻る',
        'next': '次へ',
        'close': '閉じる',
        'loading': '読み込み中...',
        
        // タブバー
        'tab_cart': 'カート',
        'tab_naan': 'ナンおかわり',
        'tab_call': '店員呼出',
        'tab_history': '注文履歴',
        
        // 初期設定
        'enter_table': 'テーブル番号を入力',
        'select_language': '言語を選択',
        'table_number': 'テーブル番号',
        'start_order': '注文を開始',
        
        // アンケート
        'customer_type': '客層',
        'party_size': '人数',
        'friends': '友人',
        'family': '家族',
        'couple': '恋人',
        'colleagues': '同僚',
        'other': 'その他',
        'people': '名',
        'more_than_10': '10名以上',
        
        // メニュー
        'menu': 'メニュー',
        'curry': 'カレー',
        'naan': 'ナン',
        'drinks': 'ドリンク',
        'desserts': 'デザート',
        'sides': 'サイドメニュー',
        'add_to_cart': 'カートに追加',
        'quantity': '数量',
        
        // カート
        'cart': 'カート',
        'empty_cart': 'カートは空です',
        'subtotal': '小計',
        'total': '合計',
        'place_order': '注文する',
        'confirm_order': '注文を確定しますか?',
        'cannot_cancel': '確定後はキャンセルできません',
        
        // 注文履歴
        'order_history': '注文履歴',
        'checkout': '会計する',
        'preparing': '調理中',
        'served': '提供済み',
        
        // 会計
        'checkout_confirm': '会計を確定しますか?',
        'cannot_go_back': '確定後は画面が戻れなくなります',
        'show_at_register': 'この画面をレジでお見せください',
        'thank_you': 'ありがとうございました'
    },
    
    en: {
        // Common
        'confirm': 'Confirm',
        'cancel': 'Cancel',
        'back': 'Back',
        'next': 'Next',
        'close': 'Close',
        'loading': 'Loading...',
        
        // Tab bar
        'tab_cart': 'Cart',
        'tab_naan': 'Naan Refill',
        'tab_call': 'Call Staff',
        'tab_history': 'History',
        
        // Initial setup
        'enter_table': 'Enter Table Number',
        'select_language': 'Select Language',
        'table_number': 'Table Number',
        'start_order': 'Start Order',
        
        // Survey
        'customer_type': 'Party Type',
        'party_size': 'Party Size',
        'friends': 'Friends',
        'family': 'Family',
        'couple': 'Couple',
        'colleagues': 'Colleagues',
        'other': 'Other',
        'people': '',
        'more_than_10': '10+ people',
        
        // Menu
        'menu': 'Menu',
        'curry': 'Curry',
        'naan': 'Naan',
        'drinks': 'Drinks',
        'desserts': 'Desserts',
        'sides': 'Sides',
        'add_to_cart': 'Add to Cart',
        'quantity': 'Quantity',
        
        // Cart
        'cart': 'Cart',
        'empty_cart': 'Your cart is empty',
        'subtotal': 'Subtotal',
        'total': 'Total',
        'place_order': 'Place Order',
        'confirm_order': 'Confirm your order?',
        'cannot_cancel': 'Cannot cancel after confirmation',
        
        // Order history
        'order_history': 'Order History',
        'checkout': 'Checkout',
        'preparing': 'Preparing',
        'served': 'Served',
        
        // Checkout
        'checkout_confirm': 'Confirm checkout?',
        'cannot_go_back': 'You cannot go back after confirmation',
        'show_at_register': 'Please show this screen at the register',
        'thank_you': 'Thank you'
    },
    
    ne: {
        // Common
        'confirm': 'पुष्टि गर्नुहोस्',
        'cancel': 'रद्द गर्नुहोस्',
        'back': 'फिर्ता',
        'next': 'अर्को',
        'close': 'बन्द गर्नुहोस्',
        'loading': 'लोड हुँदैछ...',
        
        // Tab bar
        'tab_cart': 'कार्ट',
        'tab_naan': 'नान थप',
        'tab_call': 'स्टाफ बोलाउनुहोस्',
        'tab_history': 'अर्डर इतिहास',
        
        // Initial setup
        'enter_table': 'टेबल नम्बर प्रविष्ट गर्नुहोस्',
        'select_language': 'भाषा चयन गर्नुहोस्',
        'table_number': 'टेबल नम्बर',
        'start_order': 'अर्डर सुरु गर्नुहोस्',
        
        // Survey
        'customer_type': 'ग्राहक प्रकार',
        'party_size': 'व्यक्ति संख्या',
        'friends': 'साथीहरू',
        'family': 'परिवार',
        'couple': 'जोडी',
        'colleagues': 'सहकर्मी',
        'other': 'अन्य',
        'people': 'जना',
        'more_than_10': '१० भन्दा बढी',
        
        // Menu
        'menu': 'मेनु',
        'curry': 'करी',
        'naan': 'नान',
        'drinks': 'पेय',
        'desserts': 'मिठाई',
        'sides': 'साइड डिश',
        'add_to_cart': 'कार्टमा थप्नुहोस्',
        'quantity': 'मात्रा',
        
        // Cart
        'cart': 'कार्ट',
        'empty_cart': 'तपाईंको कार्ट खाली छ',
        'subtotal': 'उप-जम्मा',
        'total': 'कुल',
        'place_order': 'अर्डर गर्नुहोस्',
        'confirm_order': 'अर्डर पुष्टि गर्नुहोस्?',
        'cannot_cancel': 'पुष्टि पछि रद्द गर्न सकिँदैन',
        
        // Order history
        'order_history': 'अर्डर इतिहास',
        'checkout': 'भुक्तानी',
        'preparing': 'तयारी हुँदै',
        'served': 'परोसिएको',
        
        // Checkout
        'checkout_confirm': 'भुक्तानी पुष्टि गर्नुहोस्?',
        'cannot_go_back': 'पुष्टि पछि फर्कन सकिँदैन',
        'show_at_register': 'कृपया यो स्क्रिन दर्ता गर्नुहोस्',
        'thank_you': 'धन्यवाद'
    }
};

// 現在の言語を取得
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'ja';
}

// 言語を設定
function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

// 翻訳を取得
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key] || key;
}

// ----- ローカルストレージ管理 -----

// セッションデータの保存
function saveSessionData(data) {
    const sessionData = getSessionData();
    const updatedData = { ...sessionData, ...data };
    localStorage.setItem('hirolia_session', JSON.stringify(updatedData));
}

// セッションデータの取得
function getSessionData() {
    const data = localStorage.getItem('hirolia_session');
    return data ? JSON.parse(data) : {};
}

// セッションデータのクリア
function clearSessionData() {
    localStorage.removeItem('hirolia_session');
}

// カートデータの保存
function saveCart(cart) {
    localStorage.setItem('hirolia_cart', JSON.stringify(cart));
}

// カートデータの取得
function getCart() {
    const data = localStorage.getItem('hirolia_cart');
    return data ? JSON.parse(data) : [];
}

// カートをクリア
function clearCart() {
    localStorage.removeItem('hirolia_cart');
}

// ----- トースト通知 -----
function showToast(message, type = 'success', duration = 3000) {
    // 既存のトーストを削除
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 新しいトーストを作成
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // アニメーション表示
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 自動非表示
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// ----- モーダル制御 -----
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// ----- 金額フォーマット -----
function formatPrice(price) {
    return `¥${parseInt(price).toLocaleString()}`;
}

// ----- ダミーデータ生成 -----

// ダミーメニューデータ
function getDummyMenuItems() {
    return [
        // カレー
        {
            id: 1,
            name_ja: 'バターチキンカレーセット',
            name_en: 'Butter Chicken Curry Set',
            name_ne: 'बटर चिकन करी सेट',
            description_ja: 'まろやかな味わいの定番カレー。ナン・ライス・ドリンク付き',
            description_en: 'Classic mild curry with naan, rice, and drink',
            description_ne: 'नरम स्वाद सहितको क्लासिक करी',
            price: 1200,
            category: 'curry',
            image_url: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Butter+Chicken'
        },
        {
            id: 2,
            name_ja: 'キーマカレーセット',
            name_en: 'Keema Curry Set',
            name_ne: 'कीमा करी सेट',
            description_ja: 'ひき肉たっぷりのスパイシーカレー',
            description_en: 'Spicy minced meat curry',
            description_ne: 'मसालेदार मासु करी',
            price: 1100,
            category: 'curry',
            image_url: 'https://via.placeholder.com/400x300/F7931E/FFFFFF?text=Keema+Curry'
        },
        {
            id: 3,
            name_ja: 'ベジタブルカレーセット',
            name_en: 'Vegetable Curry Set',
            name_ne: 'तरकारी करी सेट',
            description_ja: '新鮮野菜たっぷりのヘルシーカレー',
            description_en: 'Healthy curry with fresh vegetables',
            description_ne: 'ताजा तरकारी सहितको करी',
            price: 1000,
            category: 'curry',
            image_url: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Vegetable+Curry'
        },
        
        // ナン
        {
            id: 4,
            name_ja: 'プレーンナン',
            name_en: 'Plain Naan',
            name_ne: 'प्लेन नान',
            description_ja: 'シンプルな焼きたてナン',
            description_en: 'Simple freshly baked naan',
            description_ne: 'साधारण ताजा नान',
            price: 300,
            category: 'naan',
            image_url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Plain+Naan'
        },
        {
            id: 5,
            name_ja: 'チーズナン',
            name_en: 'Cheese Naan',
            name_ne: 'चीज नान',
            description_ja: 'とろけるチーズ入りナン',
            description_en: 'Naan with melted cheese',
            description_ne: 'पग्लिएको चीज सहितको नान',
            price: 500,
            category: 'naan',
            image_url: 'https://via.placeholder.com/400x300/FFA500/FFFFFF?text=Cheese+Naan'
        },
        
        // ドリンク
        {
            id: 6,
            name_ja: 'マンゴーラッシー',
            name_en: 'Mango Lassi',
            name_ne: 'आँप लस्सी',
            description_ja: '甘くて爽やかなマンゴーヨーグルトドリンク',
            description_en: 'Sweet and refreshing mango yogurt drink',
            description_ne: 'मीठो र ताजा दही पेय',
            price: 400,
            category: 'drinks',
            image_url: 'https://via.placeholder.com/400x300/FFB347/FFFFFF?text=Mango+Lassi'
        },
        {
            id: 7,
            name_ja: 'チャイ',
            name_en: 'Chai',
            name_ne: 'चिया',
            description_ja: 'スパイスの効いた本格インドチャイ',
            description_en: 'Authentic spiced Indian tea',
            description_ne: 'मसालेदार भारतीय चिया',
            price: 300,
            category: 'drinks',
            image_url: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Chai'
        },
        
        // デザート
        {
            id: 8,
            name_ja: 'マンゴープリン',
            name_en: 'Mango Pudding',
            name_ne: 'आँप पुडिंग',
            description_ja: '濃厚マンゴーの冷たいデザート',
            description_en: 'Rich cold mango dessert',
            description_ne: 'धनी चिसो आँप मिठाई',
            price: 400,
            category: 'desserts',
            image_url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Mango+Pudding'
        },
        
        // サイドメニュー
        {
            id: 9,
            name_ja: 'タンドリーチキン',
            name_en: 'Tandoori Chicken',
            name_ne: 'तन्दूरी चिकन',
            description_ja: 'スパイシーな窯焼きチキン',
            description_en: 'Spicy oven-baked chicken',
            description_ne: 'मसालेदार ओभन पकाएको चिकन',
            price: 800,
            category: 'sides',
            image_url: 'https://via.placeholder.com/400x300/DC143C/FFFFFF?text=Tandoori+Chicken'
        },
        {
            id: 10,
            name_ja: 'サモサ(2個)',
            name_en: 'Samosa (2pcs)',
            name_ne: 'समोसा (२ वटा)',
            description_ja: 'サクサクのスパイシーな揚げ物',
            description_en: 'Crispy spicy fried pastry',
            description_ne: 'क्रिस्पी मसालेदार',
            price: 400,
            category: 'sides',
            image_url: 'https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Samosa'
        }
    ];
}

// ダミーオプションデータ
function getDummyOptions() {
    return {
        spiciness: [
            { id: 1, name_ja: '🌶️ 甘口', name_en: '🌶️ Mild', name_ne: '🌶️ हल्का', value: 1, price: 0 },
            { id: 2, name_ja: '🌶️🌶️ 中辛', name_en: '🌶️🌶️ Medium', name_ne: '🌶️🌶️ मध्यम', value: 2, price: 0 },
            { id: 3, name_ja: '🌶️🌶️🌶️ 辛口', name_en: '🌶️🌶️🌶️ Hot', name_ne: '🌶️🌶️🌶️ तातो', value: 3, price: 0 },
            { id: 4, name_ja: '🌶️🌶️🌶️🌶️ 激辛', name_en: '🌶️🌶️🌶️🌶️ Very Hot', name_ne: '🌶️🌶️🌶️🌶️ धेरै तातो', value: 4, price: 0 },
            { id: 5, name_ja: '🌶️🌶️🌶️🌶️🌶️ 極辛', name_en: '🌶️🌶️🌶️🌶️🌶️ Extra Hot', name_ne: '🌶️🌶️🌶️🌶️🌶️ अति तातो', value: 5, price: 0 }
        ],
        main: [
            { id: 6, name_ja: 'ナン', name_en: 'Naan', name_ne: 'नान', price: 0 },
            { id: 7, name_ja: 'ライス', name_en: 'Rice', name_ne: 'भात', price: 0 },
            { id: 8, name_ja: 'チーズナン', name_en: 'Cheese Naan', name_ne: 'चीज नान', price: 200 },
            { id: 9, name_ja: 'ガーリックナン', name_en: 'Garlic Naan', name_ne: 'लसुन नान', price: 150 }
        ],
        drinks: [
            { id: 10, name_ja: 'ラッシー', name_en: 'Lassi', name_ne: 'लस्सी', price: 0 },
            { id: 11, name_ja: 'マンゴーラッシー', name_en: 'Mango Lassi', name_ne: 'आँप लस्सी', price: 100 },
            { id: 12, name_ja: 'ウーロン茶', name_en: 'Oolong Tea', name_ne: 'उलोङ चिया', price: 0 },
            { id: 13, name_ja: 'ジャスミンティー', name_en: 'Jasmine Tea', name_ne: 'जास्मिन चिया', price: 0 }
        ],
        toppings: [
            { id: 14, name_ja: 'チーズ追加', name_en: 'Extra Cheese', name_ne: 'थप चीज', price: 150 },
            { id: 15, name_ja: '温泉卵', name_en: 'Soft-boiled Egg', name_ne: 'नरम अण्डा', price: 100 },
            { id: 16, name_ja: 'ほうれん草', name_en: 'Spinach', name_ne: 'पालुङ्गो', price: 100 },
            { id: 17, name_ja: 'パクチー', name_en: 'Coriander', name_ne: 'धनिया', price: 50 }
        ]
    };
}

// ----- ページ遷移 -----
function navigateTo(path) {
    window.location.href = path;
}

// ----- 初期化時に言語設定を復元 -----
document.addEventListener('DOMContentLoaded', () => {
    const lang = getCurrentLanguage();
    console.log('Current language:', lang);
});