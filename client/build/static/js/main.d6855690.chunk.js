(this["webpackJsonpvideo-recommendation"]=this["webpackJsonpvideo-recommendation"]||[]).push([[0],{19:function(e,t,n){},20:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var c=n(3),i=n.n(c),a=n(13),o=n.n(a),r=(n(19),n(20),n(14)),l=n(4),s=n(2);var d=function(e){e.title,e.url,e.rating,e.id;var t=Object(c.useState)(0),n=Object(l.a)(t,2),i=n[0],a=n[1];return Object(s.jsxs)("div",{className:"container",children:[Object(s.jsxs)("p",{children:["Like: ",i," "]}),Object(s.jsx)("button",{onClick:function(){a(i+1)},children:"\ud83d\udc4d"}),Object(s.jsx)("button",{onClick:function(){a(i-1)},children:"\ud83d\udc4e"})]})};var u=function(e){var t=e.video,n="";return void 0!==t.url&&(n=t.url.replace("watch?v=","embed/")),Object(s.jsx)("iframe",{src:n,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,width:"560",height:"315"})},j=n(28);var b=function(e){var t=Object(c.useState)(""),n=Object(l.a)(t,2),i=n[0],a=n[1],o=Object(c.useState)(""),b=Object(l.a)(o,2),h=b[0],p=b[1],O=Object(c.useState)(""),v=Object(l.a)(O,2),x=v[0],m=v[1],f=Object(c.useState)([]),g=Object(l.a)(f,2),w=g[0],N=g[1],k=Object(c.useState)(""),y=Object(l.a)(k,2);return y[0],y[1],Object(c.useEffect)((function(){j.a.get("http://localhost:3001/get/videos").then((function(e){N(e.data.rows)}))}),[]),Object(s.jsxs)("div",{className:"videos",children:[Object(s.jsxs)("div",{className:"form",children:[Object(s.jsx)("p",{children:"Add more videos:"}),Object(s.jsx)("input",{className:"video-input",type:"text",placeholder:"Enter Video Title",id:"text",value:i,onChange:function(e){return a(e.target.value)}}),Object(s.jsx)("input",{className:"video-input",type:"url",placeholder:"Enter Video Link",id:"text",value:h,onChange:function(e){return p(e.target.value)}}),Object(s.jsx)("input",{className:"video-input",type:"number",placeholder:"Enter Rating",id:"text",value:x,onChange:function(e){return m(e.target.value)}}),Object(s.jsx)("button",{className:"video-input",onClick:function(e){console.log(i),console.log(h),i&&h?j.a.post("http://localhost:3001/post/videos",{title:i,url:h,rating:x}):alert("Please Enter Video Title and Video Link"),e.preventDefault(),N([].concat(Object(r.a)(w),[{newTitle:i,newUrl:h,newRating:x}]))},children:"Add Video"})]}),w.map((function(e,t){return Object(s.jsxs)("div",{className:"flex-container",children:[Object(s.jsx)("p",{children:e.title}),Object(s.jsx)(u,{video:e}),Object(s.jsxs)("h3",{children:[" Rating: ",e.rating]}),Object(s.jsx)(d,{id:e.id},e.id),Object(s.jsx)("button",{onClick:function(){var t;t=e.id,j.a.delete("http://localhost:3001/delete/videos/".concat(t))},children:"Delete"})]},t)}))]})};var h=function(){return Object(s.jsx)("div",{className:"App",children:Object(s.jsxs)("header",{className:"App-header",children:[Object(s.jsx)("h1",{children:"Video Recommendation"}),Object(s.jsx)(b,{})]})})};o.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(h,{})}),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.d6855690.chunk.js.map