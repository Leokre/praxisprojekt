import './App.css';
import {Button, Alert, Breadcrumb, Card, Form, Container, Row, Col, Navbar, NavbarBrand, NavItem} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from "axios";
import { useEffect, useState} from "react"
import Calendar from './components/Calendar';
import AppointmentList from './components/AppointmentList';
import LoginModal from './navbarItems/LoginModal';
import CreateAppointmentModal from './navbarItems/CreateAppointmentModal';
import AppointmentDetailsModal from './components/AppointmentDetailsModal';
import PickCourseDropdown from './navbarItems/PickCourseDropdown';
import ImportAppointmentsDropdown from './navbarItems/ImportAppointmentsDropdown';
import qs from "qs"
import CalendarDayDetailsModal from './components/CalendarDayDetailsModal';

const backendURL = process.env.REACT_APP_BACKEND_URL

function App() {
  const [dates_s, setDates_s] = useState();
  const [appointments_s, setAppointments_s] = useState();
  const [activeApp, setActiveApp] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [username, setUsername] = useState();
  const [userRole, setUserRole] = useState();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [createAppModalOpen, setCreateAppModalOpen] = useState(false);
  const [appDetailsModalOpen, setAppDetailsModalOpen] = useState(null);
  const [calDayDetailsModalOpen, setCalDayDetailsModalOpen] = useState(null);
  const [adminCourses, setAdminCourses] = useState();
  const [activeCourse, setActiveCourse] = useState();
  const [importedAppointments, setImportedAppointments] = useState();

  
 
  const getExternalAppointments = async (code) =>{
    window.history.pushState('', 'Title', '/');
    return Axios.post(backendURL + '/getExternalAppointments', {
      code: code,
    },{withCredentials:true})
    .then(function (response) {
      console.log(response.data)
      //window.location.href = 'http://localhost:3000'
      //window.location.href = "www.mysite.com/page2.php";  
      setImportedAppointments(response.data)
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  const getDates = (month, year) =>{
    console.log("Getting Dates...")
      console.log("Month: " + month)
      console.log("Year: " + year)
    if(loggedIn){
      console.log("userRole:" + userRole + " activeCourse: " + activeCourse)
      console.log(activeCourse)
      if(userRole === 1 && activeCourse){
        Axios.post(backendURL + '/getDates', {
          month: month,
          year: year,
          courseID: activeCourse.idCourse
        },{withCredentials:true})
        .then(function (response) {
          setDates_s(response.data)
          console.log("dates_s: ")
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      }else if(userRole === 0){
        Axios.post(backendURL + '/getDates', {
          month: month,
          year: year
        },{withCredentials:true})
        .then(function (response) {
          setDates_s(response.data)
          console.log("dates_s: ")
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    }
    
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
      setUserRole(response.data.user.role)
      if(response.data.user.role == 1){
        console.log("USER IS ADMIN")
        getAdminsCourses()
      } 
    }
   } )
  
  }


  const deleteAppointment = (courseID,appointmentID) => {

    Axios.post(backendURL + '/deleteAppointment', {
      courseID:courseID,
      appointmentID:appointmentID
    },{withCredentials: true})
    .then(function (response) {
      if(response.data == "DELETION_SUCCESS"){
        //window.location.reload()
        var currentDate = new Date(dates_s[5].date)
       
        getDates(currentDate.getMonth(),currentDate.getFullYear())
        getAppointments()
        setAppDetailsModalOpen(null)
      }
      if(response.data == "DELETION_FAILED") alert("Keine Berechtigung diesen Termin zu löschen")
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function getAdminsCourses(){
    
    const check = Axios.create({
      withCredentials: true
    })
   check.post(backendURL + "/getAdminsCourses",{
   }).then((response) =>{
      console.log("getAdminsCourses response:")
      console.log(response)
    if(response.data[0] == null) {
      console.log("NO_COURSES")
    }else{
      setAdminCourses(response.data)
      setActiveCourse(response.data[0])
    }
   } )
  
  }



  const getAppointments = () =>{
    console.log("Getting Appointments...")
    console.log("activeCourse: ")
    console.log(activeCourse)
    if(activeCourse){
      Axios.post(backendURL + '/getCourseAppointments', {
        courseID:activeCourse.idCourse
      },{withCredentials: true})
      .then(function (response) {
        console.log("APPOINTMENTS RESPONSE: ")
        console.log(response.data)
        setAppointments_s(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{ 
      Axios.post(backendURL + '/getAppointments', {

      },{withCredentials: true})
      .then(function (response) {
        setAppointments_s(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }

  const startAppointmentImport = (provider) => {
    if(!provider) return
    window.location = process.env.REACT_APP_BACKEND_URL + '/auth/' + provider

  }

  const createAppointment = (name,startDate,endDate,workload=0,description="") =>{
    console.log("Creating Appointment...")
    Axios.post(backendURL + '/createAppointment', {
      name: name,
      startDate: startDate,
      endDate: endDate,
      workload: parseFloat(workload),
      description: description
    },{withCredentials: true})
    .then(function (response) {
   
      if(response.data == "CREATION_FAILED") return alert("APPOINTMENT CREATION FAILED")
      
      var currentDate = new Date(dates_s[5].date)
      getDates(currentDate.getMonth(),currentDate.getFullYear())
      getAppointments()
      setCreateAppModalOpen(false)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const selectDay = (date) =>{
    setActiveApp(date)
  }

  const renderLoginButton = (cName="ms-auto") =>{

    
    if(loggedIn) return <NavItem className={cName}><Button  variant="danger" href="#" onClick={()=>logout()}>LOGOUT</Button ></NavItem>
      else return <NavItem className={cName}><Button  variant="success" href="#" onClick={()=>setLoginModalOpen(true)}>LOGIN</Button ></NavItem>
  }

  const generateNavbarBrand = () =>{
    if(loggedIn){
      
      return <NavbarBrand href="#">Willkommen, {username}</NavbarBrand>} 
      else return <NavbarBrand href="#">Willkommen</NavbarBrand>
  }

  const genKursName = () =>{
    if(userRole === 1 && activeCourse){
      
      return <NavbarBrand href="#">Aktiver Kurs: {activeCourse.Name}</NavbarBrand>} 
  }

  function renderPickCourseButton(){

    //if(userRole === 1) return (<NavItem className="nav-item nav-link dropdown" href="#" >Kursauswahl</NavItem> );

    if(userRole === 1) return (<PickCourseDropdown courses={adminCourses} setActiveCourse={setActiveCourse}/>);


    return (<></>)

  }

  function renderAppointmentImportButton(){



    //if(userRole === 1) return (<NavItem className="nav-item nav-link dropdown" href="#" >Kursauswahl</NavItem> );

    if(userRole === 0) return (<ImportAppointmentsDropdown startAppointmentImport={startAppointmentImport}/>);


    return (<></>)

  }

  const renderCreateAppButton = (cName="nav-item nav-link") =>{

    
    if(loggedIn) return <NavItem className={cName} href="#" onClick={()=>setCreateAppModalOpen(true)}>Termin erstellen</NavItem>
    else return <></>
  }

  function generateNavbar(){



    return (
      <Navbar className="navbar navbar-dark bg-dark">
        {generateNavbarBrand()}
        {renderCreateAppButton()}
        {renderPickCourseButton()}
        {renderAppointmentImportButton()}
        {genKursName()}
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
      var date = new Date(dates_s[5].date)
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
    console.log("current Date:")
    console.log(currentDate)
    console.log("loggedIn:")
    console.log(loggedIn)
    console.log("dates_s:")
    console.log(dates_s)
    console.log("appointments_s:")
    console.log(appointments_s)
    //setDates_s(getDates(currentDate.getMonth(),currentDate.getFullYear()))


    
  const bla = window.location.search
  const queryParams = new URLSearchParams(bla)
  const code = queryParams.get("code")
  if(code){
    getExternalAppointments(code)
  }


 

    if(!loggedIn) checkAuth()
    if(!dates_s) {
      console.log("Dates empty, getting dates from backend...")
      getDates(currentDate.getMonth(),currentDate.getFullYear())
    }
    if(!appointments_s) {
      console.log("Appointments empty, getting appointments from backend...")
      getAppointments()

    }
    
    

  })

  useEffect(() => {
    if(!importedAppointments) return
    console.log("Appointment import received, creating appointments...")
    console.log("importedAppointments: ")
    console.log(importedAppointments[0].summary)
    for(let i=0;i<importedAppointments.length;i++){
      console.log("APP:")
      console.log(importedAppointments[i])
      let name = importedAppointments[i].summary
      let startDate = importedAppointments[i].start.dateTime
      let endDate = importedAppointments[i].end.dateTime
      let workload = new Date(endDate).getTime() - new Date(startDate).getTime()
      workload = workload / (1000 * 60 * 60)
      console.log("APPWORKLOAD:" + workload)
      let description = importedAppointments[i].description || ""
      createAppointment(name,startDate,endDate,workload,description)
    }
  }, [importedAppointments])

useEffect(() => {
  console.log("activeCourse updated, getting Appointments...")
  console.log(activeCourse)
  getAppointments()
}, [activeCourse])

  const generateMainContent = () =>{
    if(!loggedIn){
      return (<>
        <p style={{fontSize: 150}}>Terminkalender</p>
        <p>Bitte per Hochschul-Email einloggen um Zugriff auf die Funktionalitäten zu erhalten</p>
      


      </>)
    }
    return <Container fluid>
    <Row className="mb-3">
      <Col id="calendar" className="custom sm-3" fluid>
      <Calendar setDayOpen={setCalDayDetailsModalOpen} activeApp={activeApp} dates={dates_s} changeDate={changeDate} selectDay={selectDay}/>

      </Col>
      <Col id="appointments" className="sm-3" fluid>
      {console.log("activeApp: " + activeApp)}
      <AppointmentList dates={dates_s} appointments={appointments_s} activeApp={activeApp} selectDay={selectDay} setAppDetailsModalOpen={setAppDetailsModalOpen}/>

      </Col>
    </Row>
    </Container>
  }

  return (
    <div className="App">   
    {console.log("RENDERING")}
    <CalendarDayDetailsModal appointments={appointments_s} openDay={calDayDetailsModalOpen} setOpenDay={setCalDayDetailsModalOpen}></CalendarDayDetailsModal>  
    <AppointmentDetailsModal deleteAppointment={deleteAppointment} openApp={appDetailsModalOpen} setOpenApp={setAppDetailsModalOpen}></AppointmentDetailsModal>
    <LoginModal isOpen={loginModalOpen} setOpenState={setLoginModalOpen} login={login}></LoginModal>
    <CreateAppointmentModal isOpen={createAppModalOpen} setOpenState={setCreateAppModalOpen} createApp={createAppointment} getDates={getDates}></CreateAppointmentModal>
      	{generateNavbar()}
      <header className="App-header">
        {generateMainContent()}
        
      



        
      </header>
    </div>
  );
}

export default App;
