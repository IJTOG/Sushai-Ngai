var axios = require('axios')

axios.get('https://nodejs-218811.appspot.com/api/products/1').then(d =>console.log(d.data.product))