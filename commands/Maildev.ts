import { BaseCommand } from '@adonisjs/core/build/standalone'
import MailDev from 'maildev'

export default class Maildev extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'maildev'
  public static description = 'Start the maildev'

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
    stayAlive: true,
  }

  public async run() {
    const maildev = new MailDev()
    maildev.listen()
  }
}
