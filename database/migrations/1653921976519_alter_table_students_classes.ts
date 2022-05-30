import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'class_student'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['class_id', 'student_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
