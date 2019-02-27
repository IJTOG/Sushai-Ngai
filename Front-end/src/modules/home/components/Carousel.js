import React from 'react'
import { UncontrolledCarousel } from 'reactstrap'
import Sushi1 from '../../../asset/Corousel/sushi1.jpg'
import Sushi2 from '../../../asset/Corousel/sushi2.jpg'
import Sushi3 from '../../../asset/Corousel/sushi3.jpg'

const Promotion = [
	{
		src: Sushi1,
		altText: 'PROMOTION',
		caption: '',
		header: 'Fresh'
	},
	{
		src: Sushi2,
		altText: 'PROMOTION 2',
		caption: '',
		header: 'High quility'
	},
	{
		src: Sushi3,
		altText: 'PROMOTION 3',
		caption: '',
		header: 'Yummy!!'
	}
]
  
export default () => <UncontrolledCarousel items={Promotion} />
  
