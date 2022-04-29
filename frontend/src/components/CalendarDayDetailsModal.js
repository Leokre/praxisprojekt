
import {Button,Card, Container, Row, Col, ModalDialog, ModalTitle, ModalBody, ModalFooter, Modal, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect, useState, useRef} from "react"
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
const CalendarDayDetailsModal = ({appointments,openDay,setOpenDay}) => {




    
    

    useEffect(() => {


    });


    const generateContent = () => {
        console.log("generateContent")
        console.log("openDay")
        console.log(openDay)
        console.log("appointments")
        console.log(appointments)
        if(!openDay || !appointments) return []
        var output = []
        for(let i=0;i<openDay.appointments.length;i++){
            const matchingAppointment = appointments.find(obj => {
                return obj.idAppointment == openDay.appointments[i].idAppointment
              })
            console.log("matchingAppointment")
            console.log(matchingAppointment)
            const appointmentName = matchingAppointment.Name
            const appointmentWorkload = openDay.appointments[i].Workload.toFixed(1)
            if(appointmentWorkload == 0)continue;
            output.push(

                <Row>
                    <Col md>
                    <p>Termin: {appointmentName}</p> 
                    
                    </Col>
                    <Col md>
                    <p>Workload: {appointmentWorkload} Stunden</p>  
                    </Col>
                    </Row>



            )
        }
        return output
    }
      
  
  
   
   
    return (
<>
<Modal show={openDay} id="AppDetailsModal" className="modal fade" >
    
    
        <ModalHeader>
            <ModalTitle id="createAppModalTitle">Zusammensetzung des Workloads:</ModalTitle>
        </ModalHeader>
        <ModalBody>
        <Row>
        <Col md>
        <p>Gesamtworkload: {(openDay? openDay.workload : 0).toFixed(1)} Stunden</p> 
                    
        </Col>
        </Row>
        {generateContent()}
        </ModalBody>
        <ModalFooter>
            <Button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setOpenDay(null)}>Schließen</Button>
        </ModalFooter>
       

</Modal>

</>
    
)}

        export default CalendarDayDetailsModal