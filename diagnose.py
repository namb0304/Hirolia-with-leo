from flask import Blueprint, render_template, request, jsonify

customer_bp = Blueprint('customer', __name__, url_prefix='/customer')

# ダミーデータ
DUMMY_MENU_ITEMS = [
    {
        'id': 1,
        'name_ja': 'バターチキンカレーセット',
        'name_en': 'Butter Chicken Curry Set',
        'name_ne': 'बटर चिकन करी सेट',
        'price': 1200,
        'category_ja': 'カレー',
        'category_en': 'Curry',
        'category_ne': 'करी',
        'image_url': '🍛',
        'description_ja': '人気No.1のマイルドなカレー',
        'description_en': 'Most popular mild curry',
        'description_ne': 'सबैभन्दा लोकप्रिय हल्का करी',
        'is_set': True,
        'options': {
            'spiciness': {
                'label_ja': '辛さ',
                'label_en': 'Spiciness',
                'label_ne': 'तातोपन',
                'required': True,
                'type': 'single',
                'choices': [
                    {'value': 1, 'label': '🌶️', 'price': 0},
                    {'value': 2, 'label': '🌶️🌶️', 'price': 0},
                    {'value': 3, 'label': '🌶️🌶️🌶️', 'price': 0},
                    {'value': 4, 'label': '🌶️🌶️🌶️🌶️', 'price': 0},
                    {'value': 5, 'label': '🌶️🌶️🌶️🌶️🌶️', 'price': 0}
                ]
            },
            'main': {
                'label_ja': 'メイン',
                'label_en': 'Main',
                'label_ne': 'मुख्य',
                'required': True,
                'type': 'single',
                'choices': [
                    {'value': 'naan', 'label_ja': 'ナン', 'label_en': 'Naan', 'label_ne': 'नान', 'price': 0},
                    {'value': 'rice', 'label_ja': 'ライス', 'label_en': 'Rice', 'label_ne': 'भात', 'price': 0},
                    {'value': 'cheese_naan', 'label_ja': 'チーズナン', 'label_en': 'Cheese Naan', 'label_ne': 'चीज नान', 'price': 200},
                    {'value': 'garlic_naan', 'label_ja': 'ガーリックナン', 'label_en': 'Garlic Naan', 'label_ne': 'लसुन नान', 'price': 150}
                ]
            },
            'drink': {
                'label_ja': 'ドリンク',
                'label_en': 'Drink',
                'label_ne': 'पेय',
                'required': True,
                'type': 'single',
                'choices': [
                    {'value': 'lassi', 'label_ja': 'ラッシー', 'label_en': 'Lassi', 'label_ne': 'लस्सी', 'price': 0},
                    {'value': 'mango_lassi', 'label_ja': 'マンゴーラッシー', 'label_en': 'Mango Lassi', 'label_ne': 'आँप लस्सी', 'price': 0},
                    {'value': 'oolong', 'label_ja': 'ウーロン茶', 'label_en': 'Oolong Tea', 'label_ne': 'ऊलोङ्ग चिया', 'price': 0},
                    {'value': 'jasmine', 'label_ja': 'ジャスミンティー', 'label_en': 'Jasmine Tea', 'label_ne': 'जास्मिन चिया', 'price': 0}
                ]
            },
            'side': {
                'label_ja': 'サイドメニュー',
                'label_en': 'Side Menu',
                'label_ne': 'साइड मेनु',
                'required': False,
                'type': 'multiple',
                'choices': [
                    {'value': 'salad', 'label_ja': 'サラダ', 'label_en': 'Salad', 'label_ne': 'सलाद', 'price': 200},
                    {'value': 'tandoori', 'label_ja': 'タンドリーチキン', 'label_en': 'Tandoori Chicken', 'label_ne': 'तन्दुरी चिकन', 'price': 300},
                    {'value': 'samosa', 'label_ja': 'サモサ', 'label_en': 'Samosa', 'label_ne': 'समोसा', 'price': 150}
                ]
            }
        }
    },
    {
        'id': 2,
        'name_ja': 'チキンティッカマサラセット',
        'name_en': 'Chicken Tikka Masala Set',
        'name_ne': 'चिकन टिक्का मसाला सेट',
        'price': 1300,
        'category_ja': 'カレー',
        'category_en': 'Curry',
        'category_ne': 'करी',
        'image_url': '🍛',
        'description_ja': 'スパイシーで濃厚な味わい',
        'description_en': 'Spicy and rich flavor',
        'description_ne': 'मसालेदार र धनी स्वाद',
        'is_set': True,
        'options': {
            'spiciness': {
                'label_ja': '辛さ',
                'label_en': 'Spiciness',
                'label_ne': 'तातोपन',
                'required': True,
                'type': 'single',
                'choices': [
                    {'value': 1, 'label': '🌶️', 'price': 0},
                    {'value': 2, 'label': '🌶️🌶️', 'price': 0},
                    {'value': 3, 'label': '🌶️🌶️🌶️', 'price': 0},
                    {'value': 4, 'label': '🌶️🌶️🌶️🌶️', 'price': 0},
                    {'value': 5, 'label': '🌶️🌶️🌶️🌶️🌶️', 'price': 0}
                ]
            },
            'main': {
                'label_ja': 'メイン',
                'label_en': 'Main',
                'label_ne': 'मुख्य',
                'required': True,
                'type': 'single',
                'choices': [
                    {'value': 'naan', 'label_ja': 'ナン', 'label_en': 'Naan', 'label_ne': 'नान', 'price': 0},
                    {'value': 'rice', 'label_ja': 'ライス', 'label_en': 'Rice', 'label_ne': 'भात', 'price': 0},
                    {'value': 'cheese_naan', 'label_ja': 'チーズナン', 'label_en': 'Cheese Naan', 'label_ne': 'चीज नान', 'price': 200},
                    {'value': 'garlic_naan', 'label_ja': 'ガーリックナン', 'label_en': 'Garlic Naan', 'label_ne': 'लसुन नान', 'price': 150}
                ]
            },
            'drink': {
                'label_ja': 'ドリンク',
                'label_en': 'Drink',
                'label_ne': 'पेय',
                'required': True,
                'type': 'single',
                'choices': [
                    {'value': 'lassi', 'label_ja': 'ラッシー', 'label_en': 'Lassi', 'label_ne': 'लस्सी', 'price': 0},
                    {'value': 'mango_lassi', 'label_ja': 'マンゴーラッシー', 'label_en': 'Mango Lassi', 'label_ne': 'आँप लस्सी', 'price': 0}
                ]
            }
        }
    },
    {
        'id': 3,
        'name_ja': 'ナン単品',
        'name_en': 'Naan',
        'name_ne': 'नान',
        'price': 300,
        'category_ja': 'サイドメニュー',
        'category_en': 'Side Menu',
        'category_ne': 'साइड मेनु',
        'image_url': '🍞',
        'description_ja': 'もちもちのプレーンナン',
        'description_en': 'Chewy plain naan',
        'description_ne': 'चपटी सादा नान',
        'is_set': False
    },
    {
        'id': 4,
        'name_ja': 'マンゴーラッシー',
        'name_en': 'Mango Lassi',
        'name_ne': 'आँप लस्सी',
        'price': 400,
        'category_ja': 'ドリンク',
        'category_en': 'Drink',
        'category_ne': 'पेय',
        'image_url': '🥤',
        'description_ja': '濃厚マンゴーの甘さ',
        'description_en': 'Rich mango sweetness',
        'description_ne': 'धनी आँपको मिठास',
        'is_set': False
    }
]

# 初期設定画面(テーブル番号入力 + 言語選択)
@customer_bp.route('/table', methods=['GET'])
def initial_setup():
    return render_template('customer/initial_setup.html')

# アンケート画面
@customer_bp.route('/survey', methods=['GET'])
def survey():
    table_number = request.args.get('table')
    language = request.args.get('lang', 'ja')
    return render_template('customer/survey.html', table_number=table_number, language=language)

# メニュー一覧画面
@customer_bp.route('/menu', methods=['GET'])
def menu_list():
    language = request.args.get('lang', 'ja')
    return render_template('customer/menu_list.html', language=language)

# メニューデータ取得API
@customer_bp.route('/api/menu', methods=['GET'])
def get_menu():
    return jsonify(DUMMY_MENU_ITEMS)

# 商品詳細画面
@customer_bp.route('/menu/<int:item_id>', methods=['GET'])
def menu_detail(item_id):
    language = request.args.get('lang', 'ja')
    item = next((item for item in DUMMY_MENU_ITEMS if item['id'] == item_id), None)
    if not item:
        return "商品が見つかりません", 404
    return render_template('customer/menu_detail.html', item=item, language=language)

# カート画面
@customer_bp.route('/cart', methods=['GET'])
def cart():
    language = request.args.get('lang', 'ja')
    return render_template('customer/cart.html', language=language)

# 注文履歴・会計画面
@customer_bp.route('/history', methods=['GET'])
def history():
    language = request.args.get('lang', 'ja')
    return render_template('customer/history.html', language=language)

# レジ案内画面(最終)
@customer_bp.route('/receipt', methods=['GET'])
def receipt():
    language = request.args.get('lang', 'ja')
    return render_template('customer/receipt.html', language=language)