// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/lgq/news/react/react-blog/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "redirect": "/home",
    "exact": true
  },
  {
    "path": "/home",
    "component": require('@/pages/Home').default,
    "routes": [
      {
        "path": "/home",
        "component": require('@/components/HomeArticleList').default,
        "exact": true
      },
      {
        "path": "/home/:category",
        "exact": true,
        "component": require('@/components/HomeArticleList').default
      },
      {
        "path": "/home/:category/:tag",
        "exact": true,
        "component": require('@/components/HomeArticleList').default
      }
    ]
  },
  {
    "path": "/article/:id",
    "component": require('@/pages/Article').default,
    "exact": true
  },
  {
    "path": "/write/course",
    "component": require('@/pages/WriteCourse').default,
    "exact": true
  },
  {
    "path": "/write/drafts",
    "component": require('@/pages/Draft').default,
    "exact": true
  },
  {
    "path": "/write/draft/:key",
    "component": require('@/pages/Write').default,
    "exact": true
  },
  {
    "path": "/admin",
    "component": require('@/pages/Admin').default,
    "routes": [
      {
        "path": "/admin",
        "redirect": "/admin/categories",
        "exact": true
      },
      {
        "path": "/admin/categories",
        "component": require('@/components/Admin/Category').default,
        "exact": true
      },
      {
        "path": "/admin/tags",
        "component": require('@/components/Admin/Tag').default,
        "exact": true
      },
      {
        "path": "/admin/articles",
        "component": require('@/components/Admin/Article').default,
        "exact": true
      },
      {
        "path": "/admin/comments",
        "component": require('@/components/Admin/Comment').default,
        "exact": true
      }
    ]
  },
  {
    "path": "/login",
    "component": require('@/pages/Login').default,
    "exact": true
  },
  {
    "path": "/account",
    "component": require('@/pages/Account').default,
    "routes": [
      {
        "path": "/account",
        "redirect": "/account/me",
        "exact": true
      },
      {
        "path": "/account/me",
        "component": require('@/components/Account/Me').default,
        "exact": true
      }
    ]
  },
  {
    "component": require('@/pages/404').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
