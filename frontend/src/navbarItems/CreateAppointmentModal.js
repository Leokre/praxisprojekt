
import {Button,Card, Container, Row, Col, ModalDialog, ModalTitle, ModalBody, ModalFooter, Modal, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import {useEffect, useState, useRef} from "react"
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
const CreateAppointmentModal = ({isOpen, setOpenState,createApp,getDates}) => {
    const [name_s, setName_s] = useState("");
    const [description_s, setDescription_s] = useState("");
    const [startDate_s, setStartDate_s] = useState("");
    const [endDate_s, setEndDate_s] = useState("");
    const [workload_s, setWorkload_s] = useState("");




    useEffect(() => {


    });



    
      
  
  
   
   
    return (
<>
<Modal show={isOpen} id="createAppModal" className="modal fade" >
    <ModalDialog className="modal-dialog-centered" role="document">
    <Form >
        <ModalHeader>
            <ModalTitle id="createAppModalTitle">Termin erstellen</ModalTitle>
            {/* <Button className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setOpenState(false)}></Button> */}
        </ModalHeader>
        <ModalBody>
        
        <Row>
            <Col md>
                <Form.Group controlId="formText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="AP2 Übung" value={name_s} onInput={e => setName_s(e.target.value)}/>
                    <Form.Text className="text-muted"/>
                </Form.Group>
            </Col>
            <Col md>
                <Form.Group controlId="formNumber">
                    <Form.Label>Gesamtworkload (in Stunden)</Form.Label>
                    <Form.Control type="number" placeholder="20" value={workload_s} onInput={e => setWorkload_s(e.target.value)}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md>
                <Form.Group controlId="formDate">
                    <Form.Label>Startdatum</Form.Label>
                    <Form.Control type="date" placeholder="" value={startDate_s} onInput={e => setStartDate_s(e.target.value)}/>
                    <Form.Text className="text-muted"/>
                </Form.Group>
            </Col>
            <Col md>
                <Form.Group controlId="formDate">
                    <Form.Label>Enddatum</Form.Label>
                    <Form.Control type="date" placeholder="" value={endDate_s} onInput={e => setEndDate_s(e.target.value)}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md>
                <Form.Group controlId="formText">
                    <Form.Label>Beschreibung</Form.Label>
                    <Form.Control type="text" placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam" value={description_s} onInput={e => setDescription_s(e.target.value)}/>
                    <Form.Text className="text-muted"/>
                </Form.Group>
            </Col>
        </Row>
        
        </ModalBody>
        <ModalFooter>
            <Button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setOpenState(false)}>Schließen</Button>
            <Button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{createApp(name_s,startDate_s,endDate_s,workload_s,description_s);const eDate= new Date(endDate_s);getDates(eDate.getMonth(),eDate.getFullYear());setName_s("");setDescription_s("");setStartDate_s("");setEndDate_s("");setWorkload_s("");setName_s("");}}>Termin erstellen</Button>
        </ModalFooter>
        </Form>
    </ModalDialog>
</Modal>

</>   
    
)}

        export default CreateAppointmentModal