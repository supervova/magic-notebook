#!/bin/bash
set -Eeuo pipefail

readonly DIRECTORY='dist'
readonly BRANCH='gh-pages'
readonly GREEN='\033[0;32m'
readonly RESET='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DIST_PATH="${PROJECT_ROOT}/${DIRECTORY}"

log() {
  printf '%b%s%b\n' "${GREEN}" "$1" "${RESET}";
}

build_command() {
  pnpm -s build;
}

cleanup() {
  log 'Cleaning up...';
  cd "${PROJECT_ROOT}"

  if git worktree list --porcelain | grep -Fq "worktree ${DIST_PATH}"; then
    git worktree remove "${DIST_PATH}" --force;
  fi
}

trap cleanup EXIT

cd "${PROJECT_ROOT}"

if [ -d "${DIST_PATH}" ]; then
  log 'Deleting old content...';
  rm -rf "${DIST_PATH}";
fi

log "Checking out ${BRANCH}....";
git worktree add "${DIST_PATH}" "${BRANCH}";

log 'Generating site...';
build_command

# Создаем .gitignore в папке dist, чтобы исключить ненужные файлы
log 'Creating .gitignore to exclude unnecessary files...';
cat <<'GITIGNORE' > "${DIST_PATH}/.gitignore"
.gitignore
.editorconfig
$RECYCLE.BIN/
*.DS_Store
*.app
*.bak
*.code-workspace
*.log
*.sass-cache*
*.swp
*_notes
.DocumentRevisions-V100
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
._*
.com.apple.timemachine.donotpresent
.env
.env.*
.eslintcache
.fseventsd
.npm
.publish
.tmp
.vscode/*
.yarn
.yarn-integrity
Desktop.ini
Thumbs.db
backup
dist
ehthumbs.db
ehthumbs_vista.db
gulpfile.js
jspm_packages
node_modules
npm-debug.log*
pnpm-debug.log*
pnpm-lock.yaml
package.json
scripts/deploy.sh
src
yarn-debug.log*
yarn-error.log*
yarn.lock
GITIGNORE

log "Deploying ${BRANCH} branch...";
cd "${DIST_PATH}"
git add --all

if git diff --cached --quiet; then
  log 'No changes to deploy.';
  exit 0
fi

git commit -m 'Deploy updates'
git push origin "${BRANCH}"
