const express  = require('express');
const cors     = require('cors');
const path     = require('path');
require('dotenv').config();

const db       = require('./database');
const app      = express();
const PORT     = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Фронт-сайт
app.use(express.static(path.join(__dirname, 'public')));

// Панель админа
app.use('/admin', express.static(path.join(__dirname, 'admin')));

/* ====== API: МЕНЮ ====== */

// Получить всё меню
app.get('/api/menu', (req, res) => {
  const items = db.prepare('SELECT * FROM menu_items ORDER BY category, id').all();
  res.json(items);
});

// Получить один товар по ID
app.get('/api/menu/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Товар не найден' });
  res.json(item);
});

// Добавить товар (только админ)
app.post('/api/menu', (req, res) => {
  const { name, category, description, price, icon } = req.body;
  if (!name || !category || !price) return res.status(400).json({ error: 'Заполните все поля' });
  const result = db.prepare(
    'INSERT INTO menu_items (name, category, description, price, icon) VALUES (?, ?, ?, ?, ?)'
  ).run(name, category, description || '', price, icon || '☕');
  res.json({ id: result.lastInsertRowid, message: 'Товар добавлен' });
});

// Обновить товар
app.put('/api/menu/:id', (req, res) => {
  const { name, category, description, price, icon } = req.body;
  db.prepare(
    'UPDATE menu_items SET name=?, category=?, description=?, price=?, icon=? WHERE id=?'
  ).run(name, category, description, price, icon, req.params.id);
  res.json({ message: 'Товар обновлён' });
});

// Удалить товар
app.delete('/api/menu/:id', (req, res) => {
  db.prepare('DELETE FROM menu_items WHERE id = ?').run(req.params.id);
  res.json({ message: 'Товар удалён' });
});

/* ====== API: ЗАКАЗЫ ====== */

// Получить все заказы (для админа)
app.get('/api/orders', (req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.json(orders);
});

// Создать новый заказ (с сайта)
app.post('/api/orders', (req, res) => {
  const { name, phone, message, items } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Имя и телефон обязательны' });
  const result = db.prepare(
    'INSERT INTO orders (name, phone, message, items, status) VALUES (?, ?, ?, ?, ?)'
  ).run(name, phone, message || '', JSON.stringify(items || []), 'new');
  res.json({ id: result.lastInsertRowid, message: 'Заказ принят!' });
});

// Обновить статус заказа
app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE orders SET status=? WHERE id=?').run(status, req.params.id);
  res.json({ message: 'Статус обновлён' });
});

// Удалить заказ
app.delete('/api/orders/:id', (req, res) => {
  db.prepare('DELETE FROM orders WHERE id=?').run(req.params.id);
  res.json({ message: 'Заказ удалён' });
});

app.listen(PORT, () => {
  console.log(`✅ T7 Coffee сервер запущен: http://localhost:${PORT}`);
  console.log(`☕ Панель админа:          http://localhost:${PORT}/admin`);
});