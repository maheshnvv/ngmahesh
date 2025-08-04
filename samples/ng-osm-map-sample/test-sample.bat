@echo off
REM NgOsmMap Sample Testing Script for Windows
REM This script helps test both local and npm installations

echo 🗺️  NgOsmMap Sample Testing Script
echo ==================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Run this script from the ng-osm-map-sample directory
    exit /b 1
)

echo 📦 Installing base dependencies...
call npm install

echo.
echo Choose testing mode:
echo 1) Test with local build (development)
echo 2) Test with npm package (production)
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo 🔗 Testing with local build...
    echo Building library first...
    cd ..\..\
    call ng build ng-osm-map
    cd samples\ng-osm-map-sample
    
    echo Linking local build...
    call npm run install-local
    
    echo ✅ Local build linked! Starting development server...
    call npm start
) else if "%choice%"=="2" (
    echo 📦 Testing with npm package...
    call npm run install-npm
    
    echo ✅ NPM package installed! Starting development server...
    call npm start
) else (
    echo ❌ Invalid choice. Please run the script again.
    exit /b 1
)
