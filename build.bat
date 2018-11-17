@echo off 
echo ----- Run webpack and copy bundle files ------
webpack && xcopy build\bundle.js ..\NMQuizBackend\TestPrep\Scripts /s /e /i /h /y && xcopy build\bundle.js.map ..\NMQuizBackend\TestPrep\Scripts /s /e /i /h /y