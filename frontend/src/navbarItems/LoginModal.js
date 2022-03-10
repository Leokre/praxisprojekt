
import {Button,Card, Container, Row, Col, ModalDialog, ModalTitle, ModalBody, ModalFooter, Modal, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import {useEffect, useState, useRef} from "react"
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
const LoginModal = ({isOpen, setOpenState,login}) => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");

 







    useEffect(() => {


    });



    
      
  
  
   
   
    return (
<>
<Modal show={isOpen} id="loginModal" className="modal fade" >
    <ModalDialog className="modal-dialog-centered" role="document">
    <Form >
        <ModalHeader>
            <ModalTitle id="loginModalTitle">Login</ModalTitle>
            {/* <Button className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setOpenState(false)}></Button> */}
        </ModalHeader>
        <ModalBody>
        
          <Row>
            <Col md>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="text" placeholder="example@gmail.com" value={emailState} onInput={e => setEmailState(e.target.value)}/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          </Col>
          <Col md>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={passwordState} onInput={e => setPasswordState(e.target.value)}/>
          </Form.Group>
          </Col>
          </Row>
        
        </ModalBody>
        <ModalFooter>
            <Button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setOpenState(false)}>Close</Button>
            <Button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>login(emailState,passwordState)}>Login</Button>
        </ModalFooter>
        </Form>
    </ModalDialog>
</Modal>

</>
    
)}

        export default LoginModal