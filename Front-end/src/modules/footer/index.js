import React from 'react'
import { Col,Row,Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import './style.css'

const Footer = () => {
    return(
    <div className='container' >
    <br/>
        <footer className="footer">
        <Container fluid className="text-center text-md-left">
    <Row>
      <Col md="6">
      <h5 className="title">SUSHI NGAI</h5>
      <p>
        This website is project for software engineering of computer science KMITL.
      </p>
      </Col>
      <Col md="6">
      <h5 className="title">นโยบาย</h5><br/>
      <ul>
        <li className="list-unstyled">
        <Link to='/policy/feqquestions' className='style'>คำถามที่พบบ่อย</Link>
        </li>
        <li className="list-unstyled">
        <Link to='/contact' className='style'>บริการลูกค้า</Link>
        </li>
        <li className="list-unstyled">
        <Link to='/policy/privacyPolicy' className='style'>นโยบายความเป็นส่วนตัว</Link>
        </li>
        <li className="list-unstyled">
        <Link to='/policy/TermsOfUse' className='style'>เงื่อนไขการใช้บริการ</Link>
        </li>
      </ul>
      </Col>
    </Row>
  </Container>
  <div className="footer-copyright text-center py-3">
    <Container fluid>
      &copy; {new Date().getFullYear()} Copyright:{" "} SushiNgai.com 
    </Container>
  </div>
  </footer></div>
    )
}

export default Footer
