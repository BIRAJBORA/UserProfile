import React ,{Fragment,useState,useEffect}from 'react';
import axios from 'axios';
import './App.css';
import { Grid, Row, Col} from 'react-bootstrap';

function App() {
  const [pfImage, setpfImage] = useState("");
  const [pfName, setpfName] = useState("");
  const [pfNickName, setpfNickName] = useState("");
  const [pfDesignation, setpfDesignation] = useState("");
  const [searchText, setsearchText] = useState("");

  const [repoContent, setrepoContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.github.com/users/supreetsingh247',
      );
      console.log(result.data);
      setpfImage(result.data.avatar_url);
      setpfName(result.data.name);
      setpfNickName(result.data.login);
      setpfDesignation(result.data.bio);
    };
 
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData1 = async () => {
      const result1 = await axios(
        'https://api.github.com/users/supreetsingh247/repos',
      );
      setrepoContent(result1.data);
     
    };
 
    fetchData1();
  }, []);
  /* Will modify the search soon*/
  function searchValueChange(value){
    setsearchText(value);
    if (repoContent.length > 0){
      setrepoContent(repoContent.filter((val)=>val.name == value))
    }

  };

  const items = []
  if (repoContent.length > 0){
    for (const [index, value] of repoContent.entries()) {
      console.log(value);
      items.push(<div className="block"><a href={value.html_url} key={index}>{value.name}</a></div>)
    }
  }
  
  return(
      
      <Fragment>

         
          <Row className="show-grid">
            <Col md={4}>
            <div className="left-block">
              <div className="round-block">
                <a>
                <img src={pfImage} className="img-round"></img>
                </a>
              </div>
           
            <div className="text-layout">
            
            <h1>{pfName}</h1>
            <span>{pfNickName}</span>
            <h3>{pfDesignation}</h3>
            </div>

        </div>
            </Col>
            <Col md={8}>
              <div className="searchBar">
                <input value={searchText} type="text" onChange={(val)=>searchValueChange(val.target.value)}/>

              </div>
              <div>
                {items}
              </div>
            </Col>

          </Row>
      
        
       
        
       
      </Fragment>
      
  )
}

export default App;
