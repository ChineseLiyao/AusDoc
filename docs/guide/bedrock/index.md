---
title: Bedrock版指南
order: 1
---

# Bedrock开服指南

了解如何开一个基岩版服务器。

## 核心选择

根据不同的核心有不同的开服方法。

<script setup>
import ApiCards from '../../.vitepress/theme/components/ApiCards.vue'

const myCards = [
  { 
    title: 'BDS 原版核心', 
    desc: 'Mojang 官方服务器', 
    link: '/guide/bedrock/bds',
    type: 'page'
  },
  { 
    title: 'Endstone', 
    desc: '新兴插件加载器', 
    link: '/guide/bedrock/endstone',
    type: 'page'
  }
]
</script>

<ApiCards :items="myCards" />