(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(17)},15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(3),r=n.n(c),i=(n(15),n(16),n(1)),u=n(7),l=function(e){var t=e.video,n=e.upVote,o=e.downVote,c=e.removeVideo;return a.a.createElement("div",null,a.a.createElement("h2",null,t.title),a.a.createElement("iframe",{width:"600",height:"300",src:t.url.replace("watch?v=","embed/"),title:"YouTube video player",allowFullScreen:!0}),a.a.createElement("h3",null,"Video Rate: ",t.rating),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return n(t)}},"Like"),a.a.createElement("button",{onClick:function(){return o(t)}},"Dislike"),a.a.createElement("button",{onClick:function(){return c(t.id)}},"Delete")))},d=function(e){var t=e.videos,n=e.upVote,o=e.downVote,c=e.removeVideo;return a.a.createElement("div",null,t.map(function(e){return a.a.createElement(l,{key:e.id,video:e,upVote:n,downVote:o,removeVideo:c})}))},h=n(4),s=n(5),f=n(8),m=n(6),p=n(9),v=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(f.a)(this,Object(m.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),n.state.title&&n.state.url&&(n.props.handleAddVideo({title:n.state.title,url:n.state.url}),n.setState({title:"",url:""}))},n.state={title:"",url:""},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("form",{onSubmit:this.handleSubmit},a.a.createElement("input",{type:"text",placeholder:"Title",value:this.state.title,onChange:function(t){return e.setState({title:t.target.value})}}),a.a.createElement("input",{type:"url",placeholder:"YouTube URL",value:this.state.url,onChange:function(t){return e.setState({url:t.target.value})}}),a.a.createElement("button",{type:"submit"},"Add Video"))}}]),t}(o.Component),b=function(){var e=[],t=Object(o.useState)([]),n=Object(u.a)(t,2),c=n[0],r=n[1],l="https://full-stack-project-assessment-server-jpku.onrender.com/";Object(o.useEffect)(function(){fetch(l).then(function(e){return e.json()}).then(function(t){e=Object(i.a)(t),r(e)}).catch(function(e){return console.log(e)})},[]);return a.a.createElement("div",null,a.a.createElement(v,{handleAddVideo:function(t){fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(){fetch(l).then(function(e){return e.json()}).then(function(t){e=Object(i.a)(t),r(e)})})}}),a.a.createElement(d,{videos:c,upVote:function(t){t.rating=t.rating+1,fetch("".concat(l).concat(t.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({video:t})}).then(function(){fetch(l).then(function(e){return e.json()}).then(function(t){e=Object(i.a)(t),r(e)})}).catch(function(e){return console.log(e)})},downVote:function(t){t.rating=t.rating-1,fetch("".concat(l).concat(t.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({video:t})}).then(function(){fetch(l).then(function(e){return e.json()}).then(function(t){e=Object(i.a)(t),r(e)})}).catch(function(e){return console.log(e)})},removeVideo:function(t){fetch("".concat(l).concat(t),{method:"DELETE"}).then(function(){fetch(l).then(function(e){return e.json()}).then(function(t){e=Object(i.a)(t),r(e)})}).catch(function(e){return console.log(e)})}}))};var E=function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("h1",null,"Video Recommendation")),a.a.createElement(b,null))};r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(E,null)),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.34fb29ed.chunk.js.map