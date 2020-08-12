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
            path: 'detail/1/:id',
            components: {
                default: () => import('@/components/NowPlaying'),
                detail : () => import('@/views/Movie/detail') //    只渲染到name=detail的router-view
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:id',
            components: {
                default: () => import('@/components/ComingSoon'),
                detail : () => import('@/views/Movie/detail') //    只渲染到name=detail的router-view
            },
            props: {
                detail: true
            }
        },
        {
            path: '',
            redirect: '/movie/nowPlaying'
        }
    ]
}