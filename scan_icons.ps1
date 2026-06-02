$files = Get-ChildItem -Path 'f:\sakshant project\antigravityb\src\app\dashboard' -Recurse -Filter 'page.tsx'
foreach($f in $files){
    Write-Host "===FILE: $($f.FullName)"
    $lines = Get-Content $f.FullName
    for($i=0; $i -lt $lines.Length; $i++){
        if($lines[$i] -match 'icon|Icon|svg'){
            Write-Host "  $($i+1): $($lines[$i].TrimStart())"
        }
    }
}
