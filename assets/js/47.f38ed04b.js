(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{132:function(e,n,l){"use strict";l.r(n);var s={data:()=>({visible:!1}),methods:{showModal(){Object.assign(this,{visible:!0})},handleOk(e){console.log(e),Object.assign(this,{visible:!1})},handleCancel(e){console.log(e),Object.assign(this,{visible:!1})}}},i=l(1),o=Object(i.a)(s,function(){var e=this,n=e.$createElement,l=e._self._c||n;return l("main",[l("NebulaButton",{attrs:{type:"primary"},on:{click:e.showModal}},[e._v("\n    Open Modal\n  ")]),e._v(" "),l("NebulaModal",{attrs:{title:"Basic Modal"},on:{ok:e.handleOk,cancel:e.handleCancel},model:{value:e.visible,callback:function(n){e.visible=n},expression:"visible"}},[l("p",[e._v("Some contents...")]),e._v(" "),l("p",[e._v("Some contents...")]),e._v(" "),l("p",[e._v("Some contents...")])])],1)},[],!1,null,null,null);o.options.__file="basic.vue";n.default=o.exports}}]);