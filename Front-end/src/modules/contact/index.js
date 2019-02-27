import Map from './components/googlemap'
import React from 'react'
import {Row,Col} from 'reactstrap'
import Facebook from '../../asset/facebook.png'
import Fact from '../../asset/foursquare.png'
import Call from '../../asset/viber.png'
import Maps from '../../asset/map1.png'

export default () => (
    <div className='container' style={{paddingBottom:'30px'}}>
    <div className='container text-center' ><br/><h3>Contact us</h3><hr style={{width:"90%"}}/><br/>
       <div style={{fontSize: '21px',color:'#4E8586',fontWeight: 'bold'}}><img src={Call} alt='Call' style={{width:'13%'}}></img> 02-518-0933<br/><br/>
       <img src={Facebook} alt='Facebook' style={{width:'13%'}}></img> Sushi Ngai Delivery<br/><br/>
       <img src={Fact} alt='Fact' style={{width:'13%'}}></img> 02-9030080<br/><br/>
        </div></div>
        <hr style={{width:"90%"}}/>
    <div className='container'>
    <Row>
        <Col>
           <div className='text-center'>
           <img  src={Maps} alt='gpslogo' style={{width: '70px'}}/>
           <br/><br/>
             <h4>61/36 ซ.พระยาสุเรนทร์13 ถนนพระยาสุเรนทร์ แขวงบางชัน เขต คลองสามวา กรุงเทพมหานคร 10510</h4>
           </div>
        </Col>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
           <div className='text-center'><br/>
             <Map />
           </div>
        </Col>
    </Row>
    </div>
    </div>
)