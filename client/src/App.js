// import "./App.css";
// import Video from "./Video";
// import data from "../src/exampleresponse.json"
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Menu from "./Menu";

// function App() {
  
//   const [isOpen , setIsOpen]= useState(false)
//   const [title, setTitle] = useState("")
//   const [url, setUrl] = useState("")
//   const [items, setItems] = useState(null)

//   useEffect(()=> {
//     const fetchData = async()=> {
//       try {
//         const response= await axios.get("http://localhost:5009/videos")
//         const sortedItems = [...response.data].sort((a, b) => b.rating - a.rating);
//         setItems (sortedItems)
        

//       }
//       catch (e){
//         console.log(e)
//       }

//     }
//     fetchData()
//   },[])


//   // useEffect(() => {
//   //   const sortedItems = [...items].sort((a, b) => b.rating - a.rating);
//   //   console.log(sortedItems)
//   //   setItems(sortedItems);
//   // },[])
 
  
//   const clickHandler =() => {
//     setIsOpen (true)
//   }
//   const handleUrlChange = (event) => {
//     setUrl(event.target.value); 
    
//   };
//   const handleTitleChange = (event) => {
//     setTitle(event.target.value); 
    
//   };
//   const validateUrl = (value) => {
//     // Regular expression for URL validation
//     const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
//     if (!value || !urlRegex.test(value)) {
//       alert ("Please enter a valid URL");
//     }
//     return null; // Return null for no validation errors
//   };
//   const addclickHandler =() => {
//     !title ? alert("Please enter a title") : 
//     validateUrl(url)
//     const response = axios.post ("http://localhost:5009/video", {
//      title: title , 
//       url: url.split("watch?v=")[1]

//     })
   
//     console.log(response)
//     setTitle("")
//     setUrl("")
//     alert("video has been sent")
    
//   }
 
//   return (
//     <div className="App">
//       <header className="App-header">
      
//         <h1>Video Recommendation</h1>
//       </header>

//        <Container className="Container">
//       <Row>
//         <Col><Button variant="link" onClick={clickHandler}> Add Video </Button>
//         { isOpen && (
//           <>
//         <InputGroup className="mb-3">
//         <InputGroup.Text >Title</InputGroup.Text>
//         <Form.Control
//           onChange={handleTitleChange}
//           placeholder="Title"
//           aria-label="Username"
//           aria-describedby="basic-addon1"
//         />
//       </InputGroup>
//       <InputGroup className="mb-3">
//         <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
//         <Form.Control
//         onChange={handleUrlChange}
//           placeholder="Youtube URL"
//           aria-label="Username"
//           aria-describedby="basic-addon1"
//         />
//       </InputGroup>
//       <br></br>
//       <Button variant="outline-success" onClick={addclickHandler}>Add</Button>{' '}
//       <Button variant="outline-warning">Cancle</Button>{' '}
      
//         </>)}      
// </Col>
//         <Col><InputGroup className="mb-3">
//         <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
//         <Form.Control
//           placeholder="Username"
//           aria-label="Username"
//           aria-describedby="basic-addon1"
//         />
//       </InputGroup>
//       </Col>
//       </Row>
      
//       </Container> 
//       <div className="video-container">
//       {items && items.map(item =>(
//               <Video info = {item}>
//               </Video>
//             ))} 
//         </div>
                
//     </div>
//   );
// }
// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Video from "./Video";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [items, setItems] = useState(null);
  const [search,setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://full-stack-assessment.onrender.com/videos");
        const sortedItems = [...response.data].sort((a, b) => b.rating - a.rating);
        setItems(sortedItems);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);


  async function serachHandler () {
    const lowercase = search.toLowerCase()
        const res = await axios.get(`http://localhost:5009/search/?title=${lowercase}`)
        console.log(res.data)
        setItems(res.data)

  }

  const clickHandler = () => {
    setIsOpen(true);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const validateUrl = (value) => {
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!value || !urlRegex.test(value)) {
      alert("Please enter a valid URL");
    }
    return null; // Return null for no validation errors
  };

  const addclickHandler = async () => {
    if (!title) {
      alert("Please enter a title");
      return;
    }

    validateUrl(url);

    try {
      const response = await axios.post("http://localhost:5009/video", {
        title: title.toLowerCase(),
        url: url.split("watch?v=")[1],
      });

      console.log(response);
      setTitle("");
      setUrl("");
      alert("Video has been sent");
      window.location.reload()
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
     <header className="App-header bg-primary py-4 custom-header">
  <h1 className="text-center mb-0">Video Recommendation</h1>
</header>

      <Container className="p-4">
        <Row>
          <Col md={6} className="mb-4">
            <Button variant="link" onClick={clickHandler}>
              Add Video
            </Button>
            {isOpen && (
              <>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Title</InputGroup.Text>
                  <Form.Control
                    onChange={handleTitleChange}
                    value={title}
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>URL</InputGroup.Text>
                  <Form.Control
                    onChange={handleUrlChange}
                    value={url}
                    placeholder="Youtube URL"
                    aria-label="URL"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <br />
                <Button variant="outline-success" onClick={addclickHandler}>
                  Add
                </Button>{" "}
                <Button variant="outline-warning">Cancel</Button>{" "}
              </>
            )}
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3">
              {/* <InputGroup.Text id="basic-addon1" >Search</InputGroup.Text> */}
              <Button onClick={serachHandler}>Search</Button>
              <Form.Control placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
               onChange={(e)=> setSearch(e.target.value)} value = {search} />
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row xs={1} sm={2} md={3}>
          {items &&
            items.map((item) => (
              <Col key={item.id}>
                <Video info={item} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;