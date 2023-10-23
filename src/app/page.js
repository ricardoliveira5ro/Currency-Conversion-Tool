import Image from 'next/image'
import '../styles/styles.css'
import { getCurrentDateAndTime } from '../utils/globalFunctions'

export default function Home() {
  const { date, time } = getCurrentDateAndTime();

  return (
    <>
    <section className='page'>
      <header className='header'>
        <div className='header-name'>
          <h1>curren</h1>
          <p>See</p>
        </div>
        <div className='header-side'>
          <Image
            src="/github-sign.svg"
            alt="GitHub Logo"
            width={44}
            height={10}
            priority
          />
          <div className='header-feedback'>
            <Image
              src="/star.svg"
              alt="Star icon"
              width={17}
              height={5}
              priority
            />
            <p>Feedback</p>
          </div>
        </div>
      </header>
      <main className='main'>
        <div className='main-header'>
          <div className='main-title'>
            <h1>Currency conversion tool</h1>
            <h3>Check live currency exchange rates</h3>
          </div>
          <div className='main-date'>
            <Image
                src="/calendar.svg"
                alt="Calendar icon"
                width={45}
                height={10}
                className='rounded-lg'
                priority
            />
            <p className='main-date-date'>{date}</p>
            <p className='main-date-time'>{time}</p>
            <hr></hr>
          </div>
        </div>
      </main>
    </section>
    </>
  )
}