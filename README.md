# Zonglin Wu / Dominic — Research & Collection

可以直接放到 GitHub Pages 的纯静态个人主页，无需安装依赖或运行构建。

## 当前页面

- 顶部导航：About Me / Collection / Contact。
- 首页首屏显示 About Me，保留大字姓名、红色错位相框和黑白对比。
- 简介为 17.5 px；研究方向、按钮、论文作者和摘要等文字已放大。姓名略微缩小，首页头像适度放大。
- 保留原有 7 篇论文、完整作者信息、论文链接、摘要和 6 条动态。
- News 使用固定高度的滚动列表，支持滚轮、触摸和键盘滚动。
- News 中的论文名加上《》；News 和 Publications 中已发表的期刊／会议名称使用粗斜体，投稿中的条目保留原有状态。
- About Me 中的 UTS 和 A*STAR CFAR 名称使用红色字体及下划线。
- UTS 收藏卡的经历说明中补充全额校级奖学金资助。
- Collection 保留 SWU / UTS / A*STAR 的官方 Logo、票根和收藏印章，可展开对应学习／研究经历。
- Contact 展开菜单保留两个邮箱、复制按钮和 Google Scholar 入口。
- 已移除相册页面及对应的导航、配置和代码。

## 本地查看

1. 完整解压文件夹。
2. 双击 `index.html` 打开首页。
3. 点击顶部的 Collection 和 Contact 查看对应内容。

请先完整解压，再打开网页；不要直接从压缩包中打开单个 HTML 文件。

## 更新 GitHub Pages

1. 打开现有个人主页仓库。
2. 把本文件夹里面的 `index.html`、`collection.html`、`assets/` 和 `.nojekyll` 上传到原来放首页的位置，覆盖同名文件。
3. 不要在仓库根目录额外套一层 `Zonglin-Wu-Homepage/` 文件夹。
4. 如果已经部署过之前的相册版本，同时删除仓库中旧的 `life.html`、`assets/content.js` 和不再使用的 `assets/life/` 文件夹。
5. `assets/profile.jpeg` 仍是首页头像，请保留。
6. 提交改动，等待原有 Pages 部署完成；若显示旧样式，可强制刷新浏览器缓存。

本次只修改并打包源码，没有操作 GitHub 仓库或进行线上发布。

## 修改内容的位置

| 想修改 | 文件 |
| --- | --- |
| 姓名、About Me、研究方向、动态、论文 | `index.html` |
| 首页头像 | `assets/profile.jpeg` |
| 收藏机构、经历和网站链接 | `collection.html` 中的 `passport-card` |
| 机构 Logo | `assets/logos/` |
| 字号、布局、配色和滚动条 | `assets/style.css` |
| 两个邮箱 | 两个 HTML 文件中的 `contact-popover`；同时修改 `mailto:`、显示文字和 `data-copy` |

Google Scholar 当前使用姓名检索链接。拿到个人主页地址后，可替换两个 HTML 中的 Scholar 链接。

## Logo 来源

Logo 随源码打包，浏览网页不需要从素材源站加载。

- 西南大学：[学校视觉形象识别系统](https://www.swu.edu.cn/xxgk/xxbs.htm)及[标志规范](https://www.swu.edu.cn/xxbs/bzgf.htm)。
- UTS：[学校官网](https://www.uts.edu.au/)。
- A*STAR：[机构官网](https://www.a-star.edu.sg/)。

标志用于展示对应学习和研究经历，品牌权利归各机构所有。

## 检查范围

已检查 HTML 结构、站内链接与锚点、本地资源、JavaScript 语法、CSS 括号／注释／字符串结构，以及学术内容与收藏内容的保留情况。当前环境未进行实际浏览器渲染和手机实机测试。
