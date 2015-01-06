Nyagos Update Checker
=====================

This is a Google Apps Script that get latest version of NYAGOS.

## Developing enviroment

- JavaScript
- Google Apps Script (Spreadsheet)

## API
### Endpoint

```
GET /?format=[output format]
```

### Parameters
Both parameters are optional.

- format: 'json' (default) or 'xml'

### Examples
This app runs in my spreadsheet.

- [format=json](https://script.google.com/macros/s/AKfycbwp4oVF6hmKrBTYpJUp5iDPXvZseV3W4qZNMpPzjOapFVFBVDs/exec?format=json)
```json
{
    "version":"4.0.3.0",
    "downloadUrl":"https://github.com/zetamatta/nyagos/releases/download/4.0.3_0/nyagos-4.0.3_0.zip",
    "errMsg":null,
    "isSucceeded":true
}
```
- [format=xml](https://script.google.com/macros/s/AKfycbwp4oVF6hmKrBTYpJUp5iDPXvZseV3W4qZNMpPzjOapFVFBVDs/exec?format=xml)
```xml
<object>
    <version>4.0.3.0</version>
    <downloadUrl>
        https://github.com/zetamatta/nyagos/releases/download/4.0.3_0/nyagos-4.0.3_0.zip
    </downloadUrl>
    <errMsg>
        <null/>
    </errMsg>
    <isSucceeded>
        <true/>
    </isSucceeded>
</object>
```

### Tests
There are some tests written by [Vows](http://vowsjs.org/) and [Chai](http://vowsjs.org/). The tests use some mock that run on Node.js as Google Apps Script API.

```
$ npm test
```

### License
MIT License<br />
Copyright (C) 2014-2015 Pine Mizune