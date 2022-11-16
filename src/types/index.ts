import { ObjectId } from "mongoose"

export interface UserInterface {
  given_name: string,
  family_name: string,
  email: string,
  googleId?: string
  facebookId?: string
}

export interface UserResponse extends UserInterface {
  _id: string | ObjectId, 
  __v: number
}


export interface GoogleProfile{
  provider: string
  sub: string
  id: string
  displayName: string
  name: Name
  given_name: string
  family_name: string
  email_verified: boolean
  verified: boolean
  language: string
  email: string
  emails: Email[]
  photos: Photo[]
  picture: string
}

export interface Name {
  givenName: string
  familyName: string
}

export interface Email {
  value: string
  type: string
}

export interface Photo {
  value: string
  type: string
}
