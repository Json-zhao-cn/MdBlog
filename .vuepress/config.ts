import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  // Base URL for deploying to GitHub Pages. If you publish to
  // https://<user>.github.io/<repo>/ you must set base to '/<repo>/'
  base: '/MdBlog/',
  title: "Manifacturing Industry Blog",
  description: "This is a blog for manufacturing industry, some experiences just for json zhao.",
  // Use Vite bundler with tuned options to reduce watcher / pre-bundle overhead on Windows
  bundler: viteBundler({
    viteOptions: {
      server: {
        // Ignore large folders to avoid expensive file watch on Windows (node_modules/.git/.vuepress/.temp)
        watch: {
            ignored: ['**/node_modules/**', '**/.git/**', '**/.vuepress/.temp/**']
        }
      },
      // If some dependencies cause slow pre-bundling, list them here to exclude from optimizeDeps
      optimizeDeps: {
        // exclude: ['some-big-dep']
      }
    }
  }),
  // bundler: webpackBundler(),
  theme: recoTheme({
    logo: "/logo.png",
    author: "json zhao",
    authorAvatar: "/head.png",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series as sidebar
    // series: {
    //   // "/docs/theme-reco/": [
    //   //   {
    //   //     text: "module one",
    //   //     children: ["home", "theme"],
    //   //   },
    //   //   {
    //   //     text: "module two",
    //   //     children: ["api", "plugin"],
    //   //   },
    //   // ],
    // },
    navbar: [
      { text: "Home", link: "/" },
      { text: "Skills", link: "/categories/Skills/1.html" },
      { text: "ELK", link: "/categories/ELK/1.html" },
      { text: "ETL", link: "/categories/ETL/1.html" },
      { text: "MES", link: "/categories/MES/1.html" },
      { text: "WMS", link: "/categories/WMS/1.html" },
      { text: "Project", link: "/categories/Project/1.html" },
      { text: "Tags", link: "/tags/SQLServer/1.html" },
      // {
      //   text: "Docs",
      //   children: [
      //     { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
      //     { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
      //   ],
      // },
    ],
    bulletin: {
      title:'Information',
      body: [
        {
          type: "text",
          content: `I write this blog just for share some Manifacturing Industry experiences and skills,and I hope it can help you.<br>
          If you have any questions, please contact me.`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "Contact",
        },
        {
          type: "text",
          content: `
          <ul>
            <li>Email:json.zhao.cn@outlook.com</li>
            <li>Phone:+86 13404849141</li>
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
      ],
    },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  //debug: true,
});
