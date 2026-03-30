module.exports = {
  apps: [
    {
      name: "lkz-site",

      // Запускаем через Next.js напрямую
      script: "node_modules/next/dist/bin/next",
      args: "start",

      // 2 воркера — если один упал, второй продолжает отвечать
      instances: 2,
      exec_mode: "cluster",

      // Авторестарт при утечке памяти
      max_memory_restart: "400M",

      // Защита от boot-loop: если упал быстрее 10 сек — считается сбоем
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 2000,

      watch: false,

      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      // Логи
      error_file: "/var/log/pm2/lkz-site.error.log",
      out_file: "/var/log/pm2/lkz-site.out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
