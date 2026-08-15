@echo off
chcp 65001 >nul
title LoveLive! HLTV - Development Server

echo ============================================
echo    LoveLive! HLTV 一键启动脚本
echo ============================================
echo.

echo [1/4] 正在清理构建缓存...
if exist ".vite" (
    rd /s /q ".vite"
    echo   已清除 Vite 构建缓存
) else (
    echo   无缓存可清理
)

echo.
echo [2/4] 正在清理 npm 缓存...
call npm cache clean --force
echo   npm 缓存清理完成

echo.
echo [3/4] 正在检查依赖...
if not exist "node_modules" (
    echo   正在安装依赖，请稍候...
    call npm install
    if %errorlevel% neq 0 (
        echo   依赖安装失败，请检查网络连接或 Node.js 版本
        pause
        exit /b %errorlevel%
    )
    echo   依赖安装完成！
) else (
    echo   依赖已存在，跳过安装
)

echo.
echo [4/4] 正在启动开发服务器...
echo 访问地址: http://localhost:5173
echo.

start "" http://localhost:5173

call npm run dev

pause