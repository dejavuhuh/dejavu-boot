// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { winPath } = utils; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV, GA_KEY } = process.env;
export const constantMenuRouterMap = [
  {
    id: 1,
    path: '/system',
    name: 'system',
    icon: 'setting',
    routes: [
      {
        id: 2,
        name: 'menu',
        icon: '',
        path: '/system/menus',
        component: './system/menu',
      },
    ],
  },
  {
    id: 3,
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        id: 4,
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        id: 5,
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        id: 6,
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    id: 7,
    path: '/form',
    icon: 'form',
    name: 'form',
    routes: [
      {
        id: 8,
        name: 'basic-form',
        icon: 'smile',
        path: '/form/basic-form',
        component: './form/basic-form',
      },
      {
        id: 9,
        name: 'step-form',
        icon: 'smile',
        path: '/form/step-form',
        component: './form/step-form',
      },
      {
        id: 10,
        name: 'advanced-form',
        icon: 'smile',
        path: '/form/advanced-form',
        component: './form/advanced-form',
      },
    ],
  },
  {
    id: 11,
    path: '/list',
    icon: 'table',
    name: 'list',
    routes: [
      {
        id: 12,
        path: '/list/search',
        name: 'search-list',
        component: './list/search',
        routes: [
          {
            path: '/list/search',
            redirect: '/list/search/articles',
          },
          {
            id: 13,
            name: 'articles',
            icon: 'smile',
            path: '/list/search/articles',
            component: './list/search/articles',
          },
          {
            id: 14,
            name: 'projects',
            icon: 'smile',
            path: '/list/search/projects',
            component: './list/search/projects',
          },
          {
            id: 15,
            name: 'applications',
            icon: 'smile',
            path: '/list/search/applications',
            component: './list/search/applications',
          },
        ],
      },
      {
        id: 16,
        name: 'table-list',
        icon: 'smile',
        path: '/list/table-list',
        component: './list/table-list',
      },
      {
        id: 17,
        name: 'basic-list',
        icon: 'smile',
        path: '/list/basic-list',
        component: './list/basic-list',
      },
      {
        id: 18,
        name: 'card-list',
        icon: 'smile',
        path: '/list/card-list',
        component: './list/card-list',
      },
    ],
  },
  {
    id: 19,
    path: '/profile',
    name: 'profile',
    icon: 'profile',
    routes: [
      {
        id: 20,
        name: 'basic',
        icon: 'smile',
        path: '/profile/basic',
        component: './profile/basic',
      },
      {
        id: 21,
        name: 'advanced',
        icon: 'smile',
        path: '/profile/advanced',
        component: './profile/advanced',
      },
    ],
  },
  {
    id: 22,
    name: 'result',
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
      {
        id: 23,
        name: 'success',
        icon: 'smile',
        path: '/result/success',
        component: './result/success',
      },
      {
        id: 24,
        name: 'fail',
        icon: 'smile',
        path: '/result/fail',
        component: './result/fail',
      },
    ],
  },
  {
    id: 25,
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    routes: [
      {
        id: 26,
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: './exception/403',
      },
      {
        id: 27,
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: './exception/404',
      },
      {
        id: 28,
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: './exception/500',
      },
    ],
  },
  {
    id: 29,
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        id: 30,
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        id: 31,
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    id: 32,
    name: 'editor',
    icon: 'highlight',
    path: '/editor',
    routes: [
      {
        id: 33,
        name: 'flow',
        icon: 'smile',
        path: '/editor/flow',
        component: './editor/flow',
      },
      {
        id: 34,
        name: 'mind',
        icon: 'smile',
        path: '/editor/mind',
        component: './editor/mind',
      },
      {
        id: 35,
        name: 'koni',
        icon: 'smile',
        path: '/editor/koni',
        component: './editor/koni',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard/analysis',
    authority: ['admin', 'user'],
  },
  {
    component: '404',
  },
];

export default defineConfig({
  hash: true,
  antd: {},
  analytics: GA_KEY
    ? {
        ga: GA_KEY,
      }
    : false,
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: constantMenuRouterMap,
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
