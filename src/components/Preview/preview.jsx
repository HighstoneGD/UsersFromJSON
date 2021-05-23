import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dataActions } from '../../store/actions'
import styled from 'styled-components'
import './preview.css'
import { useTranslation } from 'react-i18next'

export const Preview = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data.users)

    const [t, i18n] = useTranslation()

    const UserWrapper = styled.div`
        width: ${ props => props.hasVideo ? '100%' : '50%' };
        padding: 10px;
        box-sizing: border-box;
    `

    const Profile = styled.div`
        width: ${ props => props.hasVideo ? '50%' : '100%' };
        height: 100%;
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    `

    const content = data.map(user => {
        const hasVideo = !!user?.video
        
        return (
            <UserWrapper hasVideo = { hasVideo } key = { user.id }>
                <div className = "preview-user-wrapper">
                    <Profile hasVideo = { hasVideo }>
                        <div className = "preview-head">
                            <div className = "image-and-name">
                                <img className = "preview-user-image" src = { require(`../../assets/images/${ user.image }.svg`).default } alt = ""/>
                                <p className = "user-name">{ user.name }</p>
                            </div>
                            <p 
                                className = { `star ${ user.favourite ? 'favourite' : '' }` }
                                onClick = { () => dispatch(dataActions.toggleFavourite(user.id)) }>★</p>
                        </div>        
                        <p>{ user.age } { t("years") }</p>
                        <p>{ user.phone }</p>
                        <p>{ user.phrase }</p>
                    </Profile>
                    { hasVideo ? 
                        <video width = "50%" height = "100%" controls>
                            <source src = { require(`../../assets/videos/${ user.video }.mp4`).default } type="video/mp4"/>
                        </video> :
                        null
                    }
                </div>
            </UserWrapper>
        )
    })

    return (
        <div className = "preview">
            { content }
        </div>
    )
}