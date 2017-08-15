var Hashes = require("./hashes");

function SignatureGenrator(httpMethod, url, parameters, consumerSecret) {
    this.httpMethod = httpMethod;
    this.url = url;

    //无依赖的方法
    this.generateTimeStamp = function () {
        var date = new Date();

        return date.getTime();
    }

    this.generateNonce = function (length) {
        var len = length || 5;

        var randomStr = Math.random().toString(36).substr(2)
        var nonce = randomStr.substr(0, len);

        return nonce;
    }

    this.parameters = parameters;
    this.parameters.oauth_timestamp = this.generateTimeStamp();
    this.parameters.oauth_signature_method = "HMAC-SHA1";
    this.parameters.oauth_nonce = this.generateNonce();

    this.generateBaseUrl = function (httpMethod, url, parameters) {
        var httpMethod2 = httpMethod || this.httpMethod.toUpperCase();
        var url2 = url || this.url;
        var parameters2 = parameters || this.parameters;

        var encodeUrl = encodeURIComponent(url2);

        var paramStrList = [],
            paramStr = "";
        for(var k in parameters2) {
            paramStrList.push(encodeURIComponent(k) + "=" + encodeURIComponent(parameters2[k]));
        }
        paramStr = encodeURIComponent( paramStrList.sort().join("&") );

        return httpMethod2 + "&" + encodeUrl + "&" + paramStr;
    }

    this.baseUrl = this.generateBaseUrl();

    this.consumerSecret = consumerSecret;

    this.generateSignature = function () {
        var key = this.consumerSecret + "&";
        var baseUrl = this.baseUrl;
        this.signature = new Hashes.SHA1().b64_hmac(key, baseUrl);

        return this.signature;
    }

    this.parameters.oauth_signature = this.generateSignature();
}


module.exports = SignatureGenrator;
