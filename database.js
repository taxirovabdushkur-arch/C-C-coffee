const Database = require('better-sqlite3');
const db = new Database('t7coffee.db');

// Создаём таблицы если их нет
db.exec(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    category    TEXT    NOT NULL,
    description TEXT,
    price       TEXT    NOT NULL,
    icon        TEXT    DEFAULT '☕',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    phone      TEXT NOT NULL,
    message    TEXT,
    items      TEXT,
    status     TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Заполняем меню начальными данными если таблица пустая
const count = db.prepare('SELECT COUNT(*) as c FROM menu_items').get();
if (count.c === 0) {
  const insert = db.prepare(
    'INSERT INTO menu_items (name, category, description, price, icon) VALUES (?, ?, ?, ?, ?)'
  );
  const items = [
    ['Эспрессо',     'coffee',  'Насыщенный, концентрированный. Основа всего.',             'от 12 000 сум', '☕'],
    ['Американо',    'coffee',  'Эспрессо с горячей водой — мягкий и ароматный.',           'от 14 000 сум', '☕'],
    ['Капучино',     'coffee',  'Эспрессо, молоко и воздушная пенка.',                      'от 18 000 сум', '☕'],
    ['Латте',        'coffee',  'Нежный кофе с большим количеством молока.',                'от 20 000 сум', '☕'],
    ['Раф',          'coffee',  'Сливочный кофе на основе сливок — наш фирменный фаворит.', 'от 22 000 сум', '☕'],
    ['Айс Латте',    'cold',    'Классический латте со льдом.',                             'от 22 000 сум', '🧊'],
    ['Холодный Брю', 'cold',    'Кофе холодного заваривания — мягкий вкус.',                'от 24 000 сум', '🧊'],
    ['Фраппе',       'cold',    'Взбитый ледяной кофе с молоком.',                          'от 24 000 сум', '🧊'],
    ['Матча Латте',  'cold',    'Японский матча с молоком.',                                'от 26 000 сум', '🍵'],
    ['Зелёный чай',  'tea',     'Классический китайский зелёный чай.',                      'от 10 000 сум', '🍵'],
    ['Чёрный чай',   'tea',     'Крепкий и ароматный — с молоком или без.',                 'от 10 000 сум', '🍵'],
    ['Травяной сбор','tea',     'Мята, ромашка, мелисса.',                                  'от 12 000 сум', '🍵'],
    ['Чизкейк',      'dessert', 'Нежный классический чизкейк Нью-Йорк.',                   'от 25 000 сум', '🍰'],
    ['Брауни',       'dessert', 'Шоколадный брауни — плотный, тёмный.',                    'от 18 000 сум', '🍫'],
    ['Круассан',     'dessert', 'Хрустящий, слоёный — со сливочным маслом.',               'от 16 000 сум', '🥐'],
    ['Маффин',       'dessert', 'Пышный маффин — черничный, шоколадный или ванильный.',    'от 14 000 сум', '🍩'],
  ];
  items.forEach(i => insert.run(...i));
  console.log('✅ База данных заполнена начальными данными');
}

module.exports = db;