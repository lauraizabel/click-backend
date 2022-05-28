import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Class from 'App/Models/Class'

export default class Teacher extends BaseModel {
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

  @hasMany(() => Class)
  public classes: HasMany<typeof Class>
}
