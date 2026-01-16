// JavaScript Document
// this script allows for conditional dynamic display of various form fields
df={
	hideClass:'hidden_field',
	authorOption:'multiple_authors_Yes',
	authorOption_hide:'multiple_authors_No',
	deptOption:'department',
	rankOption:'rank',
	init:function(){
		if(!document.getElementById || !document.createTextNode){return;}
		df.author=document.getElementById(df.authorOption);
		df.author_hide=document.getElementById(df.authorOption_hide);
		df.dept=document.getElementById(df.deptOption);
		df.rank=document.getElementById(df.rankOption);
		if(!df.author || !df.dept){return;}
		
		df.authorOpt=document.getElementById('other_authors');
		df.deptOpt=document.getElementById('other_dept');
		df.rankOpt=document.getElementById('other_rank');
		DOMhelp.cssjs('add',df.authorOpt,df.hideClass);
		DOMhelp.cssjs('add',df.deptOpt,df.hideClass);
		DOMhelp.cssjs('add',df.rankOpt,df.hideClass);
		DOMhelp.addEvent(df.author,'click',df.authorChange,false);
		DOMhelp.addEvent(df.author_hide,'click',df.authorChange_hide,false);
		DOMhelp.addEvent(df.dept,'change',df.deptChange,false);
		DOMhelp.addEvent(df.rank,'change',df.rankChange,false);
	},
	authorChange:function(e){
		var t=DOMhelp.getTarget(e);
		var action='remove';
		DOMhelp.cssjs(action,df.authorOpt,df.hideClass);
	},
	authorChange_hide:function(e){
		var t=DOMhelp.getTarget(e);
		var action='add';
		DOMhelp.cssjs(action,df.authorOpt,df.hideClass);
	},
	deptChange:function(e){
		var t=DOMhelp.getTarget(e);
		var action=t.options[t.selectedIndex].value=='other'?'remove':'add';
		DOMhelp.cssjs(action,df.deptOpt,df.hideClass);
		if(action=='remove'){
			df.deptOpt.getElementsByTagName('input')[0].focus();
		}
	},
	rankChange:function(e){
		var t=DOMhelp.getTarget(e);
		var action=t.options[t.selectedIndex].value=='other'?'remove':'add';
		DOMhelp.cssjs(action,df.rankOpt,df.hideClass);
		if(action=='remove'){
			df.rankOpt.getElementsByTagName('input')[0].focus();
		}
	}
}
DOMhelp.addEvent(window,'load',df.init,false);