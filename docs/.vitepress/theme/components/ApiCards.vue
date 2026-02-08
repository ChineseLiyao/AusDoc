<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="api-cards">
    <a 
      v-for="item in items" 
      :key="item.link" 
      :href="item.link"
      class="api-card"
    >
      <div class="card-content">
        <div class="card-icon">{{ item.type === 'page' ? '📄' : '🗃️' }}</div>
        <div class="card-text">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
      <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  </div>
</template>

<style scoped>
.api-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.api-card {
  position: relative;
  display: block;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.api-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-elv);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.card-icon {
  font-size: 24px;
  line-height: 1;
  flex-shrink: 0;
}

.card-text {
  flex: 1;
  min-width: 0;
}

.api-card h3 {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.api-card p {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.api-card .arrow {
  position: absolute;
  right: 16px;
  top: 16px;
  color: var(--vp-c-text-3);
  transition: all 0.3s ease;
}

.api-card:hover .arrow {
  color: var(--vp-c-brand-1);
  transform: translate(2px, -2px);
}

@media (max-width: 768px) {
  .api-cards {
    grid-template-columns: 1fr;
  }
}
</style>
