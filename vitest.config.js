import { defineConfig } from 'vitest/config'

// Vitest 配置：独立于 vite.config.js（不加载 React/Tailwind 插件，保持纯函数测试轻量）
// 测试对象为 src/data、src/i18n、src/utils 下的纯函数与数据完整性，无需 DOM 环境
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
})
