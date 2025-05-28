import evOne from '../assets/images/events/event1.png'
import evTwo from '../assets/images/events/event2.png'
import evThree from '../assets/images/events/event3.png'
import evFour from '../assets/images/events/event4.png'
import evFive from '../assets/images/events/event5.png'

export interface MainEvent {
  id: number
  img: string
  title: string
  date: string
  time: string
  entry: string
  description: string
}

export const allEvents: MainEvent[] = [
  {
    id: 1,
    img: evOne,
    title: 'Soccer Tournament',
    date: 'Friday - 17/08',
    time: '9:30am',
    entry: 'Free',
    description:
      'Event Description. Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunti.',
  },
  {
    id: 2,
    img: evTwo,
    title: 'Semi Finals - Swimming',
    date: 'Saturday - 19/09',
    time: '9:30am',
    entry: 'Free',
    description:
      'Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.',
  },
  {
    id: 3,
    img: evThree,
    title: 'Gymnastics Competitions',
    date: 'Sunday - 21/03',
    time: '9:30am',
    entry: 'Free',
    description:
      'Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.',
  },
  {
    id: 4,
    img: evFour,
    title: 'Judo - Training',
    date: 'Wednesday - 21/08',
    time: '12:30pm',
    entry: 'Free',
    description:
      'Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.',
  },
  {
    id: 5,
    img: evFive,
    title: 'Fit Dance in the sqaure',
    date: 'Teusday - 22/03',
    time: '8:00am',
    entry: 'Free',
    description:
      'Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem. ',
  },
]
