@echo off
setlocal enabledelayedexpansion

echo 🔧 Installing Git Hooks...

:: Get current directory
set "SCRIPT_DIR=%~dp0"
set "HOOKS_DIR=%SCRIPT_DIR%.githooks"
set "GIT_HOOKS_DIR=%SCRIPT_DIR%.git\hooks"

:: Check if .git directory exists
if not exist "%SCRIPT_DIR%.git" (
    echo ❌ Error: .git directory not found. Make sure you're in a git repository.
    exit /b 1
)

:: Create .git/hooks directory if it doesn't exist
if not exist "%GIT_HOOKS_DIR%" (
    mkdir "%GIT_HOOKS_DIR%"
)

:: Copy commit-msg hook
if exist "%HOOKS_DIR%\commit-msg" (
    copy "%HOOKS_DIR%\commit-msg" "%GIT_HOOKS_DIR%\commit-msg" >nul
    echo ✅ Installed commit-msg hook
) else (
    echo ❌ Error: commit-msg hook not found in .githooks directory
    exit /b 1
)

echo.
echo 🎉 Git hooks installed successfully!
echo.
echo 📋 What's been installed:
echo   • commit-msg hook - validates commit message format
echo.
echo 📝 Commit message requirements:
echo   • Must include keywords in brackets: [fix], [feat], [major], etc.
echo   • Keywords determine version bump type:
echo     - [fix] → patch version (1.0.0 → 1.0.1^)
echo     - [feat] → minor version (1.0.0 → 1.1.0^)
echo     - [major] → major version (1.0.0 → 2.0.0^)
echo.
echo 💡 Example commit messages:
echo   git commit -m "[feat] Add new map component"
echo   git commit -m "[fix] Resolve marker positioning"
echo   git commit -m "[major] Breaking API changes"
echo.

pause
