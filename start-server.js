#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 3002;
let attempts = 0;
const MAX_ATTEMPTS = 5;

function startServer() {
  attempts++;
  console.log(`\n🚀 Попытка запуска ${attempts}/${MAX_ATTEMPTS}...`);

  const server = spawn('node', ['Admin/server.js'], {
    cwd: path.dirname(__filename),
    env: { ...process.env, PORT },
    stdio: 'inherit'
  });

  server.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Сервер завершил работу нормально');
      process.exit(0);
    } else {
      console.error(`❌ Сервер упал с кодом ${code}`);

      if (attempts < MAX_ATTEMPTS) {
        console.log(`⏳ Перезагрузка через 3 секунды...`);
        setTimeout(startServer, 3000);
      } else {
        console.error('❌ Достигнут лимит попыток перезагрузки');
        process.exit(1);
      }
    }
  });

  server.on('error', (err) => {
    console.error('❌ Ошибка при запуске сервера:', err);
  });
}

console.log('═══════════════════════════════════════');
console.log('☕  T7 Coffee Admin Panel');
console.log('═══════════════════════════════════════');
console.log(`📍 Портс: ${PORT}`);
console.log(`🔄 Автоперезагрузка: ВКЛ`);
console.log('═══════════════════════════════════════\n');

startServer();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Получен сигнал выключения...');
  process.exit(0);
});
