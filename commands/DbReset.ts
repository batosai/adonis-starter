import execa from 'execa'
import { BaseCommand } from '@adonisjs/core/build/standalone'
import Application from '@ioc:Adonis/Core/Application'

export default class DbReset extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'db:reset'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Drop database and execute seed'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Remove tmp/uploads')
    console.log('')

    // Remove upload dir
    await execa('rm', ['-rf', Application.tmpPath('uploads')], {
      stdio: 'inherit',
    })

    await execa.node('ace', ['migration:rollback'], {
      stdio: 'inherit',
    })
    await execa.node('ace', ['migration:run'], {
      stdio: 'inherit',
    })
    await execa.node('ace', ['db:seed'], {
      stdio: 'inherit',
    })
  }
}
