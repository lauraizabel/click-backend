import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'class_student'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('class_id').unsigned().notNullable().references('id').inTable('class')
      table.integer('student_id').unsigned().notNullable().references('id').inTable('students')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
