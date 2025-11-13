# GitHub 推送指南

## 步骤 1: 在 GitHub 上创建仓库

1. 登录 GitHub
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `hero-coaches` (或你喜欢的名称)
   - Description: "游戏复盘分析系统 - MVP 闭环"
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 "Create repository"

## 步骤 2: 添加远程仓库并推送

在项目目录下执行以下命令（将 `YOUR_USERNAME` 替换为你的 GitHub 用户名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/hero-coaches.git

# 或者使用 SSH（如果你配置了 SSH 密钥）
# git remote add origin git@github.com:YOUR_USERNAME/hero-coaches.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 使用 SSH 密钥（推荐）

如果你还没有配置 SSH 密钥，可以：

1. 生成 SSH 密钥：
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. 将公钥添加到 GitHub：
   - 复制 `~/.ssh/id_ed25519.pub` 的内容
   - 在 GitHub 上：Settings → SSH and GPG keys → New SSH key

3. 使用 SSH URL 添加远程仓库：
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/hero-coaches.git
   ```

## 验证推送

推送成功后，访问 `https://github.com/YOUR_USERNAME/hero-coaches` 应该能看到所有文件。

## 后续提交

以后每次修改后，使用以下命令提交和推送：

```bash
git add .
git commit -m "feat: 描述你的更改"
git push
```

## 注意事项

- 确保 `.gitignore` 已正确配置，避免提交敏感信息（如 `.env` 文件）
- 不要提交 `node_modules/` 目录
- 使用 Conventional Commits 格式编写提交信息

