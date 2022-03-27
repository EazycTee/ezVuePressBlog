---
title: 饥荒联机版 Linux 服务器的搭建，世界和 MOD 的配置
date: 2017-10-04
author: Eazyc
tags:
  - 程序开发
---
![饥荒联机版](http://oww4nskgw.bkt.clouddn.com/20171004.dst.jpg!aw)

## 引言

饥荒联机版，即 [Don't Starve Together](https://www.klei.com/games/dont-starve-together) （抱歉，我可以翻译成“不要一起饿死”吗？笑），或简称 DST，是一款多人联机的二维沙盘游戏。

饥荒联机版玩起来并没有单机版那么简便。相比单机版，联机版需要网络，需要服务器，会受到网络带宽、网络延迟、服务器配置、玩家数、服务器 MOD 计算量等因素影响。如果在游戏中创建服务器，那么这台机器即是玩家客户端，同时也是一台服务器。这样开服的话，就会受限于玩家的机器，而且当这个玩家断开后，服务器就会断开。因此，要开心地玩耍还是需要专用服务器。

专用服务器可以搭建在 Windows、macOS、Linux 上，搭建服务器的机子，如果是 Win 或者 mac，可以同时作为客户端来玩耍，但服务器不会在玩家离开游戏后同时断线。

## 搭建准备

我玩的饥荒是在 Steam 上买的，今天就说一下怎么在 Linux 上搭建一个 Steam 饥荒联机版服务器。

首先，列一下搭建前的必要条件：

- 一台服务器主机
- 服务器主机配置建议 1G 内存或以上；如果需要洞穴系统，建议 2G 或以上
- 本地和服务器的网络延迟要低
- 熟悉 Linux 基本操作
- 一个购买了 Steam 饥荒联机版的账号
- 一台安装了 Steam 饥荒联机版的电脑（本文会以 mac 为例子）
- 一张拍起来很响但怎么拍都拍不坏的桌子（笑）

## 服务器安装

这里推荐一个开源的工具 [dstserver](https://gameservermanagers.com/lgsm/dstserver)，它是 Linux Game Server Manager (LGSM) 的饥荒版，只需按照官网步骤敲几行代码就可以启动玩耍。虽说如此，CentOS 和 Ubuntu 环境下会有些问题需要解决，建议使用 Debain x64 系统安装。

按照 LGSM 官网的步骤安装好后，启动服务器，屏幕上打印了服务器名 LinuxGSM。进入游戏，搜索名字，可以看到一个没有密码的房间，连接就可以开始游戏了。

## 服务器配置

**服务器名称、密码配置**

```
$ vim ~/.klei/DoNotStarveTogether/Cluster_1/cluster.ini
```

cluster_name 一行是服务器名称
cluster_password 一行是玩家进入服务器时的密码

更多配置详见 [Dedicated Server Settings Guide](https://forums.kleientertainment.com/topic/64552-dedicated-server-settings-guide/)

## 世界、MOD 配置

关于怎么配置世界和 MOD，LGSM 似乎并没有说明。看了 Klei 和 Steam 的相关帖子后，我依然没有定制成功，真是火大，于是开始拍桌子（派上用场了）。后来想了一下，客户端不是也可以开服吗？那我检测一下开服前后开服后的文件变化，应该就能看出个端倪。果然，Klei 和 Steam 都很友善、简单地处理服务器配置信息，没有加密，可以直接观察到文件变化。

以下是 macOS 和 Linux 环境下的配置文件路径：

**世界配置文件**

- macOS 玩家服务器： /Users/\[username]/Documents/Klei/DoNotStarveTogether/Cluster_1/Master/leveldataoverride.lua
- Linux 服务器： ~/.klei/DoNotStarveTogether/Cluster_1/Master/leveldataoverride.lua

**Mod 配置文件**

- macOS 玩家服务器： /Users/\[username]/Documents/Klei/DoNotStarveTogether/Cluster_1/Master/modoverrides.lua
- Linux 服务器： ~/.klei/DoNotStarveTogether/Cluster_1/Master/modoverrides.lua

对于以上配置文件，可以先进入游戏开一个玩家定制的服务器，Steam 会根据玩家的定制选项生成对应的文件。只要将文件内容复制到 Linux 服务器对应的文件里就可以了，没有就新建。

需要注意的是，新建文件，需要增加文件的可执行权限，或者直接修改为 755，否则配置无效（当时卡在这里，桌子又砰砰作响了）：

```shell
$ chmod 755 -R ~/.klei/DoNotStarveTogether/Cluster_1/Master/
```

**MOD 开关文件**

- macOS 玩家服务器中未见文件有变化，不列出
- Linux 服务器： ~/serverfiles/mods/dedicated_server_mods_setup.lua

上面是一个用于开启服务器 MOD 的文件，对应于 “Mod 配置文件” 中的每个 “ID”，新增一行 `ServerModSetup("ID")` （把 ID 改为对应的数字），表示开启对应的 MOD。

**重新生成世界**

- 关闭服务器

```shell
$ ~/dstserver stop
```

- 删除存档（危险操作，请确认服务器路径的正确性）

```shell
$ rm -rf  ~/.klei/DoNotStarveTogether/Cluster_1/Master/backup
$ rm -rf  ~/.klei/DoNotStarveTogether/Cluster_1/Master/save
```

- 运行 LGSM 的安装命令

```shell
$ ~/dstserver install
```

如此，世界已经重新生成。当然，要在游戏里连接服务器还需要先启动 `~/dstserver start`。

## 洞穴配置

根据官方的说法，要在一个服务器跑两个实例，一个 Master，一个 Cave。这两个实例都需要 600M+ 的内存，加起来也就是 1.2G+，预留每个玩家 70M 的内存，建议 2G+。

关于洞穴配置，这里就不介绍了，毕竟水獭我没有测试过。如果要配置，这是一份参考资料：[How to setup dedicated server with cave on Linux](http://steamcommunity.com/sharedfiles/filedetails/?id=590565473&searchtext=linux)。

## 后话

看文档捣鼓饥荒服务器时真的很蛋疼，中文现存资料大多已经过时，英文资料也很杂乱，Klei 和 Steam 都有一些，不知道哪个才是合适的。尝试过程中，遇到的问题在诸如 stackoverflow、serverfault 是搜不到对应解决方案的。在这里，玩家生成的服务器就是一个很好的参考。

---

参考资料

- [dstserver: Don’t Starve Together Linux Server Manager](https://gameservermanagers.com/lgsm/dstserver)
- [dstserver GitHub Wiki](https://github.com/GameServerManagers/LinuxGSM/wiki/Don%27t-Starve-Together)
- [Dedicated Server Settings Guide](https://forums.kleientertainment.com/topic/64552-dedicated-server-settings-guide/)
- [How to setup dedicated server with cave on Linux](http://steamcommunity.com/sharedfiles/filedetails/?id=590565473&searchtext=linux)