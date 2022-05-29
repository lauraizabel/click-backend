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
    console.log(payload)
    const student: Student = await Student.create(payload)
    return response.created(student)
  }
}
