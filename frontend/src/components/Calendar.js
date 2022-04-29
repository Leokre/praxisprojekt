
import {Button,Card, Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaAngleDoubleLeft , FaAngleDoubleRight} from 'react-icons/fa';
import {useEffect, useState, useRef} from "react"
const Calendar = ({dates,appointments,changeDate, selectDay, activeApp, setDayOpen}) => {
    const [selectedMonth, setSelectedMonth] = useState();

    const percentage2color = (input) => {
        const percentage = (input/8) * 100
        var r, g, b = 0;
        if((100-percentage) < 50) {
            r = 255;
            g = Math.round(5.1 * (100 - percentage));
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * (100-percentage));
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    const createRow = (dates,rowNum) => {
        var columns = []
        for(let i=0;i<dates.length;i++){
            let day = ""
            let date = new Date(dates[i].date)
            switch(date.getDay()){
                default:
                    day="sun-"
                    break;
                case 1 :
                    day="mon-"
                    break;
                case 2 :
                    day="tue-"
                    break;
                case 3 :
                    day="wed-"
                    break;
                case 4 :
                    day="thu-"
                    break;
                case 5 :
                    day="frd-"
                    break;
                case 6 :
                    day="sat-"
                    break;
            }
            let columnID = day + rowNum
            let c = "p-2 rounded-0"
           
            if(date && activeApp && date.getTime() === activeApp.getTime()){
                c+= " highlight"
            } 


            columns.push(<Col id={columnID} className="p-0">
            < Card onDoubleClick={()=>setDayOpen(dates[i])} onClick={()=>selectDay(date)} className={c}  style={{color: "#000",background: percentage2color(dates[i].workload)}}>
                    <Card.Body>
                        <Card.Title style={{fontSize: 30}}>
                            {date.getDate()}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>)
        }


        return(
            <Row id={"W" + rowNum} className="p-0" >
                {columns}   

            </Row>
        )
    }

    const createRows = (dates) => {
        if(!dates) return
        console.log("CREATEROWS DATES:")
        console.log(dates)
        
        let rowCount = 5
        let columnCount = 7
        let rowDates = []
      
        for(let i=0; i<rowCount;i++)    { 
            let days = []
            for(let j=columnCount*i; j<(columnCount*i) + columnCount;j++)    {   
                days.push(dates[j])
            }
            rowDates.push(days)

        }



        return(
            
            <>
            {createRow(rowDates[0],1)}
            {createRow(rowDates[1],2)}
            {createRow(rowDates[2],3)}
            {createRow(rowDates[3],4)}
            {createRow(rowDates[4],5)}

   
          </>
        ) 

 
   
    }


    const isInitialMount = useRef(true);

    useEffect(() => {
        if(dates && activeApp){
            console.log("Dates 5 Year: ")
            console.log(new Date(dates[5].date).getFullYear())
            console.log("activeApp Year: ")
            console.log(activeApp.getFullYear())
        }
 

    if (isInitialMount.current) {
        isInitialMount.current = false;
    } else {
        if(!dates) return
        let split = new Date(dates[5].date)
        if(dates) setSelectedMonth(split.getMonth() + "-" + split.getFullYear())
        console.log("Selected Month:" + split.getMonth() + "-" + split.getFullYear())

        if(dates && activeApp && (new Date(dates[5].date)).getMonth() != activeApp.getMonth()) changeDate(activeApp)
    }

    });




    
      
  
  
    const monthToText = (monthNum)=>{
        if(!monthNum) return "LOADING"
        let monthText = "bla"
        switch (monthNum.split('-')[0]){
                case "0" :
                    monthText = "Januar"
                    break;
                case "1" :
                    monthText = "Februar"
                    break;
                case "2" :
                    monthText = "März"
                    break;
                case "3" :
                    monthText = "April"
                    break;    
                case "4" :
                    monthText = "Mai"
                    break;
                case "5" :
                    monthText = "Juni"
                    break;
                case "6" :
                    monthText = "Juli"
                    break;
                case "7" :
                    monthText = "August"
                    break;   
                case "8" :
                    monthText = "September"
                    break;
                case "9" :
                    monthText = "Oktober"
                    break;
                case "10" :
                    monthText = "November"
                    break;
                case "11" :
                    monthText = "Dezember"
                    break;    
                default:
                    monthText = "LOADING"
                    break;
        }
        monthText += " " + monthNum.split('-')[1]
        return monthText 
    }
   
    return (
        <>
        <Container>
          <Row className="p-0">
            <Col className="p-0">
              <Button className="h-100 w-100" onClick={()=>changeDate(-1)}><FaAngleDoubleLeft size={70}  /></Button>
            </Col>
            <Col className="p-0">
              <p className="w-100 h-100" style={{"font-size" : 40}}>{monthToText(selectedMonth)} </p>
            </Col>
            <Col className="p-0">
              <Button className="h-100 w-100" onClick={()=>changeDate(1)}><FaAngleDoubleRight size={70} /></Button>
            </Col>
            
           
            
          </Row>
          
        </Container>
        
        <Container fluid>
            {createRows(dates)}
         </Container>
    
    
    </>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
)}

        export default Calendar