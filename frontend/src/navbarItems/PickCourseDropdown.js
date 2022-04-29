
import {Button,Card, Container, Row, Col, ModalDialog, ModalTitle, ModalBody, ModalFooter, Modal, Form, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import {useEffect, useState, useRef} from "react"
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
const PickCourseDropdown = ({courses,setActiveCourse}) => {




    useEffect(() => {


    });


  

    const generateDropdownItems = () => {
        let output = []
        if(!courses) return <NavDropdown.Item href="#action/3.1">NO_COURSES</NavDropdown.Item>
        for(let i in courses){
            output.push(<NavDropdown.Item href={"#action/3." + i} onClick={()=>setActiveCourse(courses[i])}>{courses[i].Name}</NavDropdown.Item>)
        }
        /* 
        return (<>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </>);
        */

        return output
        
    }

    
      
  
  
   
   
    return (
<>
        <NavDropdown title="Kursauswahl" id="basic-nav-dropdown">
          {generateDropdownItems()}
        </NavDropdown>

</>
    
)}

        export default PickCourseDropdown