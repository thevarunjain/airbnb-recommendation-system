import React, { Component } from 'react'
import axios from 'axios';



class Main extends Component {
    constructor(props){
        super(props);
        this.state ={
            data : [],
            id : "",
            nums : ""
        }
        this.getData = this.getData.bind(this);
    }

    setId(e){
        this.setState({
            id : e.target.value
        })
    }

    setNums(e){
        this.setState({
            nums : e.target.value
        })
    }




    getData(){
        console.log("In get data function ");
        this.setState({
            data: [
                "Restful Room w/Bath in West Ballard",
                "Heart of Ballard Craftsman Home",
                "Ballard Private Room w Double Bed",
                "Apartment in Downtown Ballard",
                "Ballard Artcove ",
                "Ballard Private Room w Queen Bed",
                "Bedroom & private bath in Ballard",
                "1-bedroom Mother-in-Law Apartment"
            ] 
          });

          const user = {
            id : this.state.id,
            nums : this.state.nums

          };
          console.log(user)
      
          axios.post(`https://localhost:5000/api`, { user })
            .then(res => {
              console.log("res in axios",res);
              console.log(res.data);
            })
        }

  render() {
        var arr = this.state.data.map(e=>{
          return<li className="list-group-item" key={Math.random()  }>{e}</li>
        })

    return (
      <div>
        <p className="heading">AirBnb Recommender System</p>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">Host Id</span>
          </div>
          <input type="text"  onChange={this.setId.bind(this)} className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">Output Size</span>
          </div>
          <input type="text"  onChange={this.setNums.bind(this)} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
        </div>


<button type="button" className="btn btn-outline-secondary"  onClick={this.getData}>GO</button>
        <div className="data">
            <ul className="list-group list-group-flush">
                {arr}
            </ul>
        </div>

      </div>
    )
  }
}


export default Main;
