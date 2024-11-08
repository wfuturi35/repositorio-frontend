import { $enum } from 'ts-enum-util'

import { Role } from '../../auth/auth.enum'

export interface IName {
  first: string
  middle: string
  last: string
}

export interface IUser {
  id: number
  email: string
  //password: string
  //dateOfBirth: Date | null | string
  age: number
  fullName: IName
  phone: string
  city: string
  gender: string
  photo: string
  accountLocked: boolean
  accountActive: boolean
  role?: Role | string
}

export class User implements IUser {
  constructor(
    // tslint:disable-next-line: variable-name
    public id = 0,
    public email = '',
    //public password ='',
    //public dateOfBirth: Date | null = null,
    public age =  0,
    public fullName = { first: '', middle: '', last: '' } as IName,
    public phone = '',
    public city= '',
    public gender= '',
    public photo = '',
    public accountLocked = false,
    public accountActive = true,
    public role = Role.User,

  ) {}

  static Build(user: IUser) {
    /*if (!user) {
      return new User()
    }*/

    return new User(
      user.id,
      user.email,
      //user.password,
    //typeof user.dateOfBirth === 'string' ? new Date(user.dateOfBirth): user.dateOfBirth,
      user.age,
      user.fullName,
      user.phone,
      user.city,
      user.gender,
      user.photo,
      user.accountLocked,
      user.accountActive,
      $enum(Role).asValueOrDefault(user.role, Role.User),
    )
  }

  public get fullNameFunction(): string {
    if (!this.fullName) {
      return ''
    }
    if (this.fullName.middle) {
      return `${this.fullName.first} ${this.fullName.middle} ${this.fullName.last}`
    }
    return `${this.fullName.first} ${this.fullName.last}`
  }

  toJSON(): object {
    const serialized = Object.assign(this)
    delete serialized._id
    delete serialized.fullName
    return serialized
  }
}
