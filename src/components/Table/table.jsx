import React from 'react'
import { useSelector } from 'react-redux'
import "./table.css"

export const Table = () => {
    const data = useSelector(state => state.data.users)
    const content = data.map(user =>
        <div className = "table-user">
            <img className = "user-image" src = { require(`../../assets/images/${ user.image }.svg`).default } alt = ""/>
            <p>{ user.name }</p>
            <p>{ user.age } лет</p>
            <p>{ user.phone }</p>
            <p className = { `star ${ user.favourite ? 'favourite' : '' }` }>★</p>
        </div>
    )

    return (
        <div className = "table">
            { content }
        </div>
    )
}