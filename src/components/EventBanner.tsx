import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";


const eventDetails = [
  {
    timeRemaining: '13h : 12m : 23s',
    entranceFee: 'N5,000',
    imageUrl: '/images/event.png',
  },
  {
    timeRemaining: '10h : 45m : 12s',
    entranceFee: 'N3,000',
    imageUrl: '/images/event.png',
  },
  {
    timeRemaining: '5h : 30m : 45s',
    entranceFee: 'N1,500',
    imageUrl: '/images/event.png',
  }
]
const EventBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const router = useRouter()
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventDetails.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? eventDetails.length - 1 : prevIndex - 1
    );
  };

  const fetchEvents = async () =>{
      const accessToken = Cookies.get('access_token')
    
    if (!accessToken) {
      router.navigate({ to: '/login' })
      return
    }
      const datares = await axios.get(
      'https://talk-l955.onrender.com/api/v1/events/events',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    console.log('all events',datares.data.results)
    // const allEventsInfo = datares.data.results

  }
  // Autoplay
  useEffect(()=>{
    fetchEvents()
  },[])
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle touch
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      // Swiped left
      nextSlide();
    } else if (distance < -50) {
      // Swiped right
      prevSlide();
    }
  };

  return (
    <section className="space-y-3">
      <h1 className="text-lg font-medium tracking-wide">News & Events</h1>
      <div
        className="relative overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <div 
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {
            eventDetails.map((event, index) => (
              <div key={index} className='relative w-full flex-shrink-0 rounded-lg overflow-hidden max-h-42 lg:max-h-60'>
                <img
                  src={event.imageUrl}
                  alt='event'
                  className='w-full h-full object-cover '
                />
                <div className='absolute bottom-4 left-4 flex gap-4 text-xs text-white border border-white/30 backdrop-blur-md bg-black/10 rounded-lg p-2'>
                  <div>
                    <p>Time remaining</p>
                    <p>{event.timeRemaining}</p>
                  </div>
                  <div>
                    <p>Entrance Fee</p>
                    <p>{event.entranceFee}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {eventDetails.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`size-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-main' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default EventBanner