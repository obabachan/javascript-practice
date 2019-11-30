(this["webpackJsonpgithub-api-from-rest"]=this["webpackJsonpgithub-api-from-rest"]||[]).push([[0],{139:function(e,t,a){e.exports=a(288)},144:function(e,t,a){},146:function(e,t,a){},288:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(27),c=a.n(l),i=(a(144),a(76)),o=a.n(i),s=a(118),u=a(130),m=a(39),g=(a(146),a(296)),p=a(297),f=a(293),h=a(298),d=a(301),E=a(33),v=a(299),b=a(294),x=a(300),k=(a(147),a(148)),w=a(166);w().format();var y=100;function A(e){var t=[{key:"rank",value:function(t,a){return(e.page-1)*y+a},textAlign:"center"},{key:"repository / owner",value:function(e){return r.a.createElement(g.a.Group,null,r.a.createElement(g.a,null,r.a.createElement(g.a.Image,{as:"img",size:"mini",src:e.owner.avatar_url}),r.a.createElement(g.a.Content,null,r.a.createElement(g.a.Header,{as:"a",href:e.html_url,target:"_blank",rel:"noopener noreferrer"},e.name),r.a.createElement(g.a.Description,null,r.a.createElement("a",{href:e.owner.html_url,target:"_blank",rel:"noopener noreferrer"},e.owner.login)))))},singleLine:!0},{key:"stars",value:function(e){return e.stargazers_count.toLocaleString()},textAlign:"right"},{key:"discription",value:function(e){return e.description}},{key:"language",value:function(e){return e.language},textAlign:"center"},{key:"update_at",value:function(e){return w(e.updated_at).fromNow()},textAlign:"right"},{key:"create_at",value:function(e){var t=new Date(e.created_at);return"".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate())},textAlign:"right"},{key:"licence",value:function(e){return e.license&&e.license.key},textAlign:"center"}],a=e.list.length&&e.list.map((function(e,a){return r.a.createElement(p.a.Row,null,t.map((function(t){return r.a.createElement(p.a.Cell,{singleLine:!!t.singleLine,textAlign:t.textAlign?t.textAlign:"left"},t.value(e,a+1))})))}));return r.a.createElement("div",null,r.a.createElement(p.a,{celled:!0,selectable:!0},r.a.createElement(p.a.Header,null,r.a.createElement(p.a.Row,null,t.map((function(e){return r.a.createElement(p.a.HeaderCell,{textAlign:"center"},e.key)})))),r.a.createElement(p.a.Body,null,a)))}var j=k.create({method:"get",baseURL:"https://api.github.com/",timeout:4e3,headers:{Accept:"application/vnd.github.v3+json"}});var _=function(){var e=Object(n.useState)({}),t=Object(m.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(!1),i=Object(m.a)(c,2),g=i[0],p=i[1],k=Object(n.useState)({title:"Please, choose",text:"Select the rank you want to see.",reset:{},status:{warning:!0}}),_=Object(m.a)(k,2),O=_[0],S=_[1],L=Object(n.useState)(0),C=Object(m.a)(L,2),R=C[0],q=C[1],D=Object(u.a)(Array(10).keys()).map((function(e){return{page:e+1,text:"".concat(e*y+1," - ").concat(e*y+y)}}));Object(n.useEffect)((function(){j.interceptors.request.use((function(e){return p(!0),S({title:"Loading ...",text:"",status:{warning:!0}}),console.log("request"),e}),(function(e){return Promise.reject(e)}))}),[]);var H=function(e,t){return{seconds:e.diff(w(),"seconds"),count:t["x-ratelimit-remaining"],total:t["x-ratelimit-limit"]}},P=function(){var e=Object(s.a)(o.a.mark((function e(t,a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:!1===g&&j.get("/search/repositories",{params:{q:"stars:>1000",sort:"stars",per_page:y,page:a.page.page}}).then((function(e){console.log(e),S({title:"Success",text:"Displayed rank ".concat(a.page.text,"."),status:{success:!0},reset:H(w.unix(e.headers["x-ratelimit-reset"]),e.headers)}),l(e.data.items),q(a.page.page)})).catch((function(e){var t="error.";e.response&&403===e.response.status&&(t+="\n Please try after a while.");var a=e.response||e.request;S({title:"Error",text:"".concat(a.status||"Unknown error"," ").concat(t),status:{error:!0},reset:H(w.unix(e.response.headers["x-ratelimit-reset"]),e.response.headers)})})).finally((function(){p(!1),console.log("finally")}));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return r.a.createElement(f.a,{textAlign:"center"},r.a.createElement(h.a,{style:{marginTop:"20px"}},r.a.createElement(d.a,{as:"h1",textAlign:"center"},r.a.createElement(E.a,{name:"star"}),"Github Top1000 Ranking of number of stars"),"* There is a rate limit of 10 times per minute."),r.a.createElement(v.a.Group,{widths:"10"},D.map((function(e,t){return r.a.createElement(v.a,{page:e,onClick:P,active:R===t+1},e.text)}))),r.a.createElement(h.a,O.status,r.a.createElement(h.a.Content,null,r.a.createElement(h.a.Header,null,O.title),g?r.a.createElement(b.a,{active:!0}):r.a.createElement("p",null,r.a.createElement("p",null,O.text),O.reset.seconds&&r.a.createElement("p",null,"(Limit release time ",O.reset.seconds," seconds ago. ratelimit-remaining ",O.reset.count,"/",O.reset.total,")")))),r.a.createElement(A,{list:a,page:R}),r.a.createElement(x.a,{vertical:!0}),r.a.createElement(x.a,{vertical:!0},r.a.createElement("div",null,r.a.createElement("a",{href:"https://github.com/obabachan/javascript-practice/tree/master/02_github-api-from-REST-API",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(E.a,{name:"github",size:"large"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[139,1,2]]]);
//# sourceMappingURL=main.0e751002.chunk.js.map