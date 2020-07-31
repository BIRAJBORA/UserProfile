import React ,{Fragment,useState,useEffect}from 'react';
import axios from 'axios';
import './App.css';
import { Grid, Row, Col} from 'react-bootstrap';

function App() {
  const [pfImage, setpfImage] = useState("");
  const [pfName, setpfName] = useState("");
  const [pfNickName, setpfNickName] = useState("");
  const [pfDesignation, setpfDesignation] = useState("");

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

  const items = []
  if (repoContent.length > 0){
    for (const [index, value] of repoContent.entries()) {
      items.push(<div className="block"><h3 key={index}>{value.name}</h3></div>)
    }
  }
  
  return(
      
      <Fragment>

        
          <Row className="show-grid">
            <Col md={4}>
            <div>
            <a>
              <img src={pfImage} style={{width: "200px"}}></img>
            </a>
            <div>
            <h1>{pfName}</h1>
            <span>{pfNickName}</span>
            <p>{pfNickName}</p>
            <h3>{pfDesignation}</h3>
            </div>

        </div>
            </Col>
            <Col md={8}>
              <div>
                {items}
              </div>
            </Col>

          </Row>
      
        
       
        
       
      </Fragment>
      
  )
}

export default App;
