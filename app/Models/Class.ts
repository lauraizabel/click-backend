import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Teacher from 'App/Models/Teacher'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public number: number

  @column()
  public maxStudents: number

  @column()
  public disponibility: boolean

  @column()
  public teacherId: number

  @belongsTo(() => Teacher)
  public teacher: BelongsTo<typeof Teacher>
}
