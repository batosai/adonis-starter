import execa from 'execa'
import { BaseCommand, args } from '@adonisjs/core/build/standalone'

export default class MakeScaffold extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:scaffold'

  @args.string({ description: 'Name of the controller and model class' })
  public name: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description =
    'Make a new HTTP controller / Lucid model / view template'

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
    await execa.node('ace', ['make:controller', this.name], {
      stdio: 'inherit',
    })
    await execa.node('ace', ['make:model', this.name], {
      stdio: 'inherit',
    })
    await execa.node('ace', ['make:view', this.name], {
      stdio: 'inherit',
    })
  }
}
