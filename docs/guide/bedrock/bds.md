---
title: BDS原版核心开服指南
order: 1
---

# BDS 原版核心开服指南

Bedrock Dedicated Server (BDS) 是 Mojang 官方提供的 Minecraft 基岩版服务器软件，提供了最原汁原味的基岩版服务器体验。

## 什么是 BDS？

BDS 是 Minecraft 基岩版的官方服务器软件，由 Mojang 开发和维护。它不支持插件，但提供了稳定可靠的原版游戏体验。

## 开服方法

### 环境要求

- Visual C++ 运行库（Windows）

### 下载 BDS

访问 [Minecraft 官方下载页面](https://www.minecraft.net/en-us/download/server/bedrock) 下载对应系统的 BDS。

### 编辑配置

编辑 `server.properties` 文件：
> 此处为常用配置示例，详细配置方法参见 "你的服务器目录/bedrock_server_how_to.html".

```properties
# 服务器名称
server-name=Dedicated Server

# 游戏模式 (survival, creative, adventure)
gamemode=survival

# 难度 (peaceful, easy, normal, hard)
difficulty=normal

# 最大玩家数
max-players=10

# 服务器端口
server-port=19132

# 白名单
white-list=false

# 在线模式
online-mode=true

# 允许作弊(建议开启)
allow-cheats=true

# 最大线程数
max-threads=8

# 世界名称(此处是存储世界文件的名称，不是控制你的世界的名称，修改后如果和原来名字不一样会自动创建新世界，会让你误以为数据丢失了，修改世界名称在你的世界文件夹(worlds/)下你的世界名称文件下的levelname.txt文件内)
level-name=Bedrock level

# 种子
level-seed=

# 服务器描述
server-description=Dedicated Server
```

### 启动服务器

#### Windows

双击 `bedrock_server.exe` 或在命令行中运行：

```cmd
bedrock_server.exe
```

#### Linux

```bash
./bedrock_server
```

> 注意，在ssh连接断开后原本运行的服务就停止了 这里建议使用screen在后台运行

使用 screen 在后台运行：

```bash
sudo apt install screen

screen -S bedrock
./bedrock_server

# 按 Ctrl+A 然后按 D 退出会话
# 重新连接：screen -r bedrock
```

### 加入服务器

启动服务器后，即可加入服务器游玩！
默认运行在端口 19132 上。

## 权限管理

### 白名单

如果在配置里启用了白名单,使用命令可以为玩家添加白名单：

```bash
# 添加白名单
whitelist add 玩家名

# 移除白名单
whitelist remove 玩家名
```

### 管理员权限

使用命令：

```bash
# 给予 OP 权限
op 玩家名

# 撤销 OP 权限
deop 玩家名
```

## 常用命令

### 服务器管理

```bash
# 停止服务器
stop

# 踢出玩家
kick 玩家名 [原因]
```

## 故障排除

### 服务器无法启动

1. **检查端口占用**
   ```bash
   # Linux
   lsof -i :19132
   
   # Windows
   netstat -ano | findstr :19132
   ```

2. **检查权限**（Linux）
   ```bash
   chmod +x bedrock_server
   ```

3. **查看日志**
   检查服务器目录下的日志文件。

### 玩家无法连接

1. **检查防火墙**
   ```bash
   # Linux (UFW)
   sudo ufw allow 19132/udp
   sudo ufw allow 19133/udp
   
   # Windows
   # 建议关闭windows防火墙
   ```

## 进阶配置

### 使用 systemd 管理（Linux）

创建 `/etc/systemd/system/bedrock.service`并编辑：

```ini
[Unit]
Description=Minecraft Bedrock Server
After=network.target

[Service]
Type=simple
User=minecraft
WorkingDirectory=/path/to/bedrock-server
ExecStart=/path/to/bedrock-server/bedrock_server
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash

sudo systemctl daemon-reload

# 启动服务
sudo systemctl start bedrock

# 开机自启
sudo systemctl enable bedrock

# 查看状态
sudo systemctl status bedrock
```

### 包管理

将资源包放入 `resource_packs/` 目录，行为包放入 `behavior_packs/` 目录。
注意需要下载服务器的地图后打一个zip包，修改后缀为mcworld，然后在游戏中添加资源包和材质包，最后上传回服务端，加载完成。
> 这是最恶心人的一点，这样子的话添加包非常麻烦，因此建议使用第三方服务端，例如[Endstone](/guide/bedrock/endstone)

## 社区支持

所有适用于基岩版的资源包和行为包都可以在服务端上使用。