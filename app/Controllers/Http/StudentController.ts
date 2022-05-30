import Student from 'App/Models/Student'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StudentController {
  public async getAll({ response }: HttpContextContract) {
    const students = await Student.all()
    return response.ok(students)
  }

  public async create({ request, response }: HttpContextContract) {
    const studentSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255), rules.required()]),
      email: schema.string({ trim: true }, [rules.email(), rules.required()]),
      birthdate: schema.date(),
      registration: schema.string({ escape: false, trim: true }, [
        rules.maxLength(16),
        rules.required(),
      ]),
    })

    const payload: any = await request.validate({ schema: studentSchema })
    const student: Student = await Student.create(payload)
    return response.created(student)
  }

  public async edit({ response, params, request }: HttpContextContract) {
    const { id }: { id: Number } = params

    await Student.findByOrFail('id', id)

    const studentSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255), rules.required()]),
      email: schema.string({ trim: true }, [rules.email(), rules.required()]),
      birthdate: schema.date(),
      registration: schema.string({ escape: false, trim: true }, [
        rules.maxLength(16),
        rules.required(),
      ]),
    })

    const payload: any = await request.validate({ schema: studentSchema })
    const student: Student = await Student.updateOrCreate({ id }, payload)
    return response.created(student)
  }

  public async getOne({ response, params }: HttpContextContract) {
    const { id }: { id: Number } = params
    const student = await Student.findByOrFail('id', id)
    await student.load('classes')

    return response.ok(student)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id }: { id: Number } = params
    const student = await Student.findByOrFail('id', id)
    await student.delete()

    return response.ok({ message: 'Successfully deleted' })
  }
}
