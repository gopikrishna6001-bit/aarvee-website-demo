# Aarvee website

## Public demo URL

Share this link (GitHub Pages):

**https://gopikrishna6001-bit.github.io/aarvee-website-demo/**

Repo: https://github.com/gopikrishna6001-bit/aarvee-website-demo

After local edits, publish with:
```bash
git add -A && git commit -m "Update demo" && git push
```
## Protected in git

The site is **committed on `main`** so Cursor workspace moves cannot wipe it as untracked files again.

| What | Where |
|------|--------|
| Live restored build (v5) | `index.html`, `css/`, `js/` — tag `aarvee-restored-v5` |
| Later editorial rebuild | `_backup_after_rebuild_v11_20260905_151559/` |
| Extra copy | `git stash@{0}` (kept on purpose — do not drop) |

### If files ever look missing

```bash
cd "/Users/macbookprom3/Documents/Aarvee"
git checkout main -- index.html css/styles.css js/main.js
# or pin exactly to the restored tag:
git checkout aarvee-restored-v5 -- index.html css/styles.css js/main.js
```

### Preview

```bash
cd "/Users/macbookprom3/Documents/Aarvee"
python3 -m http.server 5173
```

Open http://localhost:5173/

### Safety rule

Commit (or stash) before any Cursor “move workspace / move agent to root” on this folder. Untracked files are what got wiped last time.
