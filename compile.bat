@echo off
echo Compiling...
call npx tsc @./compile.txt --outDir ./site/scripts -t ES2023
pause
