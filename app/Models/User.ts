import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeCreate,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'
import {
  attachment,
  AttachmentContract,
} from '@ioc:Adonis/Addons/AttachmentLite'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  // Columns

  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column.dateTime({ autoCreate: false })
  public disabledOn: DateTime

  @attachment({ folder: 'avatars', preComputeUrl: true })
  public avatar: AttachmentContract | null

  @column()
  public blocked: boolean

  @column()
  public rememberMeToken?: string | null

  @column.dateTime({ autoCreate: false })
  public lastLoginAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Getters

  get isAdmin() {
    return this.role === 'admin'
  }

  get isMember() {
    return this.role === 'member'
  }

  // Hooks

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
