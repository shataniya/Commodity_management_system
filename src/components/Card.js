import React from 'react'

import './Card.css'

class Card extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return (
            <div className='card'>
                <img className='card-image' alt='小米10 青春版' src='https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cc563c76a7383d8030d1c23f31c60cb9.png'></img>
            </div>
        )
    }
}

export default Card