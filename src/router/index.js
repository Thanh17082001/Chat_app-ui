import chatComponentVue from "@/components/chatComponent.vue";
import HelloWorldVue from "@/components/HelloWorld.vue";
import tableComponentVue from "@/components/tableComponent.vue";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    { path: '/', component: HelloWorldVue },
    { path: '/chat', component: chatComponentVue },
    { path: '/table', component: tableComponentVue }
]

 const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

export default router;