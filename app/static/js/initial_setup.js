// ====================================
// 初期設定画面 JavaScript
// ====================================

let selectedTable = null;
let selectedLanguage = null;

// DOM要素
const tableInput = document.getElementById('table-number');
const tableError = document.getElementById('table-error');
const startBtn = document.getElementById('start-btn');
const languageBtns = document.querySelectorAll('.option-btn[data-lang]');

// 言語選択ボタンのイベント
languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 既存の選択を解除
        languageBtns.forEach(b => b.classList.remove('selected'));
        
        // 新しい言語を選択
        btn.classList.add('selected');
        selectedLanguage = btn.dataset.lang;
        
        // 言語を保存して画面を更新
        setLanguage(selectedLanguage);
        updateUILanguage();
        
        // ボタンの状態を更新
        checkFormValid();
    });
});

// テーブル番号入力のイベント
tableInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    
    // エラーをクリア
    tableError.classList.add('hidden');
    tableInput.classList.remove('error');
    
    if (value && value > 0 && value <= 50) {
        selectedTable = value;
    } else {
        selectedTable = null;
    }
    
    checkFormValid();
});

// フォームの検証
function checkFormValid() {
    if (selectedTable && selectedLanguage) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
}

// UI言語の更新
function updateUILanguage() {
    const lang = getCurrentLanguage();
    
    // テーブル番号セクション
    document.getElementById('table-title').textContent = t('enter_table');
    document.getElementById('table-label').textContent = t('table_number');
    
    // 開始ボタン
    startBtn.textContent = t('start_order');
}

// 開始ボタンのクリック
startBtn.addEventListener('click', () => {
    // バリデーション
    if (!selectedTable || !selectedLanguage) {
        showToast('テーブル番号と言語を選択してください', 'error');
        return;
    }
    
    if (selectedTable < 1 || selectedTable > 50) {
        tableError.textContent = '有効なテーブル番号を入力してください (1-50)';
        tableError.classList.remove('hidden');
        tableInput.classList.add('error');
        return;
    }
    
    // セッションデータを保存
    saveSessionData({
        tableNumber: selectedTable,
        language: selectedLanguage,
        startTime: new Date().toISOString()
    });
    
    // アンケート画面に遷移
    navigateTo('/customer/survey');
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // 既存の言語設定を復元
    const savedLang = getCurrentLanguage();
    if (savedLang) {
        const langBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        if (langBtn) {
            langBtn.click();
        }
    }
    
    // 既存のセッションデータをチェック
    const session = getSessionData();
    if (session.tableNumber) {
        tableInput.value = session.tableNumber;
        selectedTable = session.tableNumber;
        checkFormValid();
    }
});