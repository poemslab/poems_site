import React from 'react'
import styles from './index.scss'

export default function Input(props) {

  const {
    type,
    placeholder,
    id,
    className,
    min,
    onChange,
    name
  } = props

  return (
    <div className={`input-field ${styles.input_field} ${className || ''}`}>
      <input onChange={onChange} name={name} min={min} id={id} type={type} className='validate' />
      <label htmlFor={id}>{ placeholder }</label>
    </div>
  )
}
