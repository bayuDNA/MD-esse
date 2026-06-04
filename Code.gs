function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Aplikasi Rekap Foto')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function uploadData(base64Data, status) {
  try {
    // 1. Simpan Foto ke Google Drive
    var folderName = "Foto_Rekap_App";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    var contentType = base64Data.substring(5, base64Data.indexOf(';'));
    var bytes = Utilities.base64Decode(base64Data.split(',')[1]);
    var blob = Utilities.newBlob(bytes, contentType, "Foto_" + new Date().getTime() + ".jpg");
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    var fileUrl = file.getUrl();
    
    // 2. Simpan Data ke Google Sheets
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Rekap");
    
    sheet.appendRow([
      new Date(), // Timestamp
      fileUrl,    // Link Foto
      status      // Status Pilihan
    ]);
    
    // 3. Ambil data rekap terbaru untuk ditampilkan di UI
    return {
      success: true,
      rekap: getLiveDashboardData()
    };
    
  } catch(e) {
    return { success: false, error: e.toString() };
  }
}

function getLiveDashboardData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Dashboard");
    return {
      terpasang: sheet.getRange("B1").getValue() || 0,
      tidakTerpasang: sheet.getRange("B2").getValue() || 0,
      tutupPermanen: sheet.getRange("B3").getValue() || 0
    };
  } catch(e) {
    return { terpasang: 0, tidakTerpasang: 0, tutupPermanen: 0 };
  }
}
