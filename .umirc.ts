import { defineConfig } from 'umi'

const PATH_DEV = 'http://127.0.0.1:8700'

const PATH = 'http://117.72.13.77:8700'
const FAVICON = 'https://guangqingl.top/portrait/240121A4N57DZHX4/image.jpg'

export default defineConfig({
  title: '个人网站首页',
  favicon: FAVICON,
  proxy: {
    '/api': {
      target: PATH,
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
      path: '/write/drafts',
      component: '@/pages/Draft',
    },
    {
      path: '/write/draft/:key',
      component: '@/pages/Write',
    },
    {
      path: '/user/login',
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
        {
          path: '/account',
          redirect: '/account/help',
        },
        {
          path: '/account/help',
          component: '@/components/Account/Help',
        },
      ],
    },
    {
      component: '@/pages/404',
    },
  ],
  chainWebpack(
    config: {
      [x: string]: any
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
