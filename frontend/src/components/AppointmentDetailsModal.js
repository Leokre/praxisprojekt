
import {Button,Card, Container, Row, Col, ModalDialog, ModalTitle, ModalBody, ModalFooter, Modal, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect, useState, useRef} from "react"
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import {readableDate} from '../Helpers.js'
import {FaTrashAlt} from 'react-icons/fa';

const AppointmentDetailsModal = ({openApp, setOpenApp, deleteAppointment}) => {
    const appName = openApp? openApp.Name : ""
    const appCategory = openApp? openApp.Category : ""
    const appDescription = (openApp && openApp.Description)? openApp.Description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
    const appEndDate = openApp? readableDate(openApp.EndDate) : ""
    const appStartDate = openApp? readableDate(openApp.StartDate) : ""
    const appWorkload = openApp? openApp.Workload : ""
    const appAdminName = openApp? openApp.adminName : ""
    


    
    

    useEffect(() => {
        console.log("AppointmentDetailsModal openApp:")
        console.log(openApp)

    });



    
      
  
  
   
   
    return (
        <>
        <Modal show={openApp} id="AppDetailsModal" className="modal fade" >
            
            
                <ModalHeader>
                    <ModalTitle id="createAppModalTitle">{appName}</ModalTitle>
                    <Button className="pull-right"  variant="danger" href="#" onClick={()=>{deleteAppointment(openApp.idCourse,openApp.idAppointment)}} ><FaTrashAlt size={30}  /></Button >
                </ModalHeader>
                <ModalBody>
                
                    <Row>
                        <Col md>
                        <p><strong>Kurs: </strong>{appCategory}</p> 
                        </Col>
                        <Col md>
                        <p><strong>Workload: </strong> {appWorkload} Stunden</p>  
                        </Col>
                    </Row>
                    <Row>
                        <Col md>
                        <p><strong>Startdatum: </strong>{appStartDate}</p>
                        
                        </Col>
                        <Col md>
                        <p><strong>Enddatum: </strong>{appEndDate}</p>  
                        </Col>
                    </Row>
                    <Row>
                        <Col md>
                        <p><strong>Verantwortlich: </strong> {appAdminName}</p>  
                        </Col>
                    
                    </Row>
                    <Row>
                        <Col md>
                        <p><strong>Beschreibung: </strong> {appDescription}</p>  
                        </Col>
                    </Row>
                
                </ModalBody>
                <ModalFooter>
                    <Button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setOpenApp(null)}>Schließen</Button>
                </ModalFooter>
            

        </Modal>

        </>
    
)}

        export default AppointmentDetailsModal