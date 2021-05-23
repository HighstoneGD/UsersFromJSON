import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../../store/actions'
import "./table.css"
import { useTranslation } from 'react-i18next'

export const Table = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data.users)

    const [t, i18n] = useTranslation()

    const content = data.map(user =>
        <div key = { user.id } className = "table-user">
            <img className = "user-image" src = { require(`../../assets/images/${ user.image }.svg`).default } alt = ""/>
            <p>{ user.name }</p>
            <p>{ user.age } { t("years") }</p>
            <p>{ user.phone }</p>
            <p 
                className = { `star ${ user.favourite ? 'favourite' : '' }` }
                onClick = { () => dispatch(dataActions.toggleFavourite(user.id)) }>★</p>
        </div>
    )

    return (
        <div className = "table">
            { content }
        </div>
    )
}