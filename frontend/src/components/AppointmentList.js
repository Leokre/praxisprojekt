
import {Button,Card, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import {useEffect , useState} from "react"
const AppointmentList = ({dates,appointments,activeApp,selectDay}) => {

  console.log("Appointments in List class:")
  console.log(appointments)
  var activeLoaded = false
  var newApp = false
  const [appList, setAppList] = useState();
  const [activeApp_s, setActiveApp_s] = useState();

  useEffect(()=>{
    
    if(activeApp && !activeLoaded){
      activeLoaded = true
      console.log("ACTIVE APP DETECTED")
      console.log(activeApp)
      setActiveApp_s(activeApp)
    }
    if(activeApp != activeApp_s){
      setActiveApp_s(activeApp)
      newApp=true
    }

    console.log("activeApp: "+activeApp)

      if((!appList && appointments) || newApp) {
        newApp = false;
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

          listItems.push(<a id={"li-" + i} href="#" onClick={()=> selectDay(new Date(appointments[i].EndDate))} class={classString}>
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">TestKategorie</h5>
            <small class="text-muted">{(() => {
              let a = new Date(appointments[i].EndDate)
              let out = a.getDate() + "." + (parseInt(a.getMonth()) +1) + "." + a.getFullYear()
              return out
            })()}</small>
          </div>
          <p class="mb-1">{appointments[i].Name}</p>
          <small class="text-muted">Workload: {appointments[i].Workload} Stunden</small>
        </a>)
        }
        setAppList(listItems)
      }
      
      

    

  })


    return (
        <>
        <Container>
          <p style={{"font-size" : 40}}>Termine</p>
            <ul class="list-group"  style={{"max-height": 478}}>

              {appList}

            </ul>
            </Container>
    
    
    </>
    
    
    
    
    
    
)}

        export default AppointmentList