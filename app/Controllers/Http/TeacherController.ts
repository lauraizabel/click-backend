import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import Class from 'App/Models/Class'
import Student from 'App/Models/Student'

import Teacher from 'App/Models/Teacher'

export default class TeacherController {
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

  public async delete({ response, params }: HttpContextContract) {
    const { id }: { id: Number } = params
    const teacher = await Teacher.findByOrFail('id', id)
    await teacher.delete()

    return response.ok({ message: 'Successfully deleted' })
  }

  public async insertStudentOnClass({ response, request, params }: HttpContextContract) {
    const { id }: { id: Number } = params

    const findedTeacher = await Teacher.findByOrFail('id', id)

    const StudentClassSchema = schema.create({
      studentId: schema.number(),
      classId: schema.number(),
    })

    const payload: any = await request.validate({ schema: StudentClassSchema })

    const findedClass = await Class.findByOrFail('id', payload.classId)
    const findedStudent = await Student.findByOrFail('id', payload.studentId)
    const actualCapacity = (
      await Database.query()
        .from('class_student')
        .select('*')
        .where((q) => q.where('class_id', findedClass.id))
    ).length

    if (actualCapacity >= findedClass.maxStudents) {
      return response.badRequest({ error: 'max capacity' })
    }

    if (findedClass.teacherId !== findedTeacher.id) {
      return response.badRequest({ error: 'teacher is not the creator of the class' })
    }

    if (!findedClass.disponibility) {
      return response.badRequest({ error: "the class doesn't have disponibility" })
    }

    await findedStudent.related('classes').attach([findedClass.id])

    return response.ok({ msg: 'ok' })
  }
}
