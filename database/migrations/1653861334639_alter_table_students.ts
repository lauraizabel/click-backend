import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'student'

  public async up() {
    this.schema.renameTable(this.tableName, 'students')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
