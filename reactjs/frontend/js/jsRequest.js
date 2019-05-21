/**
 * JsHttpRequest: JavaScript 'AJAX' data loader
 * Minimized version: see debug directory for the complete one.
 *
 * @license LGPL
 * @author Dmitry Koterov, http://en.dklab.ru/lib/JsHttpRequest/
 * @version 5.x $Id$
 */
function JsHttpRequest(){
var t=this;
t.onreadystatechange=null;
t.readyState=0;
t.responseText=null;
t.responseXML=null;
t.status=200;
t.statusText='OK';
t.responseJS=null;
t.caching=false;
t.loader=null;
t.session_name='PHPSESSID';
t._ldObj=null;
t._reqHeaders=[];
t._openArgs=null;
t._errors={inv_form_el:'Invalid FORM element detected: name=%, tag=%',must_be_single_el:'If used, <form> must be a single HTML element in the list.',js_invalid:'JavaScript code generated by backend is invalid!\n%',url_too_long:'Cannot use so long query with GET request (URL is larger than % bytes)',unk_loader:'Unknown loader: %',no_loaders:'No loaders registered at all, please check JsHttpRequest.LOADERS array',no_loader_matched:'Cannot find a loader which may process the request. Notices are:\n%',no_headers:'Method setRequestHeader() cannot work together with the % loader.'};
t.abort=function(){
var _this=this;
if(_this._ldObj&&_this._ldObj.abort){
_this._ldObj.abort();
}
_this._cleanup();
if(_this.readyState==0){
return;
}
if(_this.readyState==1&&!_this._ldObj){
_this.readyState=0;
return;
}
_this._changeReadyState(4,true);
};
t.open=function(_2,_3,_4,_5,_6){
var _this=this;
try{
if(document.location.search.match(new RegExp('[&?]'+_this.session_name+'=([^&?]*)'))||document.cookie.match(new RegExp('(?:;|^)\\s*'+_this.session_name+'=([^;]*)'))){
_3+=(_3.indexOf('?')>=0?'&':'?')+_this.session_name+'='+this.escape(RegExp.$1);
}
}
catch(e){true}
_this._openArgs={method:(_2||'').toUpperCase(),url:_3,asyncFlag:_4,username:_5!=null?_5:'',password:_6!=null?_6:''};
_this._ldObj=null;
_this._changeReadyState(1,true);
return true;
};
t.send=function(_7){
if(!this.readyState){return;}
this._changeReadyState(1,true);
this._ldObj=null;
var _8=[];
var _9=[];
if(!this._hash2query(_7,null,_8,_9)){return;}
var _a=null;
if(this.caching&&!_9.length){
_a=this._openArgs.username+':'+this._openArgs.password+'@'+this._openArgs.url+'|'+_8+'#'+this._openArgs.method;
var _b=JsHttpRequest.CACHE[_a];
if(_b){
this._dataReady(_b[0],_b[1]);
return false;
}
}
var _c=(this.loader||'').toLowerCase();
if(_c&&!JsHttpRequest.LOADERS[_c]){return this._error('unk_loader',_c);}
var _d=[];
var _e=JsHttpRequest.LOADERS;
for(var _f in _e){
var ldr=_e[_f].loader;
if(!ldr){continue;}
if(_c&&_f!=_c){continue;}
var _11=new ldr(this);
JsHttpRequest.extend(_11,this._openArgs);
JsHttpRequest.extend(_11,{queryText:_8.join('&'),queryElem:_9,id:(new Date().getTime())+''+JsHttpRequest.COUNT++,hash:_a,span:null});
var _12=_11.load();
if(!_12){
this._ldObj=_11;
JsHttpRequest.PENDING[_11.id]=this;
return true;
}
if(!_c){
_d[_d.length]='- '+_f.toUpperCase()+': '+this._l(_12);
}else{
return this._error(_12);
}
}
return _f?this._error('no_loader_matched',_d.join('\n')):this._error('no_loaders');
};
t.getAllResponseHeaders=function(){
var _this=this;
return _this._ldObj&&_this._ldObj.getAllResponseHeaders?_this._ldObj.getAllResponseHeaders():[];
};
t.getResponseHeader=function(){
var _this=this;
return _this._ldObj&&_this._ldObj.getResponseHeader?_this._ldObj.getResponseHeader():[];
};
t.setRequestHeader=function(_14,_15){
this._reqHeaders[this._reqHeaders.length]=[_14,_15];
};
t._dataReady=function(_16,js){
if(this.caching&&this._ldObj){
JsHttpRequest.CACHE[this._ldObj.hash]=[_16,js];
}
if(_16!==null||js!==null){
this.status=4;
this.responseText=this.responseXML=_16;
this.responseJS=js;
}else{
this.status=500;
this.responseText=this.responseXML=this.responseJS=null;
}
this._changeReadyState(2);
this._changeReadyState(3);
this._changeReadyState(4);
this._cleanup();
};
t._l=function(_18){
var i=0,p=0,msg=this._errors[_18[0]];
while((p=msg.indexOf('%',p))>=0){
var a=_18[++i]+'';
msg=msg.substring(0,p)+a+msg.substring(p+1,msg.length);
p+=1+a.length;
}
return msg;
};
t._error=function(msg){
msg=this._l(typeof (msg)=='string'?arguments:msg);
msg='JsHttpRequest: '+msg;
if(!window.Error){
throw msg;
}else{
if((new Error(1,'test')).description=='test'){
throw new Error(1,msg);
}else{
throw new Error(msg);
}
}
};
t._hash2query=function(_1e,_1f,_20,_21){
if(_1f==null){
_1f='';
}
if((''+typeof (_1e)).toLowerCase()=='object'){
var _22=false;
if(_1e&&_1e.parentNode&&_1e.parentNode.appendChild&&_1e.tagName&&_1e.tagName.toUpperCase()=='FORM'){
_1e={form:_1e};
}
for(var k in _1e){
var v=_1e[k];
if(v instanceof Function){
continue;
}
var _25=_1f?_1f+'['+this.escape(k)+']':this.escape(k);
var _26=v&&v.parentNode&&v.parentNode.appendChild&&v.tagName;
if(_26){
var tn=v.tagName.toUpperCase();
if(tn=='FORM'){
_22=true;
}else{
if(tn=='INPUT'||tn=='TEXTAREA'||tn=='SELECT'){true}
else{return this._error('inv_form_el',(v.name||''),v.tagName);}
}
_21[_21.length]={name:_25,e:v};
}else{
if(v instanceof Object){
this._hash2query(v,_25,_20,_21);
}else{
if(v===null){
continue;
}
if(v===true){
v=1;
}
if(v===false){
v='';
}
_20[_20.length]=_25+'='+this.escape(''+v);
}
}
if(_22&&_21.length>1){
return this._error('must_be_single_el');
}
}
}else{
_20[_20.length]=_1e;
}
return true;
};
t._cleanup=function(){
var _28=this._ldObj;
if(!_28){
return;
}
JsHttpRequest.PENDING[_28.id]=false;
var _29=_28.span;
if(!_29){
return;
}
_28.span=null;
var _2a=function(){
_29.parentNode.removeChild(_29);
};
JsHttpRequest.setTimeout(_2a,50);
};
t._changeReadyState=function(s,_2c){
if(_2c){
this.status=this.statusText=this.responseJS=null;
this.responseText='';
}
this.readyState=s;
if(this.onreadystatechange){this.onreadystatechange();}
};
t.escape=function(s){return escape(s).replace(new RegExp('\\+','g'),'%2B');};
}
JsHttpRequest.COUNT=0;
JsHttpRequest.MAX_URL_LEN=2000;
JsHttpRequest.CACHE={};
JsHttpRequest.PENDING={};
JsHttpRequest.LOADERS={};
JsHttpRequest._dummy=function(){};
JsHttpRequest.TIMEOUTS={s:window.setTimeout,c:window.clearTimeout};
JsHttpRequest.setTimeout=function(_2e,dt){
window.JsHttpRequest_tmp=JsHttpRequest.TIMEOUTS.s;
if(typeof (_2e)=='string'){
id=window.JsHttpRequest_tmp(_2e,dt);
}else{
var id=null;
var _31=function(){
_2e();
delete JsHttpRequest.TIMEOUTS[id];
};
id=window.JsHttpRequest_tmp(_31,dt);
JsHttpRequest.TIMEOUTS[id]=_31;
}
window.JsHttpRequest_tmp=null;
return id;
};
JsHttpRequest.clearTimeout=function(id){
window.JsHttpRequest_tmp=JsHttpRequest.TIMEOUTS.c;
delete JsHttpRequest.TIMEOUTS[id];
var r=window.JsHttpRequest_tmp(id);
window.JsHttpRequest_tmp=null;
return r;
};
JsHttpRequest.query=function(url,_35,_36,_37){
var req=new this();
req.caching=!_37;
req.onreadystatechange=function(){
if(req.readyState==4){
_36(req.responseJS,req.responseText);
}
};
var _39=null;
if(url.match(/^((\w+)\.)?(GET|POST)\s+(.*)/i)){
req.loader=RegExp.$2?RegExp.$2:null;
_39=RegExp.$3;
url=RegExp.$4;
}
req.open(_39,url,true);
req.send(_35);
};
JsHttpRequest.dataReady=function(d){
var th=this.PENDING[d.id];
delete this.PENDING[d.id];
if(th){
th._dataReady(d.text,d.js);
}else{
if(th!==false){
throw 'dataReady(): unknown pending id: '+d.id;
}
}
};
JsHttpRequest.extend=function(_3c,src){
for(var k in src){
_3c[k]=src[k];
}
};
JsHttpRequest.LOADERS.xml={loader:function(req){
JsHttpRequest.extend(req._errors,{xml_no:'Cannot use XMLHttpRequest or ActiveX loader: not supported',xml_no_diffdom:'Cannot use XMLHttpRequest to load data from different domain %',xml_no_headers:'Cannot use XMLHttpRequest loader or ActiveX loader, POST method: headers setting is not supported, needed to work with encodings correctly',xml_no_form_upl:'Cannot use XMLHttpRequest loader: direct form elements using and uploading are not implemented'});
this.load=function(){
if(this.queryElem.length){return ['xml_no_form_upl'];}
if(this.url.match(new RegExp('^([a-z]+://[^\\/]+)(.*)','i'))){
if(RegExp.$1.toLowerCase()!=document.location.protocol+'//'+document.location.hostname.toLowerCase()){return ['xml_no_diffdom',RegExp.$1];}
}
var xr=null;
if(window.XMLHttpRequest){
try{xr=new XMLHttpRequest();}
catch(e){true}
}else{
if(window.ActiveXObject){
try{xr=new ActiveXObject('Microsoft.XMLHTTP');}
catch(e){true}
if(!xr){
try{xr=new ActiveXObject('Msxml2.XMLHTTP');}
catch(e){true}
}
}
}
if(!xr){return ['xml_no'];}
var _41=window.ActiveXObject||xr.setRequestHeader;
if(!this.method){this.method=_41&&this.queryText.length?'POST':'GET';}
if(this.method=='GET'){
if(this.queryText){this.url+=(this.url.indexOf('?')>=0?'&':'?')+this.queryText;}
this.queryText='';
if(this.url.length>JsHttpRequest.MAX_URL_LEN){return ['url_too_long',JsHttpRequest.MAX_URL_LEN];}
}else{if(this.method=='POST'&&!_41){return ['xml_no_headers'];}}
this.url+=(this.url.indexOf('?')>=0?'&':'?')+'JsHttpRequest='+(req.caching?'0':this.id)+'-xml';
var id=this.id;
xr.onreadystatechange=function(){
if(xr.readyState!=4){return;}
xr.onreadystatechange=JsHttpRequest._dummy;
req.status=null;
try{
req.status=xr.status;
req.responseText=xr.responseText;
}
catch(e){true}
if(!req.status){return;}
try{eval('JsHttpRequest._tmp = function(id) { var d = '+req.responseText+'; d.id = id; JsHttpRequest.dataReady(d); }');}
catch(e){return req._error('js_invalid',req.responseText);}
JsHttpRequest._tmp(id);
JsHttpRequest._tmp=null;
};
xr.open(this.method,this.url,true,this.username,this.password);
if(_41){
for(var i=0;i<req._reqHeaders.length;i++){xr.setRequestHeader(req._reqHeaders[i][0],req._reqHeaders[i][1]);}
xr.setRequestHeader('Content-Type','application/octet-stream');
}
xr.send(this.queryText);
this.span=null;
this.xr=xr;
return null;
};
this.getAllResponseHeaders=function(){return this.xr.getAllResponseHeaders();};
this.getResponseHeader=function(_44){return this.xr.getResponseHeader(_44);};
this.abort=function(){
this.xr.abort();
this.xr=null;
};
}};
JsHttpRequest.LOADERS.script={loader:function(req){
JsHttpRequest.extend(req._errors,{script_only_get:'Cannot use SCRIPT loader: it supports only GET method',script_no_form:'Cannot use SCRIPT loader: direct form elements using and uploading are not implemented'});
this.load=function(){
if(this.queryText){this.url+=(this.url.indexOf('?')>=0?'&':'?')+this.queryText;}
this.url+=(this.url.indexOf('?')>=0?'&':'?')+'JsHttpRequest='+this.id+'-'+'script';
this.queryText='';
if(!this.method){this.method='GET';}
if(this.method!=='GET'){return ['script_only_get'];}
if(this.queryElem.length){return ['script_no_form'];}
if(this.url.length>JsHttpRequest.MAX_URL_LEN){return ['url_too_long',JsHttpRequest.MAX_URL_LEN];}
if(req._reqHeaders.length){return ['no_headers','SCRIPT'];}
var th=this,d=document,s=null,b=d.body;
if(!window.opera){
this.span=s=d.createElement('SCRIPT');
var _4a;
_4a=function(){
s.language='JavaScript';
if(s.setAttribute){
s.setAttribute('src',th.url);
}else{
s.src=th.url;
}
b.insertBefore(s,b.lastChild);
};
}else{
this.span=s=d.createElement('SPAN');
s.style.display='none';
b.insertBefore(s,b.lastChild);
s.innerHTML='Workaround for IE.<s'+'cript></'+'script>';
_4a=function(){
s=s.getElementsByTagName('SCRIPT')[0];
s.language='JavaScript';
if(s.setAttribute){
s.setAttribute('src',th.url);
}else{
s.src=th.url;
}
};
}
JsHttpRequest.setTimeout(_4a,10);
return null;
};
}};
JsHttpRequest.LOADERS.form={loader:function(req){
JsHttpRequest.extend(req._errors,{form_el_not_belong:'Element \'%\' does not belong to any form!',form_el_belong_diff:'Element \'%\' belongs to a different form. All elements must belong to the same form!',form_el_inv_enctype:'Attribute \'enctype\' of the form must be \'%\' (for IE), \'%\' given.'});
this.load=function(){
var th=this;
if(!th.method){th.method='POST';}
th.url+=(th.url.indexOf('?')>=0?'&':'?')+'JsHttpRequest='+th.id+'-'+'form';
if(req._reqHeaders.length){return ['no_headers','FORM'];}
if(th.method=='GET'){
if(th.queryText){th.url+=(th.url.indexOf('?')>=0?'&':'?')+th.queryText;}
if(th.url.length>JsHttpRequest.MAX_URL_LEN){return ['url_too_long',JsHttpRequest.MAX_URL_LEN];}
var p=th.url.split('?',2);
th.url=p[0];
th.queryText=p[1]||'';
}
var _4e=null;
var _4f=false;
if(th.queryElem.length){
if(th.queryElem[0].e.tagName.toUpperCase()=='FORM'){
_4e=th.queryElem[0].e;
_4f=true;
th.queryElem=[];
}else{
_4e=th.queryElem[0].e.form;
for(var i=0;i<th.queryElem.length;i++){
var e=th.queryElem[i].e;
if(!e.form){
return ['form_el_not_belong',e.name];
}
if(e.form!=_4e){
return ['form_el_belong_diff',e.name];
}
}
}
if(th.method=='POST'){
var _52='multipart/form-data';
var _53=(_4e.attributes.encType&&_4e.attributes.encType.nodeValue)||(_4e.attributes.enctype&&_4e.attributes.enctype.value)||_4e.enctype;
if(_53!=_52){
return ['form_el_inv_enctype',_52,_53];
}
}
}
var d=_4e&&(_4e.ownerDocument||_4e.document)||document;
var _55='jshr_i_'+th.id;
var s=th.span=d.createElement('DIV');
s.style.position='absolute';
s.style.display='none';
s.style.visibility='hidden';
s.innerHTML=(_4e?'':'<form'+(th.method=='POST'?' enctype=\'multipart/form-data\' method=\'post\'':'')+'></form>')+'<iframe name=\''+_55+'\' id=\''+_55+'\' style=\'width:0px; height:0px; overflow:hidden; border:none\'></iframe>';
if(!_4e){_4e=th.span.firstChild;}
d.body.insertBefore(s,d.body.lastChild);
var _57=function(e,_59){
var sv=[];
var _5b=e;
if(e.mergeAttributes){
_5b=d.createElement('form');
_5b.mergeAttributes(e,false);
}
for(var i=0;i<_59.length;i++){
var k=_59[i][0],v=_59[i][1];
sv[sv.length]=[k,_5b.getAttribute(k)];
_5b.setAttribute(k,v);
}
if(e.mergeAttributes){
e.mergeAttributes(_5b,false);
}
return sv;
};
var _5f=function(){
var i;
top.JsHttpRequestGlobal=JsHttpRequest;
var _60=[];
if(!_4f){
for(i=0,n=_4e.elements.length;i<n;i++){
_60[i]=_4e.elements[i].name;
_4e.elements[i].name='';
}
}
var qt=th.queryText.split('&');
for(i=qt.length-1;i>=0;i--){
var _64=qt[i].split('=',2);
var e=d.createElement('INPUT');
e.type='hidden';
e.name=unescape(_64[0]);
e.value=_64[1]!=null?unescape(_64[1]):'';
_4e.appendChild(e);
}
for(i=0;i<th.queryElem.length;i++){
th.queryElem[i].e.name=th.queryElem[i].name;
}
var sv=_57(_4e,[['action',th.url],['method',th.method],['onsubmit',null],['target',_55]]);
_4e.submit();
_57(_4e,sv);
for(i=0;i<qt.length;i++){
_4e.lastChild.parentNode.removeChild(_4e.lastChild);
}
if(!_4f){
for(i=0,n=_4e.elements.length;i<n;i++){
_4e.elements[i].name=_60[i];
}
}
};
JsHttpRequest.setTimeout(_5f,100);
return null;
};
}};

export default JsHttpRequest;
