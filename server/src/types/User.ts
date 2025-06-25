export interface UserResetPassword {
  password: string
  confirmPassword: string

}
interface RawUser extends Pick<UserResetPassword, "password"> {
  id: number
  email: string


}
export interface UserDB extends RawUser {
  created_at: Date
  updated_at: Date
}




export class User {
  id: number
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  constructor({ id, email, password, created_at, updated_at }: UserDB) {
    this.id = id
    this.email = email
    this.password = password
    this.createdAt = created_at
    this.updatedAt = updated_at
  }
  userWithoutPass() {
    return { ...this, password: "******" }
  }


}


