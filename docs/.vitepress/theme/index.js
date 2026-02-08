import DefaultTheme from 'vitepress/theme'
import ApiCards from './components/ApiCards.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ApiCards', ApiCards)
  }
}
