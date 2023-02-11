import React,{useState} from 'react'
import moment from 'moment'

export default function Form({form,setVideolist,videolist}) {
 const[addvideo,setAddvideo]=useState({
  'title':'',
  'url':'',
  uploadDate:moment().format('YYYY-MM-DD'),

  uploadTime:moment().format('h:mm:ss')

})
  const handelAdd=(e)=>{
  e.preventDefault();
  if(addvideo.url.includes('https://www.youtube.com/'))
  { setVideolist([...videolist,addvideo])}

  else{
    console.log(addvideo);
    alert('Please enter vaild address')
  }
  

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
}

  return (
    <div>
      <form onSubmit={handelAdd} style={{display: form ? 'inline' : 'none'}}>
        <label>Title</label>
        <input name='title'onChange={handlechange} value={addvideo.title} required></input><br/>
        <label>URL</label>
        <input name='url'onChange={handlechange} value={addvideo.url}></input><br/>
        <button >Add</button>
        <button>Cancle</button>
      </form>

    </div>
  )
}
