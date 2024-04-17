import React from 'react'

const Card = ({href, card_title}) => {
  return (
    <a href={href}
    className="btn btn-dark col-2 mb-4 p-2 d-flex justify-content-center">
        <div className="fw-semibold align-self-center">{card_title}</div>
    </a>
  )
}

export default Card