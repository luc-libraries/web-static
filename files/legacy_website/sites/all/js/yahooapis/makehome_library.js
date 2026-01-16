// JavaScript Document

function querySt(ji) {
hu = window.location.search.substring(1);
gy = hu.split("&");
for (i=0;i<gy.length;i++) {
ft = gy[i].split("=");
if (ft[0] == ji) {
return ft[1];
}
}
}

var override = querySt("override");
var makehome = YAHOO.util.Cookie.get("makehome"); 
//document.write(makehome);//

/* should we include "Opera Mini" and "IEMobile" here? */
if (((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Opera Mini/i)) || (navigator.userAgent.match(/IEMobile/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/BlackBerry/i))) && (override!='1')) 
   {location.replace("http://libraries.luc.edu/m/");}
/*
else if (makehome == 'IL' && override!='1') 
{window.location="http://blogs.luc.edu/ilweekly/inside-loyola/";YAHOO.log("this would redirect to current", "current", "interaction");}
*/  
else {YAHOO.log(makehome, "current", "interaction");};
