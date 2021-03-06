import Route from '@ioc:Adonis/Core/Route'

Route.get('/teacher', 'TeacherController.getAll')
Route.post('/teacher', 'TeacherController.create')
Route.get('/teacher/:id', 'TeacherController.getOne')
Route.put('/teacher/:id', 'TeacherController.edit')
Route.delete('/teacher/:id', 'TeacherController.delete')

Route.post('/teacher/:id/student-to-class', 'TeacherController.insertStudentOnClass')
Route.delete('/teacher/:id/student-to-class', 'TeacherController.removeStudentOnClass')
