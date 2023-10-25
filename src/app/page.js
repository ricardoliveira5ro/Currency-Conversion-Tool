"use client";

import Image from 'next/image'
import '../styles/styles.css'
import { getCurrentDateAndTime } from '../utils/globalFunctions'
import { Currencies } from '../utils/api';
import { useState, useEffect } from 'react';


export default function Home() {
  const { date, time } = getCurrentDateAndTime();
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    Currencies()
      .then((data) => {
        if (data) {
          const currencyList = Object.entries(data).map(([code, name]) => ({
            code,
            name,
          }));
          setCurrencies(currencyList);
          console.log(currencyList)
        }
      });
  }, []);

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

        <form className='w-full'>
          <div className='main-white-container'>
              <div className='main-white-container-top'>
                  <div className='label-input mr-8'>
                    <label>Amount</label>
                    <input type="number" placeholder='500.00'></input>
                    <hr></hr>
                  </div>
                  <div className='label-input'>
                    <label>Base Currency</label>
                    <div className='select-currency'>
                      <input></input>
                      <Image
                        src="/globe.png"
                        alt="Globe icon"
                        width={25}
                        height={10}
                        className='currency'
                        priority
                      />
                    </div>
                    <hr></hr>
                  </div>
                  <a>
                    <Image
                        src="/exchange.svg"
                        alt="Exchange icon"
                        width={60}
                        height={20}
                        className='exchange-image'
                        priority
                    />
                  </a>
                  <div className='label-input mr-8'>
                    <label>Amount</label>
                    <input></input>
                    <hr></hr>
                  </div>
                  <div className='label-input'>
                    <label>Target Currency</label>
                    <div className='select-currency'>
                      <input></input>
                      <Image
                        src="/globe.png"
                        alt="Globe icon"
                        width={25}
                        height={10}
                        className='currency'
                        priority
                      />
                    </div>
                    <hr></hr>
                  </div>
              </div>

              <div className='main-white-container-middle'>
                <div className='rates-convert'>
                  <div className='exchange-rates'>
                    <p>1 USD = 18.1194 MXN</p>
                    <p>1 MXN = 0.0551924 USD</p>
                  </div>
                  <button>Convert</button>
                </div>
                <hr></hr>
              </div>

              <div className='main-white-container-bottom'>
                <div className='disclaimer'>
                  <Image
                    src="/exclamation-mark.png"
                    alt="Select icon"
                    width={20}
                    height={10}
                    priority
                  />
                  <div className='flex flex-col'>
                    <p>Please note that currency exchange rates are subject to fluctuations and may vary from the rates displayed here.</p>
                    <p>Exchange rates displayed were last updated on {date} at {time}.</p>
                  </div>
                </div>
              </div>
          </div>
        </form>
      </main>
    </section>
    </>
  )
}