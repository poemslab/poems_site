import React from 'react'

export default function Button(props) {
  return (
    <a className='btn'>
      { props.children }
    </a>
  )
}
