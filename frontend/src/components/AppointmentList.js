
import {Button,Card, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import {useEffect , useState} from "react"
import {readableDate} from '../Helpers.js'
const AppointmentList = ({dates,appointments,activeApp,selectDay,setAppDetailsModalOpen}) => {

  console.log("Appointments in List class:")
  console.log(appointments)
  var activeLoaded = false
  const [activeApp_s, setActiveApp_s] = useState();


const generateAppList = () => {

  if(appointments) {
    var listItems = []
    for(let i = 0; i<appointments.length;i++){
      console.log(appointments[i].EndDate)
      let classString = "list-group-item list-group-item-action"
      if(activeApp){
        let dt = new Date(appointments[i].EndDate)
        if(activeApp.getTime() == dt.getTime()){
          classString += " active"
          var scrollToID = "li-" + i
          document.getElementById(scrollToID).scrollIntoView({ behavior: 'smooth' })
        }
      }

      listItems.push(<a id={"li-" + i} href="#" onClick={()=> selectDay(new Date(appointments[i].EndDate))} onDoubleClick={()=>{setAppDetailsModalOpen(appointments[i])}} class={classString}>
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{appointments[i].Category}</h5>
        <small class="text-muted">{readableDate(appointments[i].EndDate)}</small>
      </div>
      <p class="mb-1">{appointments[i].Name}</p>
      <small class="text-muted">Workload: {appointments[i].Workload} Stunden</small>
    </a>)
    }
    return listItems
  }

}


  useEffect(()=>{
   // if(appointments != appointments_s) setAppointments_s(appointments)


    if(activeApp && !activeLoaded){
      activeLoaded = true
      console.log("ACTIVE APP DETECTED")
      console.log(activeApp)
      setActiveApp_s(activeApp)
    }
    if(activeApp != activeApp_s){
      setActiveApp_s(activeApp)
    }

    console.log("activeApp: "+activeApp)

      
      
      

    

  })




    return (
        <>
        <Container>
          <p style={{"font-size" : 40}}>Termine</p>
            <ul class="list-group"  style={{"max-height": 478}}>

              {generateAppList()}

            </ul>
            </Container>
    
    
    </>
    
    
    
    
    
    
)}

        export default AppointmentList