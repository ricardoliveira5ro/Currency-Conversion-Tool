import Image from 'next/image'
import '../styles/styles.css'

export default function Home() {
  return (
    <>
    <header className='header'>
      <div className='header-name'>
        <h1>curren</h1>
        <p>See</p>
      </div>
      <div className='header-side'>
        <Image
          src="/github-sign.svg"
          alt="GitHub Logo"
          width={40}
          height={10}
          priority
        />
        <div className='header-feedback'>
          <p>Feedback</p>
        </div>
      </div>
    </header>
    <main>

    </main>
    </>
  )
}
