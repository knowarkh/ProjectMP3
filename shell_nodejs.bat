@echo off
if "%1" == "setenv" goto setenv
set DRIVE_LTR=%~d0
set DRIVE_LTR=C:
cd P:\PRJSYNTH_2018_3PTLX1_C\ProjectMP3
TITLE Shell for Node.js 
%comspec% /k shell_nodejs.bat setenv %1
goto exit

:setenv
set DRIVE_LTR=%~d0
set DRIVE_LTR=C:
REM set HTTP_PROXY=http://squidva.univ-ubs.fr:3128
set PATH=%DRIVE_LTR%\PortableGit\bin;%DRIVE_LTR%\PortableGit\cmd;%DRIVE_LTR%\PortableGit;%PATH%
set PATH=%DRIVE_LTR%\UBS\serveurs\node-v10.13.0-win-x64;%PATH%
cd P:\PRJSYNTH_2018_3PTLX1_C\ProjectMP3
:exit