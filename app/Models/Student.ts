import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Class from 'App/Models/Class'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public email: string

  @column.dateTime()
  public birthdate: DateTime

  @column()
  public registration: string

  @manyToMany(() => Class, {
    pivotTable: 'class_student',
    pivotColumns: ['class_id', 'student_id', 'id'],
  })
  public classes: ManyToMany<typeof Class>
}
