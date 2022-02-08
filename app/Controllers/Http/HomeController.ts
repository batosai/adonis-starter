import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import parser from '@deskeen/markdown'
import fs from 'fs'

const readme = fs.readFileSync(`readme.md`)

export default class HomeController {
  public async index({ view }: HttpContextContract) {
    return view.render('home/index', {
      content: parser.parse(readme).innerHTML,
    })
  }
}
