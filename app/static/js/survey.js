// ====================================
// アンケート画面 JavaScript
// ====================================

let selectedCustomerType = null;
let selectedPartySize = null;

// DOM要素
const customerTypeItems = document.querySelectorAll('#customer-type-container .swipe-item');
const partySizeItems = document.querySelectorAll('#party-size-container .swipe-item');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');

// 客層選択
customerTypeItems.forEach(item => {
    item.addEventListener('click', () => {
        // 既存の選択を解除
        customerTypeItems.forEach(i => i.classList.remove('selected'));
        
        // 新しい選択
        item.classList.add('selected');
        selectedCustomerType = item.dataset.type;
        
        // ボタンの状態を更新
        checkFormValid();
    });
});

// 人数選択
partySizeItems.forEach(item => {
    item.addEventListener('click', () => {
        // 既存の選択を解除
        partySizeItems.forEach(i => i.classList.remove('selected'));
        
        // 新しい選択
        item.classList.add('selected');
        selectedPartySize = parseInt(item.dataset.size);
        
        // ボタンの状態を更新
        checkFormValid();
    });
});

// フォームの検証
function checkFormValid() {
    if (selectedCustomerType && selectedPartySize) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

// UI言語の更新
function updateUILanguage() {
    const lang = getCurrentLanguage();
    
    // ヘッダー
    document.getElementById('header-subtitle').textContent = '📋 ' + (
        lang === 'ja' ? 'アンケート' :
        lang === 'en' ? 'Survey' :
        'सर्वेक्षण'
    );
    
    // タイトル
    document.getElementById('customer-type-title').textContent = t('customer_type');
    document.getElementById('party-size-title').textContent = t('party_size');
    
    // 翻訳可能な要素を更新
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });
}

// 戻るボタン
backBtn.addEventListener('click', () => {
    navigateTo('/customer/table');
});

// 次へボタン
nextBtn.addEventListener('click', () => {
    if (!selectedCustomerType || !selectedPartySize) {
        showToast('客層と人数を選択してください', 'error');
        return;
    }
    
    // セッションデータに追加
    saveSessionData({
        customerType: selectedCustomerType,
        partySize: selectedPartySize
    });
    
    showToast('アンケートありがとうございます!', 'success', 2000);
    
    // メニュー画面に遷移
    setTimeout(() => {
        navigateTo('/customer/menu');
    }, 2000);
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // 言語設定を確認
    const session = getSessionData();
    if (!session.tableNumber || !session.language) {
        // セッションがない場合は初期設定画面に戻る
        navigateTo('/customer/table');
        return;
    }
    
    // UI言語を更新
    updateUILanguage();
    
    // 既存のアンケートデータを復元
    if (session.customerType) {
        const typeItem = document.querySelector(`[data-type="${session.customerType}"]`);
        if (typeItem) {
            typeItem.click();
        }
    }
    
    if (session.partySize) {
        const sizeItem = document.querySelector(`[data-size="${session.partySize}"]`);
        if (sizeItem) {
            sizeItem.click();
        }
    }
});