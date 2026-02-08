---
title: 快速开始
order: 2
---
# 快速开始

此处是文档总目录

## 内容

查询开服指南。

<script setup>
import ApiCards from '../.vitepress/theme/components/ApiCards.vue'

const myCards = [
  { 
    title: 'Bedrock开服指南', 
    desc: '了解如何开一个基岩版服务器', 
    link: 'bedrock/',
    type: 'page'
  }
]
</script>

<ApiCards :items="myCards" />