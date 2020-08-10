export default {
    path: '/movie',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City'),
        },
        {
            path: 'search',
            component: () => import('@/components/Search'),
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying'),
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon'),
        },
        {
            path: '',
            redirect: '/movie/nowPlaying'
        }
    ]
}