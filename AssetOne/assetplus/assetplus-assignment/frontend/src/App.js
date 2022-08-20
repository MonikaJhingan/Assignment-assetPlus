import React, { Component } from 'react';

import axios from 'axios';

class App extends Component {

  state = {
    images : []
  }

  componentDidMount(){
    axios
      .get('http://localhost:4000/api/files')
      .then(res => {
          console.log(res)
          this.setState({
            images : res.data.images
          })
      })
  }
  render() { 

    return ( 
      <div>
          <div className="container row">

          {
            this.state.images.length === 0 ? (
              <h4>You have not uploaded any images</h4>
            ) : (
              this.state.images.map(img => {
              let address = 'http://localhost:4000/api/'+img.address;
            
              return(
                <div key={img._id}>
                  <div className="col s6">
                    <div className="card">
                      <div className="card-image">
                        <img src={address}/>
                        <a className="btn-floating halfway-fab waves-effect waves-light red">
                          
                        <button onClick={() => this.onDelete(img._id)} style={{
                            backgroundColor : "transparent",
                            border : 0
                          }}>
                          <i className="material-icons">
                            delete
                          </i>
                        </button>
                   </a>
                   </div>
                   </div>
                   </div>
                   </div>
              )
   
            }

      </div>
     );
  }
}
 
export default App;