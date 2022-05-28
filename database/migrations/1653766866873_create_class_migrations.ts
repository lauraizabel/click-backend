import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'class'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.boolean('disponibility').notNullable().defaultTo(true)
      table.integer('max_students').notNullable().defaultTo(0)
      table.integer('number').notNullable().defaultTo(0)

      table.integer('teacher_id').unsigned().references('teacher.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
