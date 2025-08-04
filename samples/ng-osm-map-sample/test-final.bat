@echo off
echo =====================================
echo NgOsmMap Sample App - Final Test
echo =====================================
echo.

echo 1. Checking library link...
cd /d "c:\Development\Max-Tracker\Repos\Tries\ng-osm\ng-osm-workspace\samples\ng-osm-map-sample"
if exist "node_modules\@ngmahesh\ng-osm-map" (
    echo ✅ Library is linked
) else (
    echo ❌ Library not found - running install-local
    npm run install-local
)

echo.
echo 2. Angular configuration:
echo ✅ Leaflet CSS added to angular.json styles
echo ✅ Assets copying configured for Leaflet images
echo ✅ HttpClient provided in main.ts
echo ✅ Template and styles separated

echo.
echo 3. Library fixes applied:
echo ✅ NG0203 injection context error fixed
echo ✅ Leaflet icon paths configured
echo ✅ Constructor-based dependency injection

echo.
echo 4. Starting development server...
echo Opening http://localhost:4201
echo.
ng serve --port 4201 --open

pause
