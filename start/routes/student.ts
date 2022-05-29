import Route from '@ioc:Adonis/Core/Route'

Route.get('/student', 'StudentController.getAll')
Route.post('/student', 'StudentController.create')
Route.get('/student/:id', 'StudentController.getOne')
Route.put('/student/:id', 'StudentController.edit')
