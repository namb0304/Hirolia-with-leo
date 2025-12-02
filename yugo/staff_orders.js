// --------------------
// デモデータ
// --------------------
let tables = [
    {id:1, occupied:true, orders:[{name:'ラーメン', status:'order', minutes:0},{name:'餃子', status:'order', minutes:0}], notification:true},
    {id:2, occupied:true, orders:[{name:'チャーハン', status:'order', minutes:0}], notification:false},
    {id:3, occupied:false, orders:[], notification:false},
    {id:4, occupied:true, orders:[{name:'唐揚げ', status:'order', minutes:0}], notification:true},
];

// --------------------
// テーブル描画
// --------------------
function renderTables(){
    const container = document.getElementById('tablesContainer');
    container.innerHTML = '';
    tables.forEach(t=>{
        // テーブル行
        const div = document.createElement('div');
        div.classList.add('table');
        div.classList.add(t.occupied ? 'occupied':'empty');
        div.innerHTML = `<span>テーブル #${t.id}</span>`;
        if(t.notification){
            const notif = document.createElement('span');
            notif.classList.add('notification');
            notif.textContent='!';
            div.appendChild(notif);
        }

        // 注文アコーディオン
        const ordersDiv = document.createElement('div');
        ordersDiv.classList.add('orders');
        t.orders.forEach(o=>{
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            if(o.status==='order'){
                if(o.minutes>=15) orderItem.classList.add('status-alert');
                else if(o.minutes>=10) orderItem.classList.add('status-warning');
                else orderItem.classList.add('status-order');
            } else {
                orderItem.classList.add('status-delivered');
            }
            orderItem.innerHTML = `<span>${o.name}</span> <button>渡し済み</button>`;
            // 渡し済みボタンクリックでステータス変更
            orderItem.querySelector('button').addEventListener('click',(e)=>{
                e.stopPropagation();
                o.status='delivered';
                renderTables();
            });
            ordersDiv.appendChild(orderItem);
        });

        div.addEventListener('click',()=>{
            ordersDiv.style.display = ordersDiv.style.display==='none'?'block':'none';
        });

        container.appendChild(div);
        container.appendChild(ordersDiv);
    });
}

// --------------------
// タイマー（簡易デモ: 1秒=1分換算）
// --------------------
setInterval(()=>{
    tables.forEach(t=>{
        t.orders.forEach(o=>{
            if(o.status==='order') o.minutes++;
        });
    });
    renderTables();
},1000);

// 初期描画
renderTables();
