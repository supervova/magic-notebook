#!/bin/bash
directory=dist
branch=gh-pages
build_command() {
  gulp --p
}

echo -e "\033[0;32mDeleting old content...\033[0m"
rm -rf $directory

echo -e "\033[0;32mChecking out $branch....\033[0m"
git worktree add $directory $branch

echo -e "\033[0;32mGenerating site...\033[0m"
build_command

# Создаем .gitignore в папке dist, чтобы исключить ненужные файлы
echo -e "\033[0;32mCreating .gitignore to exclude unnecessary files...\033[0m"
echo -e ".gitignore\n.editorconfig\n\$RECYCLE.BIN/\n*.DS_Store\n*.app\n*.bak\n*.code-workspace\n*.log\n*.sass-cache*\n*.swp\n*_notes\n.DocumentRevisions-V100\n.Spotlight-V100\n.TemporaryItems\n.Trashes\n.VolumeIcon.icns\n._*\n.com.apple.timemachine.donotpresent\n.env\n.env.*\n.eslintcache\n.fseventsd\n.npm\n.publish\n.tmp\n.vscode/*\n.yarn\n.yarn\n.yarn-integrity\nDesktop.ini\nThumbs.db\nbackup\ndeploy.sh\ndist\nehthumbs.db\nehthumbs_vista.db\ngulpfile.babel.js\njspm_packages\nnode_modules\nnpm-debug.log*\npackage.json\nsrc\nyarn-debug.log*\nyarn-error.log*\nyarn.lock\n" > $directory/.gitignore

echo -e "\033[0;32mDeploying $branch branch...\033[0m"
cd $directory &&
  git add --all &&
  git commit -m "Deploy updates" &&
  git push origin $branch

echo -e "\033[0;32mCleaning up...\033[0m"
git worktree remove $directory
