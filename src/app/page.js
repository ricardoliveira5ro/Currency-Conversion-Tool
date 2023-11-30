"use client";

import Image from 'next/image'
import '../styles/styles.css'
import '../styles/media-queries.css'
import { getCurrentDateAndTime } from '../utils/globalFunctions'
import { Currencies, Convert, Rates } from '../utils/api';
import { useState, useEffect, useRef } from 'react';


export default function Home() {
  const { date, time } = getCurrentDateAndTime();
  const [currencies, setCurrencies] = useState([]);

  const [isConverted, setIsConverted] = useState(false);
  const [baseRate, setBaseRate] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetRate, setTargetRate] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(0);
  
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
  const amountInput = useRef(null);
  const convertedAmountInput = useRef(null);

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

  const isCurrency = (code) => {
    return currencies.find((currency) => currency.code === code.toUpperCase());
  };

  const handleCurrencyInputChange = (value, inputType) => {
    const inputValue = value.toUpperCase();

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

  const swapCurrencies = () => {
    let baseCurrency = baseCurrencyInput.current.value;
    let targetCurrency = targetCurrencyInput.current.value;

    if (baseCurrency && targetCurrency && isCurrency(baseCurrency) && isCurrency(targetCurrency)) {
      handleCurrencyInputChange(targetCurrency, 'base')
      handleCurrencyInputChange(baseCurrency, 'target')

      upperCaseInputs(targetCurrency, baseCurrency);
    }
  }

  const convert = () => {
    let baseCurrency = baseCurrencyInput.current.value.toUpperCase();
    let targetCurrency = targetCurrencyInput.current.value.toUpperCase();
    let amount = amountInput.current.value;

    if (baseCurrency && targetCurrency && isCurrency(baseCurrency) && isCurrency(targetCurrency) && amount && amount > 0) {
      Convert(baseCurrency, targetCurrency, amount)
        .then((data) => {
          if (data) {
            var convertedAmount = parseFloat(data.convertedAmount).toFixed(3).replace(/\.?0*$/, '');
            convertedAmountInput.current.value = convertedAmount;
            setConvertedAmount(convertedAmount);

            setTargetCurrency(data.targetCurrency);
            setTargetRate(data.exchangeRate);
            setBaseCurrency(data.baseCurrency);
            reverseExchangeRate(baseCurrency, targetCurrency);

            upperCaseInputs(baseCurrency, targetCurrency);
          }
        });
    }
  };

  const reverseExchangeRate = (baseCurrency, targetCurrency) => {
    Rates(targetCurrency)
      .then((data) => {
        if (data) {
          setBaseRate(data.rates[baseCurrency])
          setIsConverted(true);
        }
      });
  };

  const upperCaseInputs = (baseCurrency, targetCurrency) => {
    baseCurrencyInput.current.value = baseCurrency.toUpperCase();
    targetCurrencyInput.current.value = targetCurrency.toUpperCase();
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
          <a href="https://github.com/ricardoliveira5ro" target="_blank" rel="noopener noreferrer">
            <Image
              src="/github-sign.svg"
              alt="GitHub Logo"
              width={44}
              height={10}
              className='github-image'
              priority
            />
          </a>
          <a className='header-feedback' href="https://forms.gle/nG5exnnSw4by44PR7" target="_blank" rel="noopener noreferrer">
            <Image
              src="/star.svg"
              alt="Star icon"
              width={17}
              height={5}
              className='feedback-image'
              priority
            />
            <p>Feedback</p>
          </a>
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

          <div className='main-white-container'>
              <div className='main-white-container-top'>
                  <div className='main-top-group'>
                    <div className='label-input mr-8'>
                      <label>Amount</label>
                      <input ref={amountInput} type="number" placeholder='500.00'></input>
                      <hr></hr>
                    </div>
                    <div className='label-input'>
                      <label>Base Currency</label>
                      <div className='select-currency'>
                        <input ref={baseCurrencyInput} onChange={(e) => handleCurrencyInputChange(e.target.value, 'base')}></input>
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
                  </div>                  
                  <Image
                    src="/exchange.svg"
                    alt="Exchange icon"
                    width={60}
                    height={20}
                    className='exchange-image'
                    priority
                    onClick={swapCurrencies}
                  />
                  <div className='main-top-group'>
                    <div className='label-input mr-8'>
                      <label>Amount</label>
                      <input ref={convertedAmountInput} readOnly></input>
                      <hr></hr>
                    </div>
                    <div className='label-input'>
                      <label>Target Currency</label>
                      <div className='select-currency'>
                        <input ref={targetCurrencyInput} onChange={(e) => handleCurrencyInputChange(e.target.value, 'target')}></input>
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
              </div>

              <div className='main-white-container-middle'>
                <div className='rates-convert'>
                  <div className='exchange-rates'>
                    { isConverted ?
                      ( <>
                        <p>1 {baseCurrency} = {targetRate} {targetCurrency}</p>
                        <p>1 {targetCurrency} = {baseRate} {baseCurrency}</p>
                      </> ) : null
                    }
                  </div>
                  <button onClick={convert}>Convert</button>
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
                  <div className='disclamer-info'>
                    <p>Please note that currency exchange rates are subject to fluctuations and may vary from the rates displayed here.</p>
                    <p>Exchange rates displayed were last updated on {date} at {time}.</p>
                  </div>
                </div>
              </div>
          </div>
      </main>
    </section>
    </>
  )
}