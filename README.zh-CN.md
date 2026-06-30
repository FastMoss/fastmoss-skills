# FastMoss Skills

[English](README.md) | 中文

FastMoss Skills 是一个通用 AI Agent skill 包，用于把 FastMoss MCP 数据接入 TikTok Shop 业务分析工作流，包括选品、达人建联、竞品对比、店铺诊断和短视频策略。

## 关于 FastMoss

[FastMoss](https://www.fastmoss.com/) 是全球领先的 TikTok 数据分析平台，也是全球 TikTok 品牌与大卖商家常用的数据情报系统。FastMoss 帮助商家、服务商、创作者和运营团队洞察大盘趋势、品类爆品、优质达人与机构、竞店动态、广告投流和直播生态。

FastMoss 主要提供以 TikTok 和 TikTok Shop 为核心的大数据分析服务，覆盖直播、商品、店铺、达人、广告、视频、音乐、标签等版块，涵盖美国、英国、印尼、越南、菲律宾、泰国、马来西亚、西班牙、墨西哥、法国、德国、巴西等主要 TikTok 商业化国家和区域的数据，满足生态从业者选爆品、找达人、查竞对、看素材等业务需求。

FastMoss 定位为 TikTok 生态全闭环数据分析平台，支持 PC Web、微信小程序和手机 H5 三端同步，并以数据更新快、分析准、收录全为核心优势。同时，FastMoss 也提供 AI 能力，支持获取创作灵感、生成爆款脚本和 VOC 智能洞察。

核心优势：

- 时间长：支持查看 TikTok 1200 天以上历史数据，主要数据自 2022 年 5 月开始更新。
- 数据多：收录 TikTok 达人数量超过 3 亿，收录 TikTok 商品与店铺数量超过 5 亿。
- 全版块：覆盖直播、商品、小店、达人、视频、广告、标签、音乐等 TikTok 数据分析版块。
- 地区全：覆盖 20+ TikTok 商业化国家和地区，包括美国、英国、印尼、泰国、越南、马来西亚、菲律宾、韩国、法国、墨西哥、巴西、西班牙等。
- AI 赋能：支持创作灵感获取、爆款脚本生成和 VOC 智能洞察，帮助用户从数据分析走向内容执行。

## 关于 FastMoss MCP

[FastMoss MCP](https://developers.fastmoss.com/zh/mcp/overview.html) 通过 Model Context Protocol 暴露 FastMoss 的数据与知识库能力，让 AI 智能体可以在自己的工作环境里直接查询 TikTok 电商数据。智能体可以调用 MCP 工具来搜索对象、解析 ID、拉取榜单、查看商品/店铺/达人/视频/直播详情、分析趋势，并生成 FastMoss 站内详情页链接。

FastMoss MCP 支持快速接入市面上主流的 MCP 兼容 AI 客户端和智能体工具，例如 Claude Desktop、Cursor、Windsurf、Cline、Roo Code、Continue、Cherry Studio、Trae，以及其他支持 MCP Server 配置的客户端。接入后，用户可以直接用自然语言提问，例如“帮我找美国美妆类目的增长期商品”“哪些达人正在带这个商品”“为什么这个店铺最近下滑”，由智能体在背后调用 FastMoss 工具完成查询和分析。

想要体验 FastMoss MCP，可以点击 [FastMoss MCP 介绍与接入指南](https://developers.fastmoss.com/zh/mcp/overview.html) 快速开始。新用户支持 3 天免费试用。

## 关于本 Skill

本 skill 是 FastMoss MCP 的智能体业务路由与判断层。它会告诉 AI 客户端在不同业务问题中应该调用哪些 FastMoss MCP 工具、读取哪个工作流文档、如何判断 TikTok Shop 商品热度，以及如何为商家和运营输出更可执行的答案。

运行时引用文档位于 `references/`：

| 文件 | 用途 |
|---|---|
| `SKILL.md` | 主入口与路由说明。 |
| `references/PRINCIPLES.md` | 通用回答结构、数据透明度、FastMoss 站内链接规则、语言规则和偏好记忆机制。 |
| `references/GLOSSARY.md` | FastMoss/TikTok Shop 术语、生命周期阶段、L0-L6 分层、达人 Level 计算、工具选择和核心判断方法。 |
| `references/fm-product-scout.md` | 选品、商品阶段判断、跟卖时机和蓝海机会分析。 |
| `references/fm-creator-outreach.md` | 达人发现、达人评估、人货匹配和建联话术。 |
| `references/fm-competitor-batch.md` | 批量竞品对比和爆发归因。 |
| `references/fm-store-diagnosis.md` | 单店铺诊断，覆盖商品、流量渠道、达人、广告、视频和风险。 |
| `references/fm-video-brief.md` | 爆款视频拆解、钩子策略、短视频规划和达人拍摄 brief。 |
| `tools/fastmoss-mcp-tools-EN.json` | FastMoss MCP 工具元数据，用于文档和参考。 |

## 使用 npx 安装

将该 skill 安装到任何支持本地 skill 目录的 AI 客户端：

### 快速指令

适用于 Claude 兼容的本地 skill 目录：

```bash
npx -y @fastmoss/fastmoss-skills install --client claude
```

查看内置示例和选项：

```bash
npx -y @fastmoss/fastmoss-skills install --help
```

### 自定义 Skill 目录

其他 AI 客户端可以显式传入自己的 skill 目录：

```bash
npx -y @fastmoss/fastmoss-skills install --dest "$HOME/.your-ai-client/skills"
```

也可以通过环境变量提前指定安装目录：

```bash
AI_SKILLS_DIR=/path/to/your/ai-client/skills \
  npx -y @fastmoss/fastmoss-skills install
```

如果需要覆盖已有安装：

```bash
npx -y @fastmoss/fastmoss-skills install --client claude --force
```

安装后请重启或重新加载你的 AI 客户端，让新 skill 生效。实时 TikTok Shop 数据分析还需要先安装并连接 FastMoss MCP 服务。

### 备用方式：从 GitHub 安装

如果不想使用 npm，可以克隆仓库后，将目录移动或软链接到你的 AI 客户端 skill 目录：

```bash
git clone https://github.com/FastMoss/fastmoss-skills.git
mkdir -p "$AI_SKILLS_DIR"
ln -s "$(pwd)/fastmoss-skills" "$AI_SKILLS_DIR/fastmoss-skills"
```

如果你的客户端提供 GitHub skill 安装器，可以将仓库根目录作为 skill 安装：

```bash
repo: FastMoss/fastmoss-skills
path: .
name: fastmoss-skills
```

## 支持的业务能力

- 选品：寻找热销品、新品、潜力品、增长期商品和蓝海商品。
- 商品生命周期判断：结合达人/视频增量等领先指标，将商品判断为新品期、增长期、爆发期或稳定期。
- 跟卖决策：判断入场窗口是仍然打开、正在收窄，还是已经关闭。
- 达人发现：找到正在带某个商品的达人，或找到适合某个商品的潜在达人。
- 达人评估：评估达人活跃度、带货能力、粉丝匹配度、内容方向和邮件触达可能性。
- 竞品对比：并排比较商品、店铺或达人，解释结构性差异。
- 爆发归因：判断增长来自广告、自然短视频、直播、商品卡、达人矩阵还是店铺自营流量。
- 店铺诊断：拆解店铺商品结构、类目结构、流量渠道、广告依赖、达人结构、视频/直播表现和集中度风险。
- 视频策略：拆解爆款视频、提取钩子和脚本，并产出可发给达人的拍摄 brief。
- 市场/类目分析：分析类目排名、增长、集中度、达人层级结构和蓝海潜力。
- FastMoss 知识查询：通过 FastMoss 文档搜索回答平台功能、术语、规则和操作类问题。

## FastMoss MCP 工具列表

### 商品工具

| 工具 | 用途 |
|---|---|
| `product_search` | 通过商品名称、关键词、价格带、类目或商品线索解析 product_id。 |
| `product_rank_top_selling` | 查找某市场或类目下的爆款、热销或榜单商品。 |
| `product_rank_new_listed` | 查找近期上架且销售较快的新品；FastMoss 将新品定义为上架 30 天内。 |
| `product_overview` | 分析商品为什么卖、渠道结构、广告/自然占比、内容结构和阶段动量。 |
| `product_detail_info` | 获取商品基础信息，包括所属店铺、价格、评分、物流、图片和广告状态。 |
| `product_sales_trend` | 查看商品近期销量或 GMV 趋势。 |
| `product_creator_analysis` | 查看商品的带货达人结构和带货达人列表。 |
| `product_video_list` | 查看带货视频，并区分自然视频和广告视频。 |
| `product_investment` | 查看广告状态、预估广告花费、ROAS 和日广告花费变化。 |
| `product_sku` | 分析 SKU 销售占比和库存占比。 |
| `product_review_list` | 查看用户评价、正面评价关键词和负面评价关键词。 |
| `product_category_info` | 确认商品类目树和一级/二级/三级类目归属。 |

### 达人工具

| 工具 | 用途 |
|---|---|
| `creator_search` | 通过达人昵称、关键词、垂类、地区或粉丝画像解析 uid。 |
| `creator_profile_overview` | 评估达人基础资料、带货能力、直播表现和合作价值。 |
| `creator_rank_top_ecommerce` | 按国家、类目或带货形式查找头部带货达人。 |
| `creator_rank_top_growth` | 查找粉丝增长势头强的达人。 |
| `creator_rank_top_potential` | 查找带货增长和转化潜力较好的上升期达人。 |
| `creator_product_list` | 查看达人橱窗商品和近期推广商品。 |
| `creator_video_analysis` | 分析达人近期内容方向、标签、互动表现和带货视频。 |
| `creator_cargo_summary` | 查看达人短视频带货与直播带货占比，以及主要带货类目。 |
| `creator_fans_distribution` | 查看达人粉丝性别、年龄和地区匹配度。 |
| `creator_data_trends` | 拉取达人销量、GMV、播放、点赞或粉丝变化趋势。 |

### 店铺工具

| 工具 | 用途 |
|---|---|
| `shop_search` | 通过店铺名称、关键词或地区解析 seller_id。 |
| `shop_base_info` | 获取店铺基础资料、店铺类型、本土/跨境属性、评分和概览指标。 |
| `shop_rank_top_selling` | 查找某市场或类目下的头部店铺。 |
| `shop_product_analysis` | 分析店铺类目、价格带、爆品/新品/增长品结构和商品列表。 |
| `shop_sale_analysis` | 查看店铺销售主要来自短视频、直播、商品卡还是其他路径。 |
| `shop_creator_analysis` | 分析合作达人、达人粉丝层级分布和视频/直播带货结构。 |
| `shop_video_analysis` | 查看店铺带货视频表现和广告状态。 |
| `shop_live_analysis` | 分析店铺直播表现，以及自播和达人直播结构。 |
| `shop_investment_analysis` | 查看广告花费、ROAS、广告驱动销售和广告驱动对象变化。 |
| `shop_data_trends` | 拉取店铺销量、GMV、达人、直播、视频和动销商品趋势。 |

### 视频工具

| 工具 | 用途 |
|---|---|
| `video_search` | 通过视频关键词、标题或达人名称解析 video_id。 |
| `video_detail_analysis` | 查看视频基础信息、播放、互动、互动率、IPM 和带货商品。 |
| `video_script_info` | 提取视频字幕、逐句口播脚本或原始脚本。 |
| `video_data_trends` | 拉取视频播放、点赞、评论和分享的日趋势。 |

### 直播工具

| 工具 | 用途 |
|---|---|
| `live_search` | 通过直播标题、主播或店铺解析 room_id。 |
| `live_detail_analysis` | 查看单场直播基础信息、核心表现、销售打法和商品结构。 |
| `live_products_list` | 查看直播间销售商品和类目贡献。 |

### 市场、类目与通用工具

| 工具 | 用途 |
|---|---|
| `search_category_by_words` | 通过商品名、类目词或中文行业说法解析 category_id。 |
| `market_category_ranking` | 对比一级类目的销售排名、增长强度和头部集中度。 |
| `market_category_analysis` | 分析类目竞争度、蓝海潜力和入场价值。 |
| `market_category_author_sales_matrix` | 查看某类目销售在不同粉丝层级达人之间的分布。 |
| `search_fastmoss_documents` | 搜索 FastMoss 文档，回答平台规则、功能解释、术语和操作方法。 |
| `fastmoss_detail_url_examples` | 获取商品、达人、店铺、视频和直播的 FastMoss 详情页 URL 模板。 |

## License

见 [LICENSE](LICENSE)。
