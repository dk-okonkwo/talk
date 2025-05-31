import bmOne from '@/assets/images/bmw1.jpeg'
import bmTwo from '@/assets/images/bmw2.jpg'
import bmThree from '@/assets/images/greybm.jpeg'
import red from '@/assets/images/vintage-red.jpg'
import yellow from '@/assets/images/vintage-yellow.jpg'
import headshot from '@/assets/images/headshot.jpg'

export interface TopProductDetail {
  imgUrl: string
  discount: number
  name: string
  review: number
}

export const productDetails: TopProductDetail[] = [
  {
    imgUrl: bmOne,
    discount: 0.3,
    name: 'BMW M4',
    review: 4.1,
  },
  {
    imgUrl: bmTwo,
    discount: 0.5,
    name: 'BMW M5',
    review: 4.7,
  },
  {
    imgUrl: bmThree,
    discount: 0,
    name: 'Mercedes C Class',
    review: 4.5,
  },
  {
    imgUrl: red,
    discount: 0.3,
    name: 'Ford Mustang',
    review: 4.0,
  },
  {
    imgUrl: yellow,
    discount: 0.4,
    name: 'Lada 2101 Series',
    review: 3.7,
  },
]

export interface UserReview {
  imgUrl: string
  desc: string
  name: string
  review: number
}

export const userReviews: UserReview[] = [
  {
    imgUrl: headshot,
    desc: 'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'Mike Taylor',
    review: 4.5,
  },
  {
    imgUrl: headshot,
    desc: 'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'Chris Thomas',
    review: 4.2,
  },
  {
    imgUrl: headshot,
    desc: 'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'James Doe',
    review: 3.9,
  },
  {
    imgUrl: headshot,
    desc: 'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'Johnny Davis',
    review: 3.9,
  },
  {
    imgUrl: headshot,
    desc: 'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'Julius Berger',
    review: 3.9,
  },
  {
    imgUrl: headshot,
    desc: 'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'Resse Witherspoon',
    review: 3.9,
  },
  {
    imgUrl: headshot,
    desc: 'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.',
    name: 'Steven Seagal',
    review: 3.9,
  },
]
