import './App.css';
import {Button, Alert, Breadcrumb, Card, Form, Container, Row, Col, Navbar, NavbarBrand, NavItem} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import Axios from "axios";
import { useEffect, useState} from "react"
import Calendar from './components/Calendar';
import AppointmentList from './components/AppointmentList';
import LoginModal from './navbarItems/LoginModal';
import CreateAppointmentModal from './navbarItems/CreateAppointmentModal';
import qs from "qs"
const backendURL = process.env.REACT_APP_BACKEND_URL

function App() {
  const [dates_s, setDates_s] = useState();
  const [appointments_s, setAppointments_s] = useState();
  const [activeApp, setActiveApp] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [username, setUsername] = useState();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [createAppModalOpen, setCreateAppModalOpen] = useState(false);



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

  function checkAuth(){
    
    const check = Axios.create({
      withCredentials: true
    })
   check.get(backendURL + "/checkAuth",{
   }).then((response) =>{
      console.log("checkAuth response:")
      console.log(response)
    if(response.data.user == null) {
      console.log("NOT_AUTHORIZED")
    }else{
      setLoggedIn(response.data.auth)
      setUsername(response.data.user.name)
    }
   } )
  
  }


  const getAppointments = () =>{
    console.log("Getting Appointments...")
    Axios.post(backendURL + '/getAppointments', {

    },{withCredentials: true})
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
    },{withCredentials: true})
    .then(function (response) {
   
      if(response.data == "CREATION_FAILED"){
        console.log("APPOINTMENT CREATION FAILED")
        return
      } else {
          console.log("Appointment created successfully")
          console.log(response.data)
          let tmp = appointments_s
          console.log("tmp before:")
          console.log(tmp)
          tmp.push(response.data)
          console.log("tmp after:")
          console.log(tmp)
          console.log("Setting Appointments...")
          setAppointments_s(tmp)
          console.log("results:")
          console.log(appointments_s)
      }

      //window.location.reload()
      //do something
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const selectDay = (date) =>{
    setActiveApp(date)
  }

  const renderLoginButton = (cName="nav-item nav-link") =>{

    
    if(loggedIn){
      return <NavItem className={cName} href="#" onClick={()=>logout()}>LOGOUT</NavItem>} 
      else return <NavItem className={cName} href="#" onClick={()=>setLoginModalOpen(true)}>LOGIN</NavItem>
  }

  const generateNavbarBrand = () =>{
    if(loggedIn){
      
      return <NavbarBrand href="#">Willkommen, {username}</NavbarBrand>} 
      else return <NavbarBrand href="#">Willkommen</NavbarBrand>
  }





  function generateNavbar(){



    return (
      <Navbar className="navbar navbar-dark bg-dark">
        {generateNavbarBrand()}
        <NavItem className="nav-item nav-link" href="#" onClick={()=>setCreateAppModalOpen(true)}>Termin erstellen</NavItem>
        
        <NavItem className="nav-item nav-link" href="#">Test2</NavItem>
        <NavItem className="nav-item nav-link" href="#">Test3</NavItem>
        {renderLoginButton()}
      </Navbar>
      

    );

  }


  function login (eml,pwd){
    console.log("Logging in... usr: " + eml + " ,pwd: " + pwd)

    const log = Axios.create({
        withCredentials: true
      })

      log({
          method: 'post',
          url: backendURL+"/Login",
          data: qs.stringify({
            email: eml,
            password: pwd
          }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).then(response => {
            console.log(response)
                
               if(response.data.msg == "UserNamePasswordError") alert("Username oder Passwort sind falsch")
                
               window.location.reload();

          
      })
  }

  function logout(){
    const log = Axios.create({
      withCredentials: true
    })
    log.get(backendURL +"/Logout").then(response => {
        console.log(response.data)
        if(response.data == "LOGOUT_SUCCESS"){
           // alert("Logout erfolgreich")
            window.location.reload();
        }
        
    })

    
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
    if(!loggedIn) checkAuth()
    
    
    

  })


  return (
    <div className="App">     
    <LoginModal isOpen={loginModalOpen} setOpenState={setLoginModalOpen} login={login}></LoginModal>
    <CreateAppointmentModal isOpen={createAppModalOpen} setOpenState={setCreateAppModalOpen} createApp={createAppointment}></CreateAppointmentModal>
      	{generateNavbar()}
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
