#!/bin/bash
directory=dist
branch=gh-pages
build_command() {
  gulp build --p
}

echo -e "\033[0;32mDeleting old content...\033[0m"
rm -rf $directory

echo -e "\033[0;32mChecking out $branch....\033[0m"
git worktree add $directory $branch

echo -e "\033[0;32mGenerating site...\033[0m"
build_command

# Создаем .gitignore в папке dist, чтобы исключить ненужные файлы
echo -e "\033[0;32mCreating .gitignore to exclude unnecessary files...\033[0m"
echo -e ".gitignore\n.editorconfig" > $directory/.gitignore

echo -e "\033[0;32mDeploying $branch branch...\033[0m"
cd $directory &&
  git add --all &&
  git commit -m "Deploy updates" &&
  git push origin $branch

echo -e "\033[0;32mCleaning up...\033[0m"
git worktree remove $directory
