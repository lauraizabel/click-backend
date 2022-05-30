import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import { schema } from '@ioc:Adonis/Core/Validator'
import Teacher from 'App/Models/Teacher'

export default class ClassController {
  public async getAll({ response }: HttpContextContract) {
    const classes = await Class.all()
    return response.ok(classes)
  }

  public async create({ request, response }: HttpContextContract) {
    const teacherId = request.body().teacher_id
    const teacher = await Teacher.findByOrFail('id', teacherId)

    const classSchema = schema.create({
      number: schema.number(),
      disponibility: schema.boolean(),
      maxStudents: schema.number(),
    })

    const payload: any = await request.validate({ schema: classSchema })
    const createdClass: Class = new Class()

    createdClass.number = payload.number
    createdClass.disponibility = payload.disponibility
    createdClass.maxStudents = payload.maxStudents

    await teacher.related('classes').save(createdClass)
    return response.created(createdClass)
  }

  public async edit({ response, params, request }: HttpContextContract) {
    const { id }: { id: Number } = params

    const classSchema = schema.create({
      number: schema.number(),
      email: schema.number(),
      disponibility: schema.boolean(),
      teacher_id: schema.number(),
    })

    const findedClass = await Class.findByOrFail('id', id)

    if (findedClass.teacherId !== request.body().teacher_id) {
      return response.badRequest({ error: 'teacher is not the creator of the class' })
    }

    const payload: any = await request.validate({ schema: classSchema })
    const createdClass: Class = await Class.updateOrCreate({ id }, payload)
    return response.created(createdClass)
  }

  public async getOne({ response, params }: HttpContextContract) {
    const { id }: { id: Number } = params
    const findedClass = await Class.findByOrFail('id', id)

    return response.ok(findedClass)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id }: { id: Number } = params
    const findedClass = await Class.findByOrFail('id', id)
    await findedClass.delete()

    return response.ok({ message: 'Successfully deleted' })
  }
}
