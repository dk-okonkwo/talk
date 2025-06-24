import sh1 from '../assets/images/itemImages/shoes_1.jpg'
import sh2 from '../assets/images/itemImages/shoes_2.jpg'
import sh3 from '../assets/images/itemImages/shoes_3.jpg'
import sh4 from '../assets/images/itemImages/shoes_4.jpg'
import sh5 from '../assets/images/itemImages/shoes_5.jpg'

export interface drawerReview {
  reviewerImg: string
  reviewerName: string
  description: string
  rating: number
}

const reviewDesc =
  'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.'

export const drawerReviews: drawerReview[] = [
  {
    reviewerImg: sh1,
    reviewerName: 'John Doe',
    description: reviewDesc,
    rating: 4.5,
  },
  {
    reviewerImg: sh2,
    reviewerName: 'John Doe',
    description: reviewDesc,
    rating: 4.5,
  },
  {
    reviewerImg: sh3,
    reviewerName: 'John Doe',
    description: reviewDesc,
    rating: 4.5,
  },
  {
    reviewerImg: sh4,
    reviewerName: 'John Doe',
    description: reviewDesc,
    rating: 4.5,
  },
  {
    reviewerImg: sh5,
    reviewerName: 'John Doe',
    description: reviewDesc,
    rating: 4.5,
  },
]
