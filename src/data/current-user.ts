import headshot from '../assets/images/usrimg.jpg'

export interface user {
  imgUrl: string
  firstName: string
  lastName: string
}

export const currentUser: user = {
  imgUrl: headshot,
  firstName: 'Josh',
  lastName: 'Smith',
}
