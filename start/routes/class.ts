import Route from '@ioc:Adonis/Core/Route'

Route.get('/class', 'ClassController.getAll')
Route.post('/class', 'ClassController.create')
Route.get('/class/:id', 'ClassController.getOne')
Route.put('/class/:id', 'ClassController.edit')
Route.delete('/class/:id', 'ClassController.delete')
