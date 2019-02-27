import React from 'react'
import {
    Col,
    Row
} from 'reactstrap'
import styled from 'styled-components'
import { translate } from 'react-i18next'
import '../style.css'

const Detail = styled.h4`
    margin-top:20px;
`

const HowTo = ({t}) => (
    <div className="container">
            <h1 style={{textAlign:"center"}}>{t('home-howto-howitwork')}</h1>
            <br />

         <Row >
                <Col>
                <div className='text-center easing-variables'>
                        <img alt='about' src="https://www.img.live/images/2018/10/02/key1.png" />
                        <br/>
                        <Detail> 1.{t('home-howto-login')}</Detail>
                        </div>
                </Col>
                <Col>
                <div className='text-center easing-variables'>
                        <img alt='about' src="https://www.img.live/images/2018/10/02/sushi1.png"/>
                        <br />
                        <Detail>2.{t('home-howto-choosemenu')}</Detail>
                        </div>
                </Col>
                <Col>
                <div className='text-center easing-variables'>
                         <img alt='about' src="https://www.img.live/images/2018/10/02/map1.png"/>
                        <Detail>3.{t('home-howto-location')}</Detail>
                        </div>
                </Col>
                <Col>
                <div className='text-center easing-variables'>
                            <img alt='about' src="https://www.img.live/images/2018/10/02/phone1.png"/>
                            <br/>
                            <Detail>4.{t('home-howto-confirm')}</Detail>
                            </div>
                </Col>
                <Col>
                <div className='text-center easing-variables'>
                         <img alt='about' src="https://www.img.live/images/2018/10/02/delivery1.png"/>
                         <br/>
                        <Detail>5.{t('home-howto-delivery')}</Detail>
                        </div>
                </Col>
         </Row>
    </div>

)
export default translate()(HowTo)