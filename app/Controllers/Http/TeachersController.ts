import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async getAll({ response }: HttpContextContract) {
    const teacher = await Teacher.all()
    return response.ok(teacher)
  }

  public async create({ request, response }: HttpContextContract) {
    const teacherSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255), rules.required()]),
      email: schema.string({ trim: true }, [rules.email(), rules.required()]),
      birthdate: schema.date(),
      registration: schema.string({ escape: false, trim: true }, [
        rules.maxLength(16),
        rules.required(),
      ]),
    })

    const payload: any = await request.validate({ schema: teacherSchema })
    const teacher: Teacher = await Teacher.create(payload)
    return response.created(teacher)
  }

  public async edit({ response, params, request }: HttpContextContract) {
    const { id }: { id: Number } = params

    await Teacher.findByOrFail('id', id)

    const teacherSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255), rules.required()]),
      email: schema.string({ trim: true }, [rules.email(), rules.required()]),
      birthdate: schema.date(),
      registration: schema.string({ escape: false, trim: true }, [
        rules.maxLength(16),
        rules.required(),
      ]),
    })

    const payload: any = await request.validate({ schema: teacherSchema })
    const teacher: Teacher = await Teacher.updateOrCreate({ id }, payload)
    return response.created(teacher)
  }

  public async getOne({ response, params }: HttpContextContract) {
    const { id }: { id: Number } = params
    const teacher = await Teacher.findByOrFail('id', id)

    return response.ok(teacher)
  }
}
