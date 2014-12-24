var GitHub = (function () {
  var API_ENDPOINT = 'https://api.github.com/';
  
  function getJsonContent (url) {
    var params = {
      headers: {
        Accept: 'application/vnd.github.v3.full+json'
      }
    };
    
    var res = UrlFetchApp.fetch(url, params);
    var contentText = res.getContentText();
    var content = JSON.parse(contentText);
    
    if (res.getResponseCode() !== 200) {
      return null;
    }
    
    return content;
  }
  
  function getReleases (owner, repo) {
    var url = API_ENDPOINT + 'repos/' + owner + '/' + repo + '/releases';
    return getJsonContent(url);
  }
  
  return {
    'getReleases': getReleases
  };
})();