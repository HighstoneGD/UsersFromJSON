import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import './preview.css'

export const Preview = () => {
    const data = useSelector(state => state.data.users)

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
            <UserWrapper hasVideo = { hasVideo }>
                <div className = "preview-user-wrapper">
                    <Profile hasVideo = { hasVideo }>
                        <div className = "preview-head">
                            <div className = "image-and-name">
                                <img className = "preview-user-image" src = { require(`../../assets/images/${ user.image }.svg`).default } alt = ""/>
                                <p className = "user-name">{ user.name }</p>
                            </div>
                            <p className = { `star ${ user.favourite ? 'favourite' : '' }` }>★</p>
                        </div>        
                        <p>{ user.age } лет</p>
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