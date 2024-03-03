import { createApp, nextTick } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import P1 from './components/Page1.vue'
import P2 from './components/Page2.vue'
import H0 from './components/home.vue'
import { createPinia } from 'pinia'
import { profile, useStatusStore } from '@/use'
import { computed } from 'vue';
import { useTitle } from '@vueuse/core'

const pinia = createPinia()
const stateStore = useStatusStore(pinia)

const routes = [
  { name:'Home', path: '/', component: H0 },
  { name:'Page1', path: '/1', component: P1 },
  { name:'Page2', path: '/2', component: P2 },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'auto'
      }
    }
  },
});

export default router

export const currentRoute = computed(() => {
  return <string>router.currentRoute.value.name
})

router.beforeEach((to) => {
  if (!to.fullPath.includes('#')) {
    stateStore.setLoading(true)
  }
  stateStore.RouteDestiny(to.fullPath)
})
router.afterEach((_to, _from, failure) => {
  stateStore.setLoading(false)
  if (failure) {
    
  }
  nextTick(() => {
    stateStore.updateHeadings()
  })
})
router.onError((err) => {
  console.log(err)
  if (err.toString().includes('Failed to fetch')) {
    window.location.href = stateStore.to
  }
})

useTitle(
  computed(() => {
    if (!currentRoute.value) return profile.TEAM_NAME
    return currentRoute.value + ' | ' + profile.TEAM_NAME
  })
)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
