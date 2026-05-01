# Todo App — Git Worktrees Example

A minimal todo app used to demonstrate **git worktrees** for parallel feature development.

## Branches

| Branch | Description |
|---|---|
| `main` | Base app — add/check/delete todos |
| `feature/dark-mode` | In-progress: dark mode toggle |
| `feature/user-auth` | In-progress: login screen & user state |

## Git Worktrees Demo

```bash
# Check out both features simultaneously — no stashing needed
git worktree add ../todo-dark-mode feature/dark-mode
git worktree add ../todo-user-auth feature/user-auth

# Each worktree is a separate directory with its own working tree
ls ../todo-dark-mode   # feature/dark-mode files
ls ../todo-user-auth   # feature/user-auth files

# List active worktrees
git worktree list

# Clean up when done
git worktree remove ../todo-dark-mode
git worktree remove ../todo-user-auth
```
