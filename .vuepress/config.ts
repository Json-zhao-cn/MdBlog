import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { getChildrenHtmlVue } from './Extension/FileExtension';

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
    series: {
      "/series/ETL/BasicProcessor/": [
        {
          text: "BasicKnowledge",
          children: ["1Group", "2Controller-services","3InputAndOutPort","4UpdateAttribute","5LogMessage","6ExecuteSQL","7ConvertAvroToJSON","8ExecuteSQLRecord",
            "9ConvertRecord","10SplitJson","11EvaluateJsonPath","12RouteOnAttribute","13QueryRecord","14MergeContent","15ReplaceText","16PutSQL"
            ,"17PutDatabaseRecord","18InvokeHTTP"
          ]
          //children: getChildrenHtmlVue('.temp/pages/series/ETL/BasicProcessor'),
        },
      ],
      "/series/Digitalization/SyncData/": [
        {
          text: "SyncData",
          children: ["1Scope", "2Requirement","3TechnologySelection","4Resource","5Evaluate","6Plan","7Analyse",
            "8Design","9Dev","10Test","11Execute","12Maintenance","13Monitor","14Optimize"],
          //children: getChildrenHtmlVue('.temp/pages/series/Digitalization/SyncData'),
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/" },
      { text: "Skills", link: "/categories/Skills/1.html" },
      { text: "ELK", link: "/categories/ELK/1.html" },
      { text: "ETL", link: "/categories/ETL/1.html" },
      { text: "MES", link: "/categories/MES/1.html" },
      { text: "WMS", link: "/categories/WMS/1.html" },
      { text: "Tags", link: "/tags/SQLServer/1.html" },
      {
        text: "Series",
        children: [
          { text: "ApacheNifi", link: "/series/ETL/BasicProcessor/1Group" },
          { text: "SyncData", link: "/series/Digitalization/SyncData/1Scope" },
        ],
      },
    ],
    bulletin: {
      title: 'Information',
      body: [
        {
          type: "text",
          content: `
            <div class="custom-bulletin">
                <p class="intro-text">
                  This blog shares valuable <strong>Manufacturing Industry experiences and practical skills</strong>,aiming to provide useful insights for professionals and enthusiasts alike.
                </p>
                <p class="contact-prompt">
                  Feel free to reach out if you have any questions - I'm always happy to help!
                </p>
            </div>
          `,
          style: "font-size: 14px; line-height: 1.6;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "Contact Information",
        },
        {
          type: "text",
          content: `
            <div class="contact-section">
              <ul class="contact-list">
                <li class="contact-item">
                  <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
                  </svg>
                  <span class="contact-value">json.zhao.cn@outlook.com</span>
                </li>
                <li class="contact-item">
                  <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62,10.79c1.44,2.83,3.76,5.14,6.59,6.59l2.2-2.2c0.27-0.27,0.67-0.36,1.02-0.24c1.12,0.37,2.33,0.57,3.57,0.57 c0.55,0,1,0.45,1,1V20c0,0.55-0.45,1-1,1C9.61,21,2,13.39,2,4c0-0.55,0.45-1,1-1h3.5c0.55,0,1,0.45,1,1c0,1.25,0.2,2.45,0.57,3.57 c0.11,0.35,0.03,0.74-0.24,1.02L6.62,10.79z"/>
                  </svg>
                  <span class="contact-value">+8613404849141</span>
                </li>
              </ul>
            </div>
          `,
          style: "font-size: 14px;",
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
