import React, { useState } from 'react';
import "./App.css";
import currencyData from './currency.json'
import { Button, Form } from 'antd';
import PriceInput from './components/PriceInput';
import { ICurrencyList } from './model/commons';

export default function App () {
    const [data, setData] = useState<ICurrencyList[]>(currencyData)
    const [loading, setLoading] = useState<boolean>(false)
    const [number, setNumber] = useState<any>({
        current: 1,
        target: 1 * currencyData[1].price / currencyData[0].price
    })
    const [currency, setCurrency] = useState<any>({
        current: currencyData[0].price,
        target: currencyData[1].price
    })
    const [errors, setErrors] = useState<any>({})

    const onCurrencyChange = (value: any, currentType: string, targetType: string) => {
        let newCurrencyValue = {...currency}
        newCurrencyValue[currentType] = value
        setCurrency(newCurrencyValue)

        let newNumberValue = {...number};
        if (currentType === 'current') {
            newNumberValue[targetType] = number.current * value / currency[targetType];
        } else {
            newNumberValue[targetType] = number[targetType] * currency[currentType] / value;
        }
        setNumber(newNumberValue);
        
    }

    const onNumberChange = (value: number, currentType: string, targetType: string) => {
        let newErrors: any = {};
        let newNumberValue = { ...number };
        setLoading(true);
        newNumberValue[currentType] = value;
        if (value <= 0) {
            newErrors[targetType] = 'Price must be greater than zero!'
            newNumberValue[targetType] = 0;
            setLoading(false);
        } else {
            setTimeout(() => {
                newNumberValue[targetType] = value * currency[targetType] / currency[currentType];
                setLoading(false);
            }, 100);
        }
        setErrors(newErrors)
        setNumber(newNumberValue);
    };

    return (
        <div className="container">
            <h2 className='title'>CURRENCY CONVERTER</h2>
            <PriceInput 
                onChange={onCurrencyChange} 
                currency={currency.current} 
                data={data} 
                number={number.current} 
                onNumberChange={onNumberChange} 
                currentType={'current'}
                targetType={'target'}
                loading={loading}
                title={'Current Currency'}
                errors={errors.target}
            />
            <PriceInput 
                onChange={onCurrencyChange} 
                currency={currency.target} 
                data={data} 
                number={number.target} 
                onNumberChange={onNumberChange} 
                currentType={'target'}
                targetType={'current'}
                loading={loading}
                title={'Target Currency'}
                errors={errors.current}
            />
        </div>
    );
}
