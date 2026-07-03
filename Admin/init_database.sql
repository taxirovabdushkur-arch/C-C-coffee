-- Создание таблицы admin_users для управления администраторами и менеджерами
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  login VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'manager')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Создание индекса по логину для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_admin_users_login ON admin_users(login);

-- Вставка тестовых аккаунтов
-- Администратор
INSERT INTO admin_users (login, password, role, first_name, last_name, email)
VALUES ('admin', 'admin123', 'admin', 'Администратор', 'Системы', 'admin@t7coffee.uz')
ON CONFLICT (login) DO UPDATE SET password = 'admin123', role = 'admin';

-- Менеджер
INSERT INTO admin_users (login, password, role, first_name, last_name, email)
VALUES ('manager', 'manager123', 'manager', 'Менеджер', 'Кофейни', 'manager@t7coffee.uz')
ON CONFLICT (login) DO UPDATE SET password = 'manager123', role = 'manager';

-- Предоставление доступа к таблице
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Политики доступа (если необходимо)
DROP POLICY IF NOT EXISTS allow_all ON admin_users;
CREATE POLICY allow_all ON admin_users FOR ALL USING (true);

-- ══ Таблица медиа сайта ══
CREATE TABLE IF NOT EXISTS site_media (
  key VARCHAR(50) PRIMARY KEY,
  url TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'image',
  label VARCHAR(100),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF NOT EXISTS allow_all ON site_media;
CREATE POLICY allow_all ON site_media FOR ALL USING (true);

-- Начальные медиафайлы
INSERT INTO site_media (key, url, type, label) VALUES
  ('gallery_1', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', 'image', 'Галерея 1'),
  ('gallery_2', 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=600&q=80', 'image', 'Галерея 2'),
  ('gallery_3', 'https://images.unsplash.com/photo-1521302200778-33500795e128?w=600&q=80', 'image', 'Галерея 3'),
  ('gallery_4', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', 'image', 'Галерея 4'),
  ('gallery_5', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80', 'image', 'Галерея 5'),
  ('gallery_6', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80', 'image', 'Галерея 6'),
  ('gallery_7', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80', 'image', 'Галерея 7'),
  ('gallery_8', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80', 'image', 'Галерея 8'),
  ('gallery_9', 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80', 'image', 'Галерея 9'),
  ('about_video', '/videos/about.mp4', 'video', 'Видео "О нас"'),
  ('hero_bg', 'https://images.pexels.com/photos/8847017/pexels-photo-8847017.jpeg?auto=compress&cs=tinysrgb&w=1920', 'image', 'Фон главного экрана')
ON CONFLICT (key) DO NOTHING;
