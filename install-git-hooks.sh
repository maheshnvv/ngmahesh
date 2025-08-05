#!/bin/bash

# Script to install git hooks for commit message validation

echo "🔧 Installing Git Hooks..."

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOOKS_DIR="$SCRIPT_DIR/.githooks"
GIT_HOOKS_DIR="$SCRIPT_DIR/.git/hooks"

# Check if .git directory exists
if [ ! -d "$SCRIPT_DIR/.git" ]; then
    echo "❌ Error: .git directory not found. Make sure you're in a git repository."
    exit 1
fi

# Create .git/hooks directory if it doesn't exist
mkdir -p "$GIT_HOOKS_DIR"

# Copy and set permissions for commit-msg hook
if [ -f "$HOOKS_DIR/commit-msg" ]; then
    cp "$HOOKS_DIR/commit-msg" "$GIT_HOOKS_DIR/commit-msg"
    chmod +x "$GIT_HOOKS_DIR/commit-msg"
    echo "✅ Installed commit-msg hook"
else
    echo "❌ Error: commit-msg hook not found in .githooks directory"
    exit 1
fi

echo ""
echo "🎉 Git hooks installed successfully!"
echo ""
echo "📋 What's been installed:"
echo "  • commit-msg hook - validates commit message format"
echo ""
echo "📝 Commit message requirements:"
echo "  • Must include keywords in brackets: [fix], [feat], [major], etc."
echo "  • Keywords determine version bump type:"
echo "    - [fix] → patch version (1.0.0 → 1.0.1)"
echo "    - [feat] → minor version (1.0.0 → 1.1.0)"
echo "    - [major] → major version (1.0.0 → 2.0.0)"
echo ""
echo "💡 Example commit messages:"
echo "  git commit -m '[feat] Add new map component'"
echo "  git commit -m '[fix] Resolve marker positioning'"
echo "  git commit -m '[major] Breaking API changes'"
echo ""
