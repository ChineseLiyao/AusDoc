---
title: 插件指南
order: 2
---

# 插件安装指南

插件为服务器提供附加功能的扩展。
由于 AusJava 为 Paper 核心，故此处仅提供 Bukkit/Spigot/Paper 插件的相关内容。

## 什么是插件？

插件是为 Minecraft 服务器添加新功能的 Java 程序。它们可以添加新命令、修改游戏机制、提供管理工具等。

## 插件安装

### 基本步骤

1. 下载插件 `.jar` 文件
2. 将文件放入服务器的 `plugins/` 目录
3. 重启服务器或使用 `/reload` 命令

> 在此规定，也劝告大家，任何AusJava管理严禁使用`reload`命令，这会导致严重的内存泄漏，非必要的情况，请重启服务器!

```bash
# 服务器控制台重载插件
reload

# 或游戏内（需要 OP 权限）
/reload
```

### 注意事项

- 确保插件版本与服务器版本兼容
- 某些插件需要依赖其他插件（如 Vault）
- 注意插件使用的Java版本, Java8+ 或 Java8, 例如，服务器使用Java8，使用ViaVersion系列插件时必须下载Java8适用版。

## 插件来源

### 官方资源站

#### SpigotMC
> 有的打开叫你要登录才能看的是付费插件页面，如果要买，需要注册账户后使用Paypal购买。
最大的 Bukkit/Spigot 插件资源站。

- 网址：[https://www.spigotmc.org/resources/](https://www.spigotmc.org/resources/)
- 特点：资源丰富，更新及时
- 质量：参差不齐，需要仔细筛选

#### Modrinth
新兴的开源插件平台。

- 网址：[https://modrinth.com/plugins](https://modrinth.com/plugins)
- 特点：界面现代，开源友好，很方便的下载特定版本的插件版本。
- 质量：审核较严格

#### Hangar (Paper)
Paper 官方插件平台。

- 网址：[https://hangar.papermc.io/](https://hangar.papermc.io/)
- 特点：专为 Paper 优化
- 质量：高质量插件

#### Bukkit/CurseForge
老牌插件站，现已并入 CurseForge。

- 网址：[https://dev.bukkit.org/bukkit-plugins](https://dev.bukkit.org/bukkit-plugins)
- 特点：历史悠久，老插件多
- 质量：部分插件已停更

### GitHub
许多开源插件托管在 GitHub。

- 优点：可查看源码，更新及时
- 缺点：需要自己构建或下载 Release

## 插件选择

### 评估标准

1. **更新频率**
   - 查看最后更新时间
   - 是否支持服务器版本

2. **评价和下载量**
   - 高评分和下载量通常意味着质量好
   - 查看用户评论和反馈

3. **依赖关系**
   - 检查是否需要前置插件（如CMILib）
   - 确保依赖插件服务器可用

4. **性能影响**
   - 使用后跑一下Spark，查看性能影响
   - 大型插件可能影响服务器性能

5. **兼容性**
   - 确认支持你的服务器版本
   - 检查与其他插件的兼容性

6. **社区支持**
   - 不要使用那些都不知道那里来的旧版插件，没有文档，使用困难，甚至存在后门。

### 常见问题

#### 插件冲突
- 两个插件功能重复可能冲突
- 查看日志找出冲突插件
- 二分法测试

#### 版本不兼容
- 使用与服务器版本匹配的插件
- 查看插件说明的支持当前版本的最后版本（不建议使用停止支持当前服务器版本的插件）

#### 依赖缺失
- 安装插件所需的依赖
- 常见依赖：Vault, ProtocolLib, PlaceholderAPI

## 插件推荐

### 核心功能

#### LuckPerms
权限管理系统。

- 功能：管理玩家权限和组
- 特点：Web 编辑器，功能强大
- 下载：[SpigotMC](https://www.spigotmc.org/resources/luckperms.28140/)

#### Vault
经济系统 API。

- 功能：为其他插件提供经济、权限、聊天 API
- 特点：几乎是所有经济系统的前置插件
- 下载：[SpigotMC](https://www.spigotmc.org/resources/vault.34315/)

#### EssentialsX
> 不建议使用Ess，这些基础命令都可以从各个小插件那里得到，Ess使用困难，功能落后，建议无特殊需求不要使用。

基础命令合集。

- 功能：/home, /tpa, /warp, /kit 等
- 特点：功能全面，高度可配置
- 下载：[SpigotMC](https://www.spigotmc.org/resources/essentialsx.9089/)

### 世界管理

#### WorldEdit
世界编辑工具。

- 功能：快速建筑，地形编辑
- 特点：强大的编辑命令，俗称创世神
- 下载：[EngineHub](https://enginehub.org/worldedit)

#### WorldGuard
区域保护插件。

- 功能：保护区域，防止破坏
- 特点：与 WorldEdit 配合使用
- 下载：[EngineHub](https://enginehub.org/worldguard)

#### Multiverse-Core
多世界管理。

- 功能：创建和管理多个世界
- 特点：支持不同世界类型
- 下载：[SpigotMC](https://www.spigotmc.org/resources/multiverse-core.390/)

### 性能优化

#### Spark
性能分析工具。

- 功能：分析服务器性能瓶颈
- 特点：Web 界面，详细报告
- 下载：[SpigotMC](https://www.spigotmc.org/resources/spark.57242/)

#### ClearLag
清理掉落物。

- 功能：定时清理地面物品
- 特点：减少实体数量，提升性能
- 下载：[SpigotMC](https://www.spigotmc.org/resources/clearlagg.68271/)

### 娱乐功能

#### Citizens(收费)
NPC 系统。

- 功能：创建和管理 NPC
- 特点：高度可定制
- 下载：[SpigotMC](https://www.spigotmc.org/resources/citizens.13811/)

#### Shopkeepers
商店系统。

- 功能：创建 NPC 商店
- 特点：支持村民商店
- 下载：[SpigotMC](https://www.spigotmc.org/resources/shopkeepers.80756/)

#### mcMMO(收费)
RPG 技能系统。

- 功能：添加技能和等级系统
- 特点：增加游戏深度
- 下载：[SpigotMC](https://www.spigotmc.org/resources/official-mcmmo-original-author-returns.64348/)

## 插件配置

### 配置文件位置

插件配置文件通常位于：
```
plugins/
├── PluginName/
│   ├── config.yml
│   ├── data.yml
│   └── ...
```

### 基本配置

大多数插件使用 YAML 格式配置：

```yaml
# 例如这样
enabled: true
debug: false
settings:
  option1: value1
  option2: value2
```

### 配置修改

1. 停止服务器或使用 `/reload`
2. 编辑配置文件
3. 保存文件
4. 重启服务器或重载插件

### 常用命令

```bash
# 查看已安装插件 (插件加载错误会变成红色)
/plugins

# 重载插件（一般是这样）
/PluginName reload

# 插件帮助
/PluginName help
```

## 插件管理

### 禁用插件

1. 停止服务器
2. 从 `plugins/` 目录移除插件文件
3. 启动服务器

或者重命名插件文件：
```bash
# 添加 .disabled 后缀 禁用
mv PluginName.jar PluginName.jar.disabled
```

### 更新插件

1. 下载新版本插件
2. 停止服务器
3. 替换旧版本文件
4. 启动服务器
5. 检查配置文件是否需要更新

### 备份

更新或修改插件前，建议备份原插件，防止无法使用.

## 故障排除

### 插件无法加载

1. **检查日志**
   - 查看服务端报错日志, 一般会有问题说明

### 插件冲突

1. **逐个禁用**
   - 禁用一半插件测试（二分法）

2. **查看日志**
   - 搜索错误信息，看看插件常见问题有没有说

3. **联系作者**
   - 在插件页面报告问题，例如github提issues

### 性能问题

1. **使用 Spark 分析**
   ```bash
   /spark profiler start
   # 等待一会收集数据
   /spark profiler stop
   ```

2. **检查配置**
   - 优化插件配置
   - 禁用不必要的功能

3. **考虑替代品**
   - 寻找更轻量的替代插件

## 安全建议

### 下载安全

- 只从官方渠道下载
- 避免使用来路不明的插件，可能有后门

### 权限管理

- 不要乱给权限，给之前去插件文档看看啥权限有啥作用

### 定期更新

- 及时更新插件到最新版本

## 进阶技巧

### 使用 PlugMan

> 部分插件不支持热加载/卸载
PlugMan 允许热加载/卸载插件：

```bash
/plugman load PluginName

/plugman unload PluginName

/plugman reload PluginName
```