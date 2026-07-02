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
