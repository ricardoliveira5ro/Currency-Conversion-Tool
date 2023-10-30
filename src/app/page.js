"use client";

import Image from 'next/image'
import '../styles/styles.css'
import { getCurrentDateAndTime } from '../utils/globalFunctions'
import { Currencies } from '../utils/api';
import { useState, useEffect, useRef } from 'react';


export default function Home() {
  const { date, time } = getCurrentDateAndTime();
  const [currencies, setCurrencies] = useState([]);
  
  const [isActiveBase, setIsActiveBase] = useState(false);
  const [selectedValueBase, setSelectedValueBase] = useState('');
  const [selectedImageBase, setSelectedImageBase] = useState('');
  const [selectedAltBase, setSelectedAltBase] = useState('');

  const toggleDropdownBase = () => {
    setIsActiveBase(!isActiveBase);
  };

  const selectOptionBase = (value, imageUrl, code) => {
    setSelectedValueBase(value);
    setSelectedImageBase(imageUrl);
    setSelectedAltBase(code);
    setIsActiveBase(false);

    baseCurrencyInput.current.value = code;
  };

  const [isActiveTarget, setIsActiveTarget] = useState(false);
  const [selectedValueTarget, setSelectedValueTarget] = useState('');
  const [selectedImageTarget, setSelectedImageTarget] = useState('');
  const [selectedAltTarget, setSelectedAltTarget] = useState('');

  const toggleDropdownTarget = () => {
    setIsActiveTarget(!isActiveTarget);
  };

  const selectOptionTarget = (value, imageUrl, code) => {
    setSelectedValueTarget(value);
    setSelectedImageTarget(imageUrl);
    setSelectedAltTarget(code);
    setIsActiveTarget(false);

    targetCurrencyInput.current.value = code;
  };

  const baseCurrencyInput = useRef(null);
  const targetCurrencyInput = useRef(null);

  useEffect(() => {
    Currencies()
      .then((data) => {
        if (data) {
          const currencyList = Object.entries(data).map(([code, name]) => {
            const imageSrc = `/currencies/${code}.png`;
  
            return {
              code,
              name,
              imageSrc
            };
          });
          
          setCurrencies(currencyList);
        }
      });
  }, []);

  const handleCurrencyInputChange = (e, inputType) => {
    const inputValue = e.target.value;

    const selectedValueState =
      inputType === 'base' ? setSelectedValueBase : setSelectedValueTarget;
    const selectedImageState =
      inputType === 'base' ? setSelectedImageBase : setSelectedImageTarget;
    const selectedAltState =
      inputType === 'base' ? setSelectedAltBase : setSelectedAltTarget;

    const selectedCurrency = currencies.find(
      (currency) => currency.code === inputValue
    );
    
    if (selectedCurrency) {
      selectedValueState(selectedCurrency.code);
      selectedImageState(selectedCurrency.imageSrc);
      selectedAltState(selectedCurrency.code);
    
    } else {
      selectedValueState('Globe icon');
      selectedImageState('/globe.png');
      selectedAltState('Globe icon');
    }
  };

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
                      <input ref={baseCurrencyInput} onChange={(e) => handleCurrencyInputChange(e, 'base')}></input>
                      <div className="dropdown dropdown--image" value={selectedValueBase}>
                        <div className="dropdown__select" onClick={toggleDropdownBase}>
                          <div className="dropdown__select-wrap">
                            <Image
                              src={selectedImageBase || "/globe.png"}
                              alt={selectedAltBase || "Globe icon"}
                              width={42}
                              height={15}
                              className='currency'
                              priority
                            />
                          </div>
                        </div>
                        <div className={`dropdown__options-wrap ${isActiveBase ? 'active' : ''}`}>
                          {currencies.map((currency) => (
                            <div
                              key={currency.code}
                              className="dropdown__option"
                              onClick={() => selectOptionBase(currency.code, currency.imageSrc, currency.code)}
                            >
                              <Image
                                src={currency.imageSrc}
                                alt={currency.code}
                                width={42}
                                height={15}
                                className='currency'
                                priority
                                data-value={currency.code}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
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
                      <input ref={targetCurrencyInput} onChange={(e) => handleCurrencyInputChange(e, 'target')}></input>
                      <div className="dropdown dropdown--image" value={selectedValueTarget}>
                        <div className="dropdown__select" onClick={toggleDropdownTarget}>
                          <div className="dropdown__select-wrap">
                            <Image
                              src={selectedImageTarget || "/globe.png"}
                              alt={selectedAltTarget || "Globe icon"}
                              width={42}
                              height={15}
                              className='currency'
                              priority
                            />
                          </div>
                        </div>
                        <div className={`dropdown__options-wrap ${isActiveTarget ? 'active' : ''}`}>
                          {currencies.map((currency) => (
                            <div
                              key={currency.code}
                              className="dropdown__option"
                              onClick={() => selectOptionTarget(currency.code, currency.imageSrc, currency.code)}
                            >
                              <Image
                                src={currency.imageSrc}
                                alt={currency.code}
                                width={42}
                                height={15}
                                className='currency'
                                priority
                                data-value={currency.code}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
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