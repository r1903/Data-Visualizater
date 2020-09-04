import React from 'react';
import './App.css';
import Chart from './components/Chart';
import Form from './components/Form';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        chartData:{},
        error:''
    };

    this.getApiData = this.getApiData.bind(this);
  }
  
//  function to run after selecting data
  getData = (e) =>{
    e.preventDefault();
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;
    
    if (new Date(from) > new Date(to) ){
      console.log('error');
      this.setState({error:'"To" date should be greater than "From" date'}); 
    }else {
   
        const resJson = JSON.parse(window.localStorage.getItem("response"));

        let engData = resJson[0].data.filter(data =>(new Date(data.date) >= new Date(from) && new Date(data.date) <= new Date(to)));
        let dates = engData.map(a => (a.date));
        let engCases = engData.map(a => a.newCases);

        let walesData = resJson[1].data.filter(data =>(new Date(data.date) >= new Date(from) && new Date(data.date) <= new Date(to)));
        let walesCases = walesData.map(a => a.newCases);

        let scotData = resJson[2].data.filter(data =>(new Date(data.date) >= new Date(from) && new Date(data.date) <= new Date(to)));
        let scotCases = scotData.map(a => a.newCases);

        let irelandData = resJson[3].data.filter(data =>(new Date(data.date) >= new Date(from) && new Date(data.date) <= new Date(to)));
        let irelandCases = irelandData.map(a => a.newCases);

        let  chartData = {
          labels:dates.reverse(),
          datasets :[
              {
                  label:'England',
                  data:engCases.reverse(),
                  fill: false,
                  borderColor: '#B21F00'
              },
              {
                label:'Wales',
                data:walesCases.reverse(),
                fill: false,
                borderColor: '#C9DE00'
            },
            {
              label:'Scotland',
              data:scotCases.reverse(),
              fill: false,
              borderColor: '#00A6B4',
    
            },
            {
              label:'Northern Ireland',
              data:irelandCases.reverse(),
              fill: false,
              borderColor: '#6800B4'
            }
          ]
        }
      console.log('errorhere');
        this.setState({chartData:chartData,error:''});   
    }  
  }

//  function to get api data 
  async getApiData () {

    const englandEndpoint = (
      'https://api.coronavirus.data.gov.uk/v1/data?' +
      'filters=areaType=nation;areaName=england&' +
      'structure={"date":"date","newCases":"newCasesByPublishDate"}'
    ); 

    const walesEndpoint = (
      'https://api.coronavirus.data.gov.uk/v1/data?' +
      'filters=areaType=nation;areaName=wales&' +
      'structure={"date":"date","newCases":"newCasesByPublishDate"}'
    ); 

    const scotlandEndpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=scotland&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
    ); 

    const irelandEndpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=Northern Ireland&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
    ); 

    const urls = [englandEndpoint, walesEndpoint,scotlandEndpoint,irelandEndpoint];
    
    try{

      let res = await Promise.all(urls.map(e => fetch(e)))
      let resJson = await Promise.all(res.map(e => e.json())) 

      const response = JSON.stringify(resJson);
      localStorage.setItem ("response",response);

      let engData = resJson[0].data.filter(data =>(data.newCases > 0));
      let dates = engData.map(a => (a.date));
      let engCases = engData.map(a => a.newCases);

      let walesData = resJson[1].data.filter(data =>(data.newCases > 0));
      let walesCases = walesData.map(a => a.newCases);

      let scotData = resJson[2].data.filter(data =>(data.newCases > 0));
      let scotCases = scotData.map(a => a.newCases);

      let irelandData = resJson[3].data.filter(data =>(data.newCases > 0));
      let irelandCases = irelandData.map(a => a.newCases);

      const storageData = [dates,engCases,walesCases,scotCases,irelandCases]
      
      const coviddata = JSON.stringify(storageData);
      localStorage.setItem ("coviddata",coviddata);

      return storageData;

    } catch(err) {
      console.log(err)
    }       
  }

  async componentDidMount() {

    let coviddata=[];

    if (window.localStorage.getItem("coviddata")) {

      coviddata = JSON.parse(window.localStorage.getItem("coviddata"));
      
      const today = (new Date()).toISOString().split('T')[0];
      
      const dataDate = new Date(coviddata[0][0]);
      const todayDate = new Date(today);

      if(todayDate > dataDate) {
      
        coviddata = await this.getApiData();

      }

    } else {

      coviddata = await this.getApiData();
      
    }


    let  chartData = {
      labels:coviddata[0].reverse(),
      datasets :[
          {
              label:'England',
              data:coviddata[1].reverse(),
              fill: false,
              borderColor: '#B21F00'
          },
          {
            label:'Wales',
            data:coviddata[2].reverse(),
            fill: false,
            borderColor: '#C9DE00'
        },
        {
          label:'Scotland',
          data:coviddata[3].reverse(),
          fill: false,
          borderColor: '#00A6B4',

        },
        {
          label:'Northern Ireland',
          data:coviddata[4].reverse(),
          fill: false,
          borderColor: '#6800B4'
        }
      ]
    }
  
    this.setState({chartData:chartData});       
  }

  render() {
    
    return(
      <div className="main">
        <h1 className="header"> COVID-19 Data Visualization</h1>
        <Form getData={this.getData} error={this.state.error}/>
        <Chart data={this.state.chartData}/> 
      </div>
    )
  }

}
export default App;
