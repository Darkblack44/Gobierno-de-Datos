@echo off
:: ============================================================
:: PORTAL GOBIERNO DE DATOS – Iniciar servidor local
:: Doble clic para abrir el portal en el navegador.
:: No requiere VS Code ni instalaciones adicionales.
:: ============================================================

setlocal

set "PUERTO=8000"
set "URL=http://localhost:%PUERTO%"

:: Intentar con Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Iniciando servidor en %URL% ...
    start "" "%URL%"
    python -m http.server %PUERTO%
    goto :fin
)

:: Intentar con Python lanzador de Windows (py)
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo Iniciando servidor en %URL% ...
    start "" "%URL%"
    py -m http.server %PUERTO%
    goto :fin
)

:: Intentar con Node.js (npx serve)
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Iniciando servidor con Node.js en %URL% ...
    start "" "%URL%"
    npx --yes serve -l %PUERTO% .
    goto :fin
)

:: Ninguna opcion disponible
echo.
echo  No se encontro Python ni Node.js en este equipo.
echo  Opciones para ver los datos:
echo    1. Instala Python desde https://python.org  (gratis)
echo    2. Usa VS Code con la extension Live Server
echo    3. Sube el portal a un servidor web
echo.
pause
:fin
endlocal
