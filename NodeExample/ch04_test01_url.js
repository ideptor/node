var url = require('url');

var curURL = url.parse('https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty');

var curStr = url.format(curURL);

console.log("address string: %s", curStr);
console.dir(curURL);

/*
$ node .\ch04_test.js
address string: https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'm.search.naver.com',
  port: null,
  hostname: 'm.search.naver.com',
  hash: null,
  search: '?query=steve+jobs&where=m&sm=mtp_hty',
  query: 'query=steve+jobs&where=m&sm=mtp_hty',
  pathname: '/search.naver',
  path: '/search.naver?query=steve+jobs&where=m&sm=mtp_hty',
  */

  var querystring = require('querystring');
  var param = querystring.parse(curURL.query);

  console.log("query: %s", param.query);
  console.log("origin: %s", querystring.stringify(param));

/*
query: steve jobs
origin: query=steve%20jobs&where=m&sm=mtp_hty

*/