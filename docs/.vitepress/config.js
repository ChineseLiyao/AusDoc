import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar.js'
import path from 'path'

const guideSidebar = generateSidebar(path.resolve(__dirname, '../guide'), 'guide')

export default defineConfig({
  base: '/',
  title: 'AusDoc',
  description: 'AusJava 服务器文档站点',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '关于', link: '/about' }
    ],

    // 自动生成的侧边栏
    sidebar: {
      '/guide/': guideSidebar
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ChineseLiyao' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present AusJava'
    },

    // 启用本地搜索
    search: {
      provider: 'local'
    }
  }
})