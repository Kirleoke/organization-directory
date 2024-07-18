import { createRouter, createWebHistory } from 'vue-router';
import OrganizationTable from '../components/OrganizationTable.vue';

const routes = [
  {
    name: 'Page',
    component: OrganizationTable,
  },
  {
    path: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
