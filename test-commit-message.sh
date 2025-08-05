#!/bin/bash

# Script to test commit message format
# Usage: ./test-commit-message.sh "Your commit message"

if [ $# -eq 0 ]; then
    echo "🔍 Commit Message Validator"
    echo ""
    echo "Usage: $0 \"Your commit message\""
    echo ""
    echo "Example: $0 \"[feat] Add new map component\""
    echo ""
    exit 1
fi

commit_message="$1"
valid_keywords="fix|feat|feature|upgrade|major|breaking|docs|style|refactor|perf|test|chore"

echo "🔍 Testing commit message format..."
echo "Message: $commit_message"
echo ""

# Check if the commit message contains at least one valid keyword in brackets
if ! echo "$commit_message" | grep -qE "\\[($valid_keywords)\\]"; then
    echo "❌ Commit message validation failed!"
    echo ""
    echo "Your commit message must include at least one of these keywords in brackets:"
    echo ""
    echo "  📦 Version Control Keywords:"
    echo "    [fix]       - Bug fixes (patch: 1.0.0 → 1.0.1)"
    echo "    [feat]      - New features (minor: 1.0.0 → 1.1.0)"
    echo "    [feature]   - New features (minor: 1.0.0 → 1.1.0)"
    echo "    [upgrade]   - Breaking changes (major: 1.0.0 → 2.0.0)"
    echo "    [major]     - Breaking changes (major: 1.0.0 → 2.0.0)"
    echo "    [breaking]  - Breaking changes (major: 1.0.0 → 2.0.0)"
    echo ""
    echo "  📝 Other Valid Keywords (patch version bump):"
    echo "    [docs]      - Documentation changes"
    echo "    [style]     - Code style changes"
    echo "    [refactor]  - Code refactoring"
    echo "    [perf]      - Performance improvements"
    echo "    [test]      - Adding or updating tests"
    echo "    [chore]     - Maintenance tasks"
    echo ""
    exit 1
fi

# Check for empty brackets
if echo "$commit_message" | grep -qE "\\[\\s*\\]"; then
    echo "❌ Found empty brackets in commit message!"
    echo "Brackets must contain valid keywords."
    exit 1
fi

echo "✅ Commit message format is valid!"
echo ""

# Show what version bump will be triggered
if echo "$commit_message" | grep -qE "\\[(upgrade|major|breaking)\\]"; then
    echo "🚀 This commit will trigger a MAJOR version bump (breaking changes)"
    echo "   Example: 1.0.0 → 2.0.0"
elif echo "$commit_message" | grep -qE "\\[(feat|feature)\\]"; then
    echo "🚀 This commit will trigger a MINOR version bump (new features)"
    echo "   Example: 1.0.0 → 1.1.0"
elif echo "$commit_message" | grep -qE "\\[(fix|perf)\\]"; then
    echo "🚀 This commit will trigger a PATCH version bump (bug fixes/improvements)"
    echo "   Example: 1.0.0 → 1.0.1"
else
    echo "🚀 This commit will trigger a PATCH version bump (maintenance)"
    echo "   Example: 1.0.0 → 1.0.1"
fi

echo ""
echo "Ready to commit! 🎉"
