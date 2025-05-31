import TalkEvent from './TalkEvent'
// image, title, date, time, fee, description

import { allEvents } from '@/data/events'

function Events() {
  return (
    <div className="mt-2 flex flex-col sm:!flex-row sm:!flex-wrap items-center gap-5  self-center sm:justify-center">
      {allEvents.map((ev, index) => (
        <TalkEvent
          key={index}
          img={ev.img}
          title={ev.title}
          date={ev.date}
          time={ev.time}
          entry={ev.entry}
          desc={ev.description}
        />
      ))}
    </div>
  )
}

export default Events
