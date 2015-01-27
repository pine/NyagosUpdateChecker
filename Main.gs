var SPRED_SHEET_ID = '1V-bF1PEB6tj6x0m-tOGmWKw5j0bUoXBZfG2h2b42FHE';

var GITHUB_OWNER = 'zetamatta';
var GITHUB_REPO = 'nyagos';

var VERSION_REGEX = /^(\d+\.)*\d+$/;
var DOWNLOAD_URL_REGEX = /\.zip$/;

/**
 * GET /?format='json'|'xml'
 */
function doGet(e) {
  return entryPoint(e, 'get');
}

function entryPoint(e, method) {
  var format = e.parameter.format || 'json';
  var info = getRelease();
  
  // エラーログを記載
  if (info.errMsg) {
    insertRow([new Date(), info.errMsg]);
  }
  
  return render(info, format);
}

/**
 * 最新のリリースを取得する
 */
function getRelease () {
  var releases = GitHub.getReleases(GITHUB_OWNER, GITHUB_REPO);
  if (!releases) return { errMsg: 'Not found' };
  
  for (var i = 0; i < releases.length; ++i) {
    var name = releases[i].name.replace(/_/g, '.');
    
    if (!VERSION_REGEX.test(name)) continue;
    if (!releases[i].assets) continue;
    
    for (var j = 0; j < releases[i].assets.length; ++j) {
      var asset = releases[i].assets[j];
      var downloadUrl = asset.browser_download_url;
      
      if (DOWNLOAD_URL_REGEX.test(downloadUrl)) {
        return {
          'version': name,
          'downloadUrl': downloadUrl
        }
      }
    }
  }
  
  return { errMsg: 'Not found' };
}

function insertRow(rowContents) {
  try {
    var ss = SpreadsheetApp.openById(SPRED_SHEET_ID);
    var sheet = ss.getActiveSheet();
    
    sheet.appendRow(rowContents);
    
    return null;
  }
  catch (e) {
    return e;
  }
}

function render(data, format) {
  
  if (!('errMsg' in data)) {
    data.errMsg = null;
  }
  
  data.isSucceeded = !data.errMsg;
  
  if (format === 'xml') {
    return createXmlOutput(data);
  }
  
  return createJsonOutput(data);
}

function createJsonOutput(data) {
  var mime = ContentService.MimeType.JSON;
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(mime);
  
  return output;
}

function createXmlOutput(data) { 
  var mime = ContentService.MimeType.XML;
  var output = ContentService.createTextOutput(xmlStringify(data));
  output.setMimeType(mime);
  
  return output;
}
