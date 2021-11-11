import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.string('id').primary()

      table.string('username', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('email')
      table.string('role')
      table.timestamp('disabled_on', { useTz: true })
      table.string('avatar')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('last_login_at', { useTz: true })
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
