import './App.css';
import {Button, Alert, Breadcrumb, Card, Form, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import Axios from "axios";
import { useEffect, useState} from "react"
import Calendar from './components/Calendar';
import AppointmentList from './components/AppointmentList';
const backendURL = process.env.REACT_APP_BACKEND_URL

function App() {
  const [dates_s, setDates_s] = useState();
  const [appointments_s, setAppointments_s] = useState("");
  const [activeApp, setActiveApp] = useState();
  const getDates = (month, year) =>{
    console.log("Getting Dates...")
    console.log("Month: " + month)
    console.log("Year: " + year)
    Axios.post(backendURL + '/getDates', {
      month: month,
      year: year
    })
    .then(function (response) {
      setDates_s(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getAppointments = () =>{
    console.log("Getting Appointments...")
    Axios.post(backendURL + '/getAppointments', {

    })
    .then(function (response) {
      setAppointments_s(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const createAppointment = (name,startDate,endDate,workload=0,description="") =>{
    console.log("Creating Appointment...")
    Axios.post(backendURL + '/createAppointment', {
      name: name,
      startDate: startDate,
      endDate: endDate,
      workload: parseInt(workload),
      description: description
    })
    .then(function (response) {
      //do something
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const selectDay = (date) =>{
    setActiveApp(date)
  }


  function loggedInMenu(){



    return (
      <div className="App">
        {/*Weiterleitungslogik hier rein*/}

        <div className="MainMenu">
          <div className="Buttons">

          <Container>
          <Row className="p-0">
            <Col className="p-0 ">
              <Button size="lg" onClick={()=>changeDate(-1)}>LOGIN</Button>
            </Col>
            <Col className="p-0">
              <Button size="lg" onClick={()=>createAppointment("FrontendTest",activeApp,activeApp,"description",0)}>Termin erstellen</Button>
            </Col>
            <Col className="p-0">
              <Button size="lg" onClick={()=>changeDate(-1)}>TEST</Button>
            </Col>
            <Col className="p-0">
              <Button size="lg" onClick={()=>changeDate(-1)}>TEST</Button>
            </Col>
            <Col className="p-0">
              <Button size="lg" onClick={()=>changeDate(-1)}>TEST</Button>
            </Col>

            
          </Row>
          
        </Container>

          </div>      
        </div>
  
        
        
      </div>

    );

  }

  const changeDate = (direction) => {
    if(direction instanceof Date){
      console.log("Direction Month: " + direction.getMonth())
      console.log("Direction Year: " + direction.getFullYear())
      getDates(direction.getMonth(),direction.getFullYear())
    } else{
      var date = new Date(dates_s[5])
      if(direction > 0){
        date.setDate(date.getDate() + 30)
      }else{
        date.setDate(date.getDate() - 30)
      }
      getDates(date.getMonth(),date.getFullYear())
      setActiveApp()
    }


     
  }

  useEffect(()=>{
    var currentDate = new Date()
    //setDates_s(getDates(currentDate.getMonth(),currentDate.getFullYear()))
    if(!dates_s) {

      getDates(currentDate.getMonth(),currentDate.getFullYear())
    }
    if(!appointments_s) {
      getAppointments()

    }
    
    
    

  })


  return (
    <div className="App">
      {loggedInMenu()}
      <header className="App-header">
        <Container fluid>
        <Row className="mb-3">
          <Col id="calendar" className="custom sm-3" fluid>
          <Calendar  activeApp={activeApp} dates={dates_s} changeDate={changeDate} selectDay={selectDay}/>

          </Col>
          <Col id="appointments" className="sm-3" fluid>
          {console.log("activeApp: " + activeApp)}
          <AppointmentList dates={dates_s} appointments={appointments_s} activeApp={activeApp} selectDay={selectDay} />

          </Col>
        </Row>
        </Container>
        
      



        {/* TESTING */}
        <Container hidden>
        <Form>
          <Row>
            <Col md>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="example@gmail.com"/>
            <Form.Text className="text-muted">
              FORMTEXT YAYAYA
            </Form.Text>
          </Form.Group>
          </Col>
          <Col md>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>
          </Col>
          </Row>
          <Button variant="secondary" type="submit">Submit</Button>
        </Form>
        <Card className="mb-3" style={{color: "#000"}}>
          <Card.Img src="https://www.skiamade.com/regionen/salzburger-sportwelt/SSS/image-thumb__914336__hero-small/Snow%20Space%20Salzburg_Header%20f%C3%BCr%20St.%20Johann_CSchartner~-~767w.webp"/>
          <Card.Body>
            <Card.Title>
              CardTitle
            </Card.Title>
            <Card.Text>
              CardText jajaja
            </Card.Text>
            <Button>Test Button</Button>
          </Card.Body>
        </Card>
        <Breadcrumb>
          <Breadcrumb.Item>Test 1</Breadcrumb.Item>
          <Breadcrumb.Item>Test 2</Breadcrumb.Item>
          <Breadcrumb.Item active>Test 3</Breadcrumb.Item>
        </Breadcrumb>
        <Alert variant="success">SuccessAlert</Alert>
        <Button>Test Button</Button>
        </Container>
      </header>
    </div>
  );
}

export default App;
