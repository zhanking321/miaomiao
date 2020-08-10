export default {
    path: '/cinema',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Cinema')  //   @表示src目录
}