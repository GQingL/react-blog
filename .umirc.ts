import { defineConfig } from 'umi'

const REACT_APP_ENV = 'local'

export default defineConfig({
  title: '个人网站首页',
  favicon: 'https://guangqingl.top/portrait/240121A4N57DZHX4/image.jpg',
  proxy: {
    '/api': {
      target: 'http://117.72.13.77:8700',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: '@/pages/Home',
      routes: [
        {
          path: '/home',
          component: '@/components/HomeArticleList',
        },
        {
          path: '/home/:category',
          exact: true,
          component: '@/components/HomeArticleList',
        },
        {
          path: '/home/:category/:tag',
          exact: true,
          component: '@/components/HomeArticleList',
        },
      ],
    },
    {
      path: '/article/:id',
      component: '@/pages/Article',
    },
    {
      path: '/write/course',
      component: '@/pages/WriteCourse',
    },
    {
      path: '/write/drafts',
      component: '@/pages/Draft',
    },
    {
      path: '/write/draft/:key',
      component: '@/pages/Write',
    },
    {
      path: '/admin',
      component: '@/pages/Admin',
      routes: [
        {
          path: '/admin',
          redirect: '/admin/categories',
        },
        {
          path: '/admin/categories',
          component: '@/components/Admin/Category',
        },
        {
          path: '/admin/tags',
          component: '@/components/Admin/Tag',
        },
        {
          path: '/admin/articles',
          component: '@/components/Admin/Article',
        },
        {
          path: '/admin/comments',
          component: '@/components/Admin/Comment',
        },
      ],
    },
    {
      path: '/login',
      component: '@/pages/Login',
    },
    {
      path: '/account',
      component: '@/pages/Account',
      routes: [
        {
          path: '/account',
          redirect: '/account/me',
        },
        {
          path: '/account/me',
          component: '@/components/Account/Me',
        },
      ],
    },
    {
      component: '@/pages/404',
    },
  ],
  chainWebpack(
    config: {
      module: {
        rule: (
          arg0: string,
        ) => {
          (): any
          new (): any
          test: {
            (arg0: RegExp): {
              (): any
              new (): any
              include: {
                (): any
                new (): any
                add: {
                  (arg0: RegExp): {
                    (): any
                    new (): any
                    end: {
                      (): {
                        (): any
                        new (): any
                        use: {
                          (arg0: string | string[]): {
                            (): any
                            new (): any
                            loader: {
                              (arg0: string): {
                                (): any
                                new (): any
                                options: {
                                  (arg0: {
                                    presets: string[]
                                    plugins: (
                                      | string
                                      | {
                                          libraryName: string
                                          libraryDirectory: string
                                          camel2DashComponentName: boolean
                                        }
                                    )[][]
                                  }): void
                                  new (): any
                                }
                                loader: {
                                  (arg0: string): {
                                    (): any
                                    new (): any
                                    loader: {
                                      (arg0: string): void
                                      new (): any
                                    }
                                  }
                                  new (): any
                                }
                              }
                              new (): any
                            }
                          }
                          new (): any
                        }
                      }
                      new (): any
                    }
                  }
                  new (): any
                }
              }
            }
            new (): any
          }
        }
      }
    },
    { webpack }: any,
  ) {
    // 自定义 webpack 配置
    // 添加 MUI 的 babel 插件和样式文件的处理规则
    config.module
      .rule('mui')
      .test(/\.(js|mjs|jsx|ts|tsx)$/)
      .include.add(/@mui/)
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-react'],
        plugins: [
          [
            'babel-plugin-import',
            {
              libraryName: '@mui/material',
              libraryDirectory: '',
              camel2DashComponentName: false,
            },
            '@mui/material',
          ],
          [
            'babel-plugin-import',
            {
              libraryName: '@mui/icons-material',
              libraryDirectory: '',
              camel2DashComponentName: false,
            },
            '@mui/icons-material',
          ],
        ],
      })
    // 添加 MUI 的样式文件处理规则
    config.module
      .rule('mui-styles')
      .test(/\.(css|less)$/)
      .include.add(/@mui/)
      .end()
      .use(['style-loader', 'css-loader', 'less-loader'])
      .loader('style-loader')
      .loader('css-loader')
      .loader('less-loader')
  },
})
