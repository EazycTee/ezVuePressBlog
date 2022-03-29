module.exports = {
  title: "Eazyc's Notebook",
  description: "记录一些有意思的日常",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  theme: "@vuepress/blog",
  themeConfig: {
    logo: "/assets/img/logo.png",
    sidebar: "auto",
    displayAllHeaders: true,
    smoothScroll: true,
    dateFormat: 'YYYY-MM-DD',
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "标签",
        link: "/tag/",
      }
    ],
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/EazycTee",
        },
      ],
      copyright: [
        {
          text: "Powered by VuePress",
          link: "https://vuepress.vuejs.org/",
        },
        {
          text: "Copyright © 2022 Eazyc",
          link: "/"
        },
      ],
    },
  },
  serviceWorker: true,
  updatePopup: true,
}
