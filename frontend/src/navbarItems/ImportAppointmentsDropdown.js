
import {NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect,} from "react"

const ImportAppointmentsDropdown = ({startAppointmentImport}) => {




    useEffect(() => {


    });


   
   
    return (
<>
        <NavDropdown title="Termine importieren" id="basic-nav-dropdown">
            <NavDropdown.Item href={"#action/3.1"} onClick={()=>startAppointmentImport('google')}>Google Calendar</NavDropdown.Item>
        </NavDropdown>

</>
    
)}

        export default ImportAppointmentsDropdown