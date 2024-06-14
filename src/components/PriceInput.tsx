import React, { useState } from 'react';
import { Input, Select, Spin } from 'antd';
import { ICurrencyList } from '../model/commons';

export interface IPriceInputProps {
    onChange: any,
    onNumberChange: any,
    currency: any,
    data: ICurrencyList[],
    number: number,
    currentType: string,
    targetType: string,
    loading: boolean,
    title: string
    errors: string
}

export default function PriceInput (props: IPriceInputProps) {
    const { Option } = Select;
    const { data, currency, onChange, number, onNumberChange, currentType, targetType, loading, title, errors } = props;

    return (
        <div className='wrapper'>
            <span className='text'>
                {title}
                {loading && currentType === 'current' && <Spin style={{ marginLeft: '10px' }} />}
                {loading && currentType === 'target' && <Spin style={{ marginLeft: '10px' }} />}
            </span>
            <div className='wrapper-input'>
                <div className='field'>
                    <Input
                        type="number"
                        value={number}
                        onChange={(e: any) => onNumberChange(Number(e.target.value), currentType, targetType)}
                        readOnly={loading}
                    />
                    
                    <Select
                        value={currency}
                        onChange={(newValue) => onChange(newValue, currentType, targetType)}
                        style={{width: '80%'}}
                    >
                        {data && data.map((item: any, index: number) => (
                            <Option key={item.currency} value={item.price}>{item.currency}</Option>
                        ))}
                    </Select>
                </div>
                <p className='error-message'>{errors}</p>
            </div>
        </div>
    );
}
