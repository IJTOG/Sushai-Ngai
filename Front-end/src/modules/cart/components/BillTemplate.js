import React from 'react'
import './style.css'
import Logo from '../../../asset/IconSE2.jpg'
import moment from 'moment'

const Bill =({
 bill
}) => (
    <div class="invoice-box">
      {bill && 
         <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title">
                                <img src={Logo} style={{width:"100%",maxWidth:"300px"}} alt='bill'/>
                            </td>
                            
                            <td>
                                Invoice #: {bill['id']}<br/>
                                Created: {moment(bill["bill_date"]).format('DD-MM-YYYY')} <br/>
                                Due: {moment(bill["bill_date"]).format('DD-MM-YYYY')}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                            61/36 ซ.พระยาสุเรนทร์13 <br />
                            ถนนพระยาสุเรนทร์ <br />
                            แขวงบางชัน เขต คลองสามวา <br/>
                            กรุงเทพมหานคร 10510
                            </td>
                            
                            <td>
                                02-518-0933<br/>
                                Sushi Ngai<br/>
                                Sushi Ngai Delivery
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>            
            <tr class="heading">
                <td>
                    Item
                </td>
                <td>
                    qty
                </td>
                <td>
                    Price
                </td>
            </tr>
            {
                Object.keys(bill['lists']).map((key)=>(
                    <tr class="item">
                        <td>
                        {bill['lists'][key]['product_id']['name_en']}
                        </td>
                        <td>
                        {bill['lists'][key]['qty']}  
                        </td>
                        <td>
                        {bill['lists'][key]['product_id']['price']*bill['lists'][key]['qty'] + ' Bath'}
                        </td>
                    </tr> 
                ))
            }
            <tr class="total">
                <td></td>
                <td></td>
                <td >
                   Total: {bill['amount']+' Bath'}
                </td>
            </tr>
        </table>} 
    </div>
)

export default Bill