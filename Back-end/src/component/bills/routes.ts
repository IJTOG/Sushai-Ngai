import controllers from './controllers'
export function setup(router){
    router
      .get('/',controllers.getAll)
      .get('/:id',controllers.getById)
      .post('/create',controllers.create)
      .put('/edit/:id',controllers.editById)
      .delete('/delete/:id',controllers.deleteById)
      .get('/query/:id',controllers.queryBill)
      .get('/status/:status',controllers.queryBillStatus)

}