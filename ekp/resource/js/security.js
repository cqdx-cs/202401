Com_RegisterFile("security.js");Com_IncludeFile("aes.js");Com_IncludeFile("base64.js");Com_IncludeFile("sm2.js");var SECURITYKEY={toHexString:function(b){var a="";for(i=0;i<b.length;i++){a+=b.charCodeAt(i).toString(16)}return a},_getSessionId:function(){$.ajax({async:false,dataType:"script",url:Com_Parameter.ResPath+"js/session.jsp?_="+new Date().getTime()});var a="";if(window.getSessionId){a=getSessionId()}return a},supportEncodings:function(){return["aes","des","sm2"]},get:function(a){var c=SECURITYKEY._getSessionId();var b={};if(a==null||a=="aes"){if(c.length<32){c+="abcdefghijklmnopqrstuvwxyz1234567890"}c=c.toUpperCase();b.key=c.substring(0,16);b.iv=c.substring(16,32);b.security="\u4435\u5320\u4d35"}else{if(a=="sm2"){b.SM2PubKey=window.getSM2PubKey();b.security="\u534d\u3220\u4d45"}else{if(c.length<16){c+="abcdefghijklmnopqrstuvwxyz"}c=c.toUpperCase();b.key=SECURITYKEY.toHexString(c.substring(0,8));b.iv=SECURITYKEY.toHexString(c.substring(8,16));b.security="\u4445\u5320\u4d45"}}return b},getCookie:function(a){if(document.cookie.length>0){var b=document.cookie.split(";");for(i=0;i<b.length;i++){var c=b[i];var d=c.substring(0,c.indexOf("=")).toUpperCase();d=d.replace(/^\s*/,"").replace(/\s*$/,"");if(d==a){return unescape(c.substring(c.indexOf("=")+1,c.length))}}}return""}};function base64Convert(){return"\u4241\u5345\u3634{"+Base64.encode(arguments[0])+"}"}function _isMultipartForm(a){if(a==null){a=document.forms[0]}if(a!=null){if(a.encoding=="multipart/form-data"){return true}}return false}function _base64Encode(d,b,a){if(_isMultipartForm(b)){return d}else{var c=d;if(d!=null&&d.length>0){d=base64Convert(d)}if(c!=d){if(a==true){c="\u4645\u5810\u4d40"+d}else{c="\u4649\u5820\u4d45"+d}}return c}}function paramEncrypt(b,a){return desEncrypt(b,null,a)}function desEncrypt(b,c,a){if(_isMultipartForm(c)){return b}else{var d={};if(a==null||"sm2"==a.toLowerCase()){d=SECURITYKEY.get("sm2");b=SM2Utils.encs(d.SM2PubKey,b)}else{if("aes"==a.toLowerCase()){d=SECURITYKEY.get();b=CryptoJS.AES.encrypt(b,CryptoJS.enc.Utf8.parse(d.key),{iv:CryptoJS.enc.Utf8.parse(d.iv)}).toString()}else{d=SECURITYKEY.get("des");b=CryptoJS.DES.encrypt(b,CryptoJS.enc.Hex.parse(d.key),{iv:CryptoJS.enc.Hex.parse(d.iv)})}}return d.security+b}}function base64Encode(b,a){return _base64Encode(b,a)}function base64Encodex(b,a){return _base64Encode(b,a,true)};