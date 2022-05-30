import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'class'

  public async up() {
    this.schema.renameTable(this.tableName, 'classes')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
