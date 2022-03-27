---
title: 搭建个人博客网站，梳理知识点
date: 2017-9-03
author: Eazyc
tags:
  - 程序开发
---
## 缘起

最近重新搭建了一次 Wordpress，从一台干净的主机开始，搭建符合自己需求的、便于运营的博客，还是有不少东西需要了解的，现在梳理一下知识点。

![一个网络请求的过程](http://oww4nskgw.bkt.clouddn.com/20170930.request_model.jpg!aw)

## 网络名词概念

有必要弄懂一些名词的概念：IP、DNS、Domain、HTTP、PORT……

## 服务器主机

搭建一个博客网站并不一定需要一台*主机*，也许只需要一个*空间*就行。空间是主机划分出来的，一台主机可以划分若干空间，一些空间服务商会把空间分租给不同的客户。空间比主机便宜，主机比空间自由。

如果是搭建一个静态博客网站，其实用 [GitHub Pages](https://pages.github.com/) 就很简便，完全免费，搭配 Hexo 可以很快搭建出来：创建一个 GitHub 仓库，本地安装 Hexo，部署到 GitHub 仓库，然后把域名指向到这个仓库就完事，这是一个 [(Hexo 演示页面)](blog.eazyc.info)。这种博客的特点是：完全静态（没有评论），需要一台安装了 Hexo 或其他静态博客部署工具的电脑才能发布文章，用 Markdown 写作，主题靓丽，不需要 HTTP 服务器。

回到正题，以 Wordpress 为例，下面开始介绍搭建*基于服务器主机的动态博客网站*所需的服务器知识。

### 操作系统

用到主机，就需要和操作系统打交道。我选用的操作系统是 CentOS —— 一种 Linux 的发布版本，本文也是基于它来写的。为什么选它呢？原因以下：

1. Linux 是开源的，想用就可以用，这几乎是服务器系统的默认选项；
2. 关于 Linux 我是通过这本书入门的：[鳥哥的 Linux 私房菜](http://linux.vbird.org/)，而里面均以 CentOS 为案例，网站的中文简体地址在[这里](http://cn.linux.vbird.org/)。

### 命令行操作

SSH 是 Secure Shell 的缩写，也就是安全外壳协议，可以通过它来登录到远程的主机进行命令行操作。

常用的命令或工具：ls、cd、pwd、cp、mv、rm、chmod、chown、yum、wget、vim

### HTTP 服务器

选用开源的就好，我使用的是__Nginx__，也可以选用__Apache__。

安装时注意对应操作系统和 HTTP 服务器版本号。

### 数据库和应用程序

__MySQL__

一款普遍使用的开源数据库，Wordpress 依赖它来运行。
命令行

__PHP__

Wordpress 使用 PHP 开发。

__phpMyAdmin__

一款通过 PHP 实现的、在浏览器端管理 MySQL 数据库的 GUI 工具，极为方便。

__Wordpress__

通过 wget、unzip 安装 Wordpress 在 HTTP 服务器的网站目录，完成配置。

### FTP 服务器

没什么好说的，虽然老旧，但简单、实用、且跨平台，通过 FTP 服务器可以在 windows、macos、linux 上迅速修改网站。

### 版本管理服务器

Git 是一种版本管理工具，可以在网站上搭建一个服务器，方便修改网站开发。摒除 Git 的话，SVN 也有很多人在使用，但效率和体验都没 Git 好，新项目推荐使用 Git。

搭建博客并不一定需要版本管理器，FTP 就够用，但团队合作都需要涉及版本管理，有时间学习一下怎么搭建也无妨。

### 防火墙

CentOS 6 自带 iptables，CentOS 7 自带 firewalld。防火墙关了很危险，记得要开着哦！

## 域名解析

购买域名之后，需要把域名解析到主机以支持通过域名访问博客网站。在设置域名解析时，如果完全没做过，一开始会比较懵逼，不知道各种缩写和符号是什么意思。

![域名解析](http://oww4nskgw.bkt.clouddn.com/20170930.domain-name-resolution.jpg!aw)

上图是域名 eazyc.info 解析设置的其中三条，其中：

- 第一条，类型 __“A”__ 表示使用“A 记录”解析，名称 __“@”__ 代表“顶级域名”，这里指 “eazyc.info”，值 “45.77...” 是指向的 IP 地址，TTL 表示 DNS 缓存时间。
- 第二条，类型 __“CNAME”__ 表示使用 “别名” 解析，即子域名。名称 __“blog”__ 代表 “blog.eazyc.info”，值 “eazyctee.github.io” 是指向的域名。需要注意的是，这类型的解析只能解析到已有的域名。
- 第三条，意思是 “www.eazyc.info” 指向 “@”，也就是 “eazyc.info”

另外需要一提的还有 __“NS”__ 这个类型，可以通过设置它来选择 DNS 解析服务器，我使用的是域名服务商的 DNS，所以 __NS__ 一项默认，这里没有列出。

## 网站优化

__gzip__

一种普遍被浏览器接受的压缩方式，可以加快页面载入速度，建议通过 HTTP 服务器开启，具体设置搜索相关资料。

__主题和兼容__

我希望自己的博客可以在 IE7+ 的的浏览器正常展示，并且支持移动端，这就需要一些前端的知识。
当然， Wordpress 可以帮忙做到，但兼容性好的免费主题似乎很少。最后我用了默认主题，在这之上做了一些简化和修改。 

__页面头部简化__

Wordpress 默认页面头部会加载很多不必要的信息，可以在 \[themename\]/functions.php 里去掉一些不需要的加载项，以 Wordpress 4.8.2 为例：

```php
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_resource_hints', 2 );
remove_action( 'wp_print_styles', 'print_emoji_styles');
remove_action( 'wp_head', 'print_emoji_detection_script',7);
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action( 'publish_future_post', 'check_and_publish_future_post', 10, 1 );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
```

__调整脚本加载顺序__

把脚本放到页面尾部加载，有助于提升交互体验。可以在 \[themename\]/functions.php 里去掉一些不需要的加载项，以 Wordpress 4.8.2 为例：

```php
// 把脚本放到 footer 加载，注意要把支持低版本 IE 的样式表放回头部加载
remove_action('wp_head', 'wp_print_head_scripts', 9);
add_action('wp_footer', 'wp_print_head_scripts', 5);
```

__SEO__

需要了解的关键词：robots.txt、sitemap.xml、url 结构化、meta 标签……

__CDN__

一些公共资源改成 CDN 可以加快网站的加载速度，比如修改 Wordpress 自带的 jQuery，以 Wordpress 4.8.2 为例，可以在 \[themename\]/functions.php 里添加：

``` php
wp_deregister_script('jquery-core');
wp_register_script('jquery-core', 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js';, false, '1.12.4');
```

其他媒体，比如图片也建议修改成 CDN（见本文末）。

__浏览统计和分析__

正在使用 Wordpress 的官方插件 Jetpack，统计分析的功能不多但够用，其他例如“分享到脸谱网”这样的功能不用可以关掉。

## 图片服务器

Wordpress 自带媒体管理功能，很方便。但它的缺点也很明显：使用主机空间来保存、访问速度受限于主机环境、不方便迁移。所以，有的博主会用到图片服务器（或者说是图床，但其实可以存储各种文件，不限于图片）。有的图片服务器自带 CDN 加速，并且空间相对于主机来说要便宜。

我使用的是[七牛云](https://www.qiniu.com/)，目前免费用户有 10G 空间，流量也比较可观。Wordpress 有一个七牛镜像插件，顾名思义，就是在主机存储的基础上，再在七牛云服务器存储一份，访问图片是加载的是七牛云的图片（说了这么多，我并不是给 Qiniu 打广告，只是我刚好了解过这些内容而已啦:P），然而这还是需要主机空间，而且迁移也应该比较麻烦（但我并不了解里面的存储机制），还是单独储存在云上吧~

由于七牛云是面向开发者的，所以它的官方媒体管理界面功能很有限。于是我写了一个脚本用于上传本地文件，并自动从服务器获取图片列表，转换成 json，再写了一个页面读取 json，用于预览和搜索云端的图片。这是一个 [图片预览演示页面](http://works.eazyc.info/static/image-preview/) （放在了 GitHub Pages 上，它的这个页面展示功能真的赞），选择图片后可以按空格或回车键预览。

![图片预览演示页面](http://oww4nskgw.bkt.clouddn.com/20170930.qiniu-image-preview.jpg!aw)