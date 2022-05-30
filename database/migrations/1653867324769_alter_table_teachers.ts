import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'teacher'

  public async up() {
    this.schema.renameTable(this.tableName, 'teachers')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
