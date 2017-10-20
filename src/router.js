/**
 * Created by LangK on 2016/12/19.
 */

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/home/homepage'
  },
  {
    path: '/home',
    component: function (resolve) {
      require(['./components/home.vue'], resolve)
    },
    children: [
      {
        path: 'homepage',
        // 首页
        component: function (resolve) {
          require(['./components/homepage/homepage.vue'], resolve)
        }
      }, {
        path: 'about',
        // 关于我
        component: function (resolve) {
          require(['./components/about/about.vue'], resolve)
        }
      }, {
        path: 'compile',
        // 旧站
        component: function (resolve) {
          require(['./components/compile/compile.vue'], resolve)
        }
      }, {
        path: 'catalog',
        // 目录
        component: function (resolve) {
          require(['./components/catalog/catalog.vue'], resolve)
        }
      }, {
        path: 'archives',
        // 标签云
        component: function (resolve) {
          require(['./components/archives/archives.vue'], resolve)
        }
      }, {
        path: 'tags',
        // 归档
        component: function (resolve) {
          require(['./components/tags/tags.vue'], resolve)
        }
      }, {
        path: 'content',
        // 详情
        component: function (resolve) {
          require(['./components/content/content.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/login',
    component: function (resolve) {
      require(['./components/login.vue'], resolve)
    }
  }
]
