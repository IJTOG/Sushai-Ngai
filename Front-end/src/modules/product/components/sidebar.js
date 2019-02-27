import React from 'react'
import { Link} from 'react-router-dom'

const sidebar = (
  category
) => (
    category.items.map( item=>{
    return(
        <li key={item.id}>
            <Link className='hover-underline-animation' to={`/menu/products/${item.id}`} >{item['name_en']}</Link>
        </li>
    )
    }
)
)


export default sidebar

