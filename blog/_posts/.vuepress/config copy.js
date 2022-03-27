module.exports = {
  title: "Eazyc's 笔记本",
  description: "记录一些有意思的日常",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  theme: "@vuepress/blog",
  themeConfig: {
    logo: "/assets/img/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "ezGitHub", link: "https://github.com/EazycTee" },
    ],
    sidebar: "auto",
    displayAllHeaders: true,
    smoothScroll: true,
  },
  plugins: ["@vuepress/blog"],
}
