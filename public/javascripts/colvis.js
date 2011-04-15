/*
 * File:        ColVis.min.js
 * Version:     1.0.4
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * 
 * Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD (3 point) style license, as supplied with this software.
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function(c){ColVis=function(a,b){if(!this.CLASS||this.CLASS!="ColVis")alert("Warning: ColVis must be initialised with the keyword 'new'");if(typeof b=="undefined")b={};this.s={dt:null,oInit:b,fnStateChange:null,activate:"click",sAlign:"left",buttonText:"Show / hide columns",hidden:true,aiExclude:[],abOriginal:[],bRestore:false,sRestore:"Restore original"};this.dom={wrapper:null,button:null,collection:null,background:null,catcher:null,buttons:[],restore:null};ColVis.aInstances.push(this);this.s.dt=
a;this._fnConstruct();return this};ColVis.prototype={fnRebuild:function(){for(var a=this.dom.buttons.length-1;a>=0;a--)this.dom.buttons[a]!==null&&this.dom.collection.removeChild(this.dom.buttons[a]);this.dom.buttons.splice(0,this.dom.buttons.length);this.dom.restore&&this.dom.restore.parentNode(this.dom.restore);this._fnAddButtons();this._fnDrawCallback()},_fnConstruct:function(){this._fnApplyCustomisation();var a=this;this.dom.wrapper=document.createElement("div");this.dom.wrapper.className="ColVis TableTools";
this.dom.button=this._fnDomBaseButton(this.s.buttonText);this.dom.button.className+=" ColVis_MasterButton";this.dom.wrapper.appendChild(this.dom.button);this.dom.catcher=this._fnDomCatcher();this.dom.collection=this._fnDomCollection();this.dom.background=this._fnDomBackground();this._fnAddButtons();for(var b=0,d=this.s.dt.aoColumns.length;b<d;b++)this.s.abOriginal.push(this.s.dt.aoColumns[b].bVisible);this.s.dt.aoDrawCallback.push({fn:function(){a._fnDrawCallback.call(a)},sName:"ColVis"})},_fnApplyCustomisation:function(){var a=
this.s.oInit;if(typeof a.activate!="undefined")this.s.activate=a.activate;if(typeof a.buttonText!="undefined")this.s.buttonText=a.buttonText;if(typeof a.aiExclude!="undefined")this.s.aiExclude=a.aiExclude;if(typeof a.bRestore!="undefined")this.s.bRestore=a.bRestore;if(typeof a.sRestore!="undefined")this.s.sRestore=a.sRestore;if(typeof a.sAlign!="undefined")this.s.sAlign=a.sAlign;if(typeof a.fnStateChange!="undefined")this.s.fnStateChange=a.fnStateChange},_fnDrawCallback:function(){for(var a=this.s.dt.aoColumns,
b=0,d=a.length;b<d;b++)if(this.dom.buttons[b]!==null)a[b].bVisible?c("input",this.dom.buttons[b]).attr("checked","checked"):c("input",this.dom.buttons[b]).removeAttr("checked")},_fnAddButtons:function(){for(var a,b=","+this.s.aiExclude.join(",")+",",d=0,e=this.s.dt.aoColumns.length;d<e;d++)if(b.indexOf(","+d+",")==-1){a=this._fnDomColumnButton(d);this.dom.buttons.push(a);this.dom.collection.appendChild(a)}else this.dom.buttons.push(null);if(this.s.bRestore){a=this._fnDomRestoreButton();a.className+=
" ColVis_Restore";this.dom.buttons.push(a);this.dom.collection.appendChild(a)}},_fnDomRestoreButton:function(){var a=this,b=document.createElement("button"),d=document.createElement("span");b.className=!this.s.dt.bJUI?"ColVis_Button TableTools_Button":"ColVis_Button TableTools_Button ui-button ui-state-default";b.appendChild(d);c(d).html('<span class="ColVis_title">'+this.s.sRestore+"</span>");c(b).click(function(){for(var e=0,g=a.s.abOriginal.length;e<g;e++)a.s.dt.oInstance.fnSetColumnVis(e,a.s.abOriginal[e],
false);a.s.dt.oInstance.fnDraw(false)});return b},_fnDomColumnButton:function(a){var b=this,d=this.s.dt.aoColumns[a],e=document.createElement("button"),g=document.createElement("span");e.className=!this.s.dt.bJUI?"ColVis_Button TableTools_Button":"ColVis_Button TableTools_Button ui-button ui-state-default";e.appendChild(g);c(g).html('<span class="ColVis_radio"><input type="checkbox"></span><span class="ColVis_title">'+d.sTitle+"</span>");c(e).click(function(h){var f=c("input",this).attr("checked")===
true?false:true;if(h.target.nodeName.toLowerCase()=="input")f=c("input",this).attr("checked");h=c.fn.dataTableExt.iApiIndex;c.fn.dataTableExt.iApiIndex=b._fnDataTablesApiIndex.call(b);b.s.dt.oInstance.fnSetColumnVis(a,f);c.fn.dataTableExt.iApiIndex=h;b.s.fnStateChange!==null&&b.s.fnStateChange.call(b,a,f)});return e},_fnDataTablesApiIndex:function(){for(var a=0,b=this.s.dt.oInstance.length;a<b;a++)if(this.s.dt.oInstance[a]==this.s.dt.nTable)return a;return 0},_fnDomBaseButton:function(a){var b=this,
d=document.createElement("button"),e=document.createElement("span"),g=this.s.activate=="mouseover"?"mouseover":"click";d.className=!this.s.dt.bJUI?"ColVis_Button TableTools_Button":"ColVis_Button TableTools_Button ui-button ui-state-default";d.appendChild(e);e.innerHTML=a;c(d).bind(g,function(h){b._fnCollectionShow();h.preventDefault()});return d},_fnDomCollection:function(){var a=document.createElement("div");a.style.display="none";a.className=!this.s.dt.bJUI?"ColVis_collection TableTools_collection":
"ColVis_collection TableTools_collection ui-buttonset ui-buttonset-multi";a.style.position="absolute";c(a).css("opacity",0);return a},_fnDomCatcher:function(){var a=this,b=document.createElement("div");b.className="ColVis_catcher TableTools_catcher";c(b).click(function(){a._fnCollectionHide.call(a,null,null)});return b},_fnDomBackground:function(){var a=this,b=document.createElement("div");b.style.position="absolute";b.style.left="0px";b.style.top="0px";b.className="ColVis_collectionBackground TableTools_collectionBackground";
c(b).css("opacity",0);c(b).click(function(){a._fnCollectionHide.call(a,null,null)});this.s.activate=="mouseover"&&c(b).mouseover(function(){a.s.overcollection=false;a._fnCollectionHide.call(a,null,null)});return b},_fnCollectionShow:function(){var a=this,b=c(this.dom.button).offset(),d=this.dom.collection,e=this.dom.background,g=parseInt(b.left,10),h=parseInt(b.top+c(this.dom.button).outerHeight(),10);d.style.top=h+"px";d.style.left=g+"px";d.style.display="block";c(d).css("opacity",0);var f=c(window).height(),
j=c(document).height(),k=c(window).width(),i=c(document).width();e.style.height=(f>j?f:j)+"px";e.style.width=(k<i?k:i)+"px";f=this.dom.catcher.style;f.height=c(this.dom.button).outerHeight()+"px";f.width=c(this.dom.button).outerWidth()+"px";f.top=b.top+"px";f.left=g+"px";document.body.appendChild(e);document.body.appendChild(d);document.body.appendChild(this.dom.catcher);d.style.left=this.s.sAlign=="left"?g+"px":g-c(d).outerWidth()+c(this.dom.button).outerWidth()+"px";b=c(d).outerWidth();f=c(d).outerHeight();
if(g+b>i)d.style.left=i-b+"px";if(h+f>j)d.style.top=h-f-c(this.dom.button).outerHeight()+"px";setTimeout(function(){c(d).animate({opacity:1},500);c(e).animate({opacity:0.1},500,"linear",function(){jQuery.browser.msie&&jQuery.browser.version=="6.0"&&a._fnDrawCallback()})},10);this.s.hidden=false},_fnCollectionHide:function(){var a=this;if(!this.s.hidden&&this.dom.collection!==null){this.s.hidden=true;c(this.dom.collection).animate({opacity:0},500,function(){this.style.display="none"});c(this.dom.background).animate({opacity:0},
500,function(){document.body.removeChild(a.dom.background);document.body.removeChild(a.dom.catcher)})}}};ColVis.fnRebuild=function(a){var b=null;if(typeof a!="undefined")b=a.fnSettings().nTable;for(var d=0,e=ColVis.aInstances.length;d<e;d++)if(typeof a=="undefined"||b==ColVis.aInstances[d].s.dt.nTable)ColVis.aInstances[d].fnRebuild()};ColVis.aInstances=[];ColVis.prototype.CLASS="ColVis";ColVis.VERSION="1.0.4";ColVis.prototype.VERSION=ColVis.VERSION;typeof c.fn.dataTable=="function"&&typeof c.fn.dataTableExt.fnVersionCheck==
"function"&&c.fn.dataTableExt.fnVersionCheck("1.7.0")?c.fn.dataTableExt.aoFeatures.push({fnInit:function(a){return(new ColVis(a,typeof a.oInit.oColVis=="undefined"?{}:a.oInit.oColVis)).dom.wrapper},cFeature:"C",sFeature:"ColVis"}):alert("Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download")})(jQuery);
