
const EventBanner = () => {
  return (
    <section className="space-y-3">
      <h1 className="text-xl font-medium tracking-wide">News, Events</h1>
      <div >
        <div className='relative w-full rounded-lg overflow-hidden max-h-42'>
          <img
            src='/images/event.png'
            alt='event'
            className='w-full h-full object-cover '
          />
          <div className='absolute bottom-4 left-4 flex gap-4 text-[10px] text-white border border-white/30 backdrop-blur-md bg-black/10 rounded-lg p-2'>
            <div>
              <p>Time remaining</p>
              <p>13h : 12m : 23s</p>
            </div>
            <div>
              <p>Entrance Fee</p>
              <p>N5,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventBanner