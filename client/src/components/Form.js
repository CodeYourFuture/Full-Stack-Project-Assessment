import React,{useState} from 'react'

export default function Form({form,setVideolist,videolist}) {
 const[addvideo,setAddvideo]=useState({
  'title':'',
  'url':''
})
  const handelAdd=(e)=>{
  e.preventDefault();
  setVideolist([...videolist,addvideo])

}
const handlechange=(event)=>{
const {name,value}=event.target
setAddvideo((pre)=>{if(name==='title'){
  return {'title':value,
          'url':pre.url}
}
else {
  return{'title':pre.title,
         'url':value

  }
}}
)
console.log(addvideo);
}

  return (
    <div>
      <form onSubmit={handelAdd} style={{display: form ? 'inline' : 'none'}}>
        <label>Title</label>
        <input name='title'onChange={handlechange} value={addvideo.title} ></input><br/>
        <label>URL</label>
        <input name='url'onChange={handlechange} value={addvideo.url}></input><br/>
        <button >Add</button>
        <button>Cancle</button>
      </form>

    </div>
  )
}
