// excelToJson.js
// Requires XLSX library loaded in the HTML
function parseExcelFileToJson(file, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetA = workbook.Sheets['Task 1 (a)'];
    const jsonDataA = XLSX.utils.sheet_to_json(sheetA);
    const sheetB = workbook.Sheets['Task 1 (b)'];
    const jsonDataB = XLSX.utils.sheet_to_json(sheetB);
    callback({ sheetA: jsonDataA, sheetB: jsonDataB });
  };
  reader.readAsArrayBuffer(file);
}

// Export for use in script.js
window.parseExcelFileToJson = parseExcelFileToJson;