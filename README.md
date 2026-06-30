# FastMoss Skills

English | [中文](README.zh-CN.md)

FastMoss Skills is an AI-agent skill package for using FastMoss MCP data in TikTok Shop business workflows: product scouting, creator outreach, competitor comparison, shop diagnosis, and video strategy.

## About FastMoss

[FastMoss](https://www.fastmoss.com/) is a leading TikTok data analytics platform and a widely used intelligence system for global TikTok brands and top-selling merchants. It helps merchants, service providers, creators, and operator teams understand market trends, discover bestselling categories and products, find high-quality creators and agencies, monitor competitor shops, analyze ad investment, and study the livestream ecosystem.

FastMoss provides big-data analytics centered on TikTok and TikTok Shop, covering livestreams, products, shops, creators, ads, videos, music, hashtags, and more. Its data spans major TikTok commercial markets and regions including the United States, United Kingdom, Indonesia, Vietnam, the Philippines, Thailand, Malaysia, Spain, Mexico, France, Germany, Brazil, and others. These capabilities support common TikTok ecommerce workflows such as product selection, creator discovery, competitor research, and creative-material analysis.

FastMoss is positioned as a full-loop TikTok ecosystem data platform. It supports PC web, mini program, and mobile H5 access, and is known for fast data updates, accurate analysis, and broad data coverage. The platform also includes AI-assisted features for creative inspiration, viral script generation, and VOC insight analysis.

Key advantages:

- Long historical coverage: supports 1,200+ days of TikTok historical data, with major datasets updated since May 2022.
- Large data scale: includes 300M+ TikTok creators and 500M+ TikTok products and shops.
- Full-section analytics: covers livestream, product, shop, creator, video, ad, hashtag, and music analytics.
- Broad regional coverage: covers 20+ TikTok commercial countries and regions, including the United States, United Kingdom, Indonesia, Thailand, Vietnam, Malaysia, the Philippines, South Korea, France, Mexico, Brazil, Spain, and more.
- AI-enabled workflows: helps users get creative inspiration, generate viral scripts, and analyze VOC signals from market feedback.

## About FastMoss MCP

[FastMoss MCP](https://developers.fastmoss.com/mcp/overview.html) exposes FastMoss data and knowledge-base capabilities through the Model Context Protocol, so AI agents can query TikTok ecommerce data directly inside their working environment. Agents can call MCP tools to search objects, resolve IDs, pull rankings, inspect product/shop/creator/video/livestream details, analyze trends, and build FastMoss-site detail links.

FastMoss MCP is designed for quick integration with mainstream MCP-compatible AI clients and agent tools, such as Claude Desktop, Cursor, Windsurf, Cline, Roo Code, Continue, Cherry Studio, Trae, and other clients that support MCP server configuration. After connecting the MCP server, users can ask natural-language questions like "find growth-stage products in the US beauty category", "which creators are selling this product", or "why did this shop's sales drop" and let the agent call FastMoss tools behind the scenes.

To try it, open the [FastMoss MCP overview](https://developers.fastmoss.com/mcp/overview.html) and follow the integration guide. New users can start with a 3-day free trial.

## About This Skill

This skill is the agent-facing routing and business-judgment layer for FastMoss MCP. It tells an AI client when to use which FastMoss MCP tools, which workflow reference to load, how to judge TikTok Shop momentum, and how to format answers for merchants and operators.

Runtime references live in `references/`:

| File | Purpose |
|---|---|
| `SKILL.md` | Main entrypoint and routing instructions. |
| `references/PRINCIPLES.md` | Shared answer structure, data transparency, hyperlink rules, language behavior, and preference handling. |
| `references/GLOSSARY.md` | FastMoss/TikTok Shop terms, lifecycle stages, L0-L6 tiers, creator-Level logic, tool-selection guidance, and core judgment method. |
| `references/fm-product-scout.md` | Product selection, product-stage judgment, follow-selling timing, and blue-ocean opportunity analysis. |
| `references/fm-creator-outreach.md` | Creator discovery, creator vetting, creator-product fit, and outreach copy. |
| `references/fm-competitor-batch.md` | Batch competitor comparison and viral attribution. |
| `references/fm-store-diagnosis.md` | Single-shop diagnosis across products, traffic channels, creators, ads, videos, and risk. |
| `references/fm-video-brief.md` | Video deconstruction, hook strategy, short-video planning, and creator shooting briefs. |
| `tools/fastmoss-mcp-tools-EN.json` | FastMoss MCP tool metadata used for documentation and reference. |

## Install From GitHub

Install this skill from GitHub into any AI client that supports local skill folders:

```bash
git clone https://github.com/FastMoss/fastmoss-skills.git
```

Then move or symlink the cloned folder into your AI client's skills directory:

```bash
mkdir -p "$AI_SKILLS_DIR"
ln -s "$(pwd)/fastmoss-skills" "$AI_SKILLS_DIR/fastmoss-skills"
```

If your client provides a GitHub skill installer, install the repository root as the skill:

```bash
repo: FastMoss/fastmoss-skills
path: .
name: fastmoss-skills
```

Restart or reload your AI client after installation so the skill is discovered.

## Supported Business Capabilities

- Product scouting: find bestselling, new, potential, growth-stage, or blue-ocean products.
- Product lifecycle judgment: classify products as new, growth, viral, or steady using creator/video increments as leading indicators.
- Follow-selling decisions: judge whether the entry window is open, narrowing, or closed.
- Creator discovery: find creators already selling a product or creators likely to fit a merchant's product.
- Creator vetting: evaluate creator activity, sales power, audience fit, content direction, and outreach reachability.
- Competitor comparison: compare products, shops, or creators side by side and explain structural differences.
- Viral attribution: identify whether growth came from ads, organic short videos, livestreams, product-card traffic, creator matrix effects, or shop-owned traffic.
- Shop diagnosis: break down a shop's product structure, category mix, traffic channels, ad reliance, creator mix, video/livestream performance, and concentration risk.
- Video strategy: deconstruct winning videos, extract hooks/scripts, and produce creator-ready shooting briefs.
- Market/category analysis: inspect category ranking, growth, concentration, creator-tier structure, and blue-ocean potential.
- FastMoss knowledge lookup: answer platform-feature, terminology, rule, and how-to questions through FastMoss documentation search.

## FastMoss MCP Tool List

### Product Tools

| Tool | Use |
|---|---|
| `product_search` | Resolve a product ID from a product name, keyword, price band, category, or product clue. |
| `product_rank_top_selling` | Find viral, bestselling, or top-selling products in a market or category. |
| `product_rank_new_listed` | Find recently launched fast-selling products; FastMoss defines new as listed within 30 days. |
| `product_overview` | Analyze why a product is selling, channel mix, ad/organic split, content mix, and stage momentum. |
| `product_detail_info` | Pull product basics: shop ownership, price, rating, logistics, images, and ad status. |
| `product_sales_trend` | Inspect recent product units or sales trend. |
| `product_creator_analysis` | See creator structure and creators selling a product. |
| `product_video_list` | See selling videos for a product and filter organic versus ad-driven videos. |
| `product_investment` | Inspect ad status, estimated ad spend, ROAS, and daily ad-spend changes. |
| `product_sku` | Analyze SKU sales share and stock share. |
| `product_review_list` | Review user feedback and positive/negative review keywords. |
| `product_category_info` | Confirm category tree and level-1/2/3 classification. |

### Creator Tools

| Tool | Use |
|---|---|
| `creator_search` | Resolve a creator UID from nickname, keyword, niche, region, or follower profile. |
| `creator_profile_overview` | Evaluate creator profile, selling ability, livestream performance, and partnership fit. |
| `creator_rank_top_ecommerce` | Find top selling creators by country, category, or selling format. |
| `creator_rank_top_growth` | Find creators with strong follower-growth momentum. |
| `creator_rank_top_potential` | Find rising creators with selling growth and conversion potential. |
| `creator_product_list` | Inspect a creator's showcase products and recently promoted products. |
| `creator_video_analysis` | Analyze recent content direction, tags, engagement, and selling videos. |
| `creator_cargo_summary` | Inspect a creator's short-video versus livestream selling split and main categories. |
| `creator_fans_distribution` | Check follower gender, age, and region fit. |
| `creator_data_trends` | Pull creator trends for units sold, GMV, views, likes, or follower changes. |

### Shop Tools

| Tool | Use |
|---|---|
| `shop_search` | Resolve a seller ID from shop name, keyword, or region. |
| `shop_base_info` | Pull shop profile, type, local/cross-border attribute, rating, and snapshot metrics. |
| `shop_rank_top_selling` | Find top shops in a market or category. |
| `shop_product_analysis` | Analyze shop categories, price bands, bestseller/new/rising product mix, and product list. |
| `shop_sale_analysis` | Inspect whether shop sales come from short video, livestream, product card, or other paths. |
| `shop_creator_analysis` | Analyze partner creators, follower-tier distribution, and video/livestream selling mix. |
| `shop_video_analysis` | Inspect shop selling-video performance and ad status. |
| `shop_live_analysis` | Analyze shop livestream performance and own-live versus creator-live mix. |
| `shop_investment_analysis` | Inspect ad spend, ROAS, ad-driven sales, and ad-driven object changes. |
| `shop_data_trends` | Pull shop trends for units, sales, creators, livestreams, videos, and active products. |

### Video Tools

| Tool | Use |
|---|---|
| `video_search` | Resolve a video ID from video keyword, title, or creator name. |
| `video_detail_analysis` | Inspect video basics, views, engagement, engagement rate, IPM, and products sold. |
| `video_script_info` | Extract video captions, line-by-line voiceover script, or raw script. |
| `video_data_trends` | Pull daily trends for views, likes, comments, and shares. |

### Livestream Tools

| Tool | Use |
|---|---|
| `live_search` | Resolve a livestream room ID from title, host, or shop. |
| `live_detail_analysis` | Review livestream basics, performance, selling tactics, and product mix. |
| `live_products_list` | Inspect products sold in a livestream and category contribution. |

### Market, Category, And Utility Tools

| Tool | Use |
|---|---|
| `search_category_by_words` | Resolve category IDs from product names, category terms, or Chinese industry phrasing. |
| `market_category_ranking` | Compare level-1 category sales, growth strength, and top-tier concentration. |
| `market_category_analysis` | Analyze category competition, blue-ocean potential, and entry attractiveness. |
| `market_category_author_sales_matrix` | Inspect category sales distribution across creator follower tiers. |
| `search_fastmoss_documents` | Search FastMoss documentation for platform rules, feature explanations, terminology, or how-to knowledge. |
| `fastmoss_detail_url_examples` | Get FastMoss detail-page URL templates for products, creators, shops, videos, and livestreams. |

## License

See [LICENSE](LICENSE).
