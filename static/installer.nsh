!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "CluckCluckGo" "Software\Clients\StartMenuInternet\CluckCluckGo\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo" "" "CluckCluckGo HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo\Application" "AppUserModelId" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo\Application" "ApplicationIcon" "$INSTDIR\CluckCluckGo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo\Application" "ApplicationName" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo\Application" "ApplicationCompany" "CluckCluckGo"      
  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo\DefaultIcon" "DefaultIcon" "$INSTDIR\CluckCluckGo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\CluckCluckGo\shell\open\command" "" '"$INSTDIR\CluckCluckGo.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "CluckCluckGo" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "CluckCluckGo" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo" "" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\DefaultIcon" "" "$INSTDIR\CluckCluckGo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities" "ApplicationName" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities" "ApplicationIcon" "$INSTDIR\CluckCluckGo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities\FileAssociations" ".htm" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities\FileAssociations" ".html" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities\URLAssociations" "http" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities\URLAssociations" "https" "CluckCluckGo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\Capabilities\StartMenu" "StartMenuInternet" "CluckCluckGo"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo\shell\open\command" "" "$INSTDIR\CluckCluckGo.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\CluckCluckGo"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\CluckCluckGo"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "CluckCluckGo"
!macroend