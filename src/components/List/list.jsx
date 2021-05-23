import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions, controlsActions } from '../../store/actions'
import { Preview, Table } from '..'
import { filterList, sortList } from '../../utils/util'
import styled from 'styled-components'
import './list.css'
import { useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const List = () => {
    const dispatch = useDispatch()

    const controls = useSelector(state => state.controls)
    const data = useSelector(state => state.data)

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const history = useHistory()

    const [t, i18n] = useTranslation()

    useEffect(() => {
        query.get('by') ? 
            dispatch(controlsActions.setSortBy(query.get('by'))) : 
            setQueryParam('by', 'id')
        query.get('ascendence') ? 
            dispatch(controlsActions.setSortAscendence(query.get('ascendence'))) : 
            setQueryParam('ascendence', 'ascend')

        query.get('mode') ? 
            dispatch(controlsActions.setMode(query.get('mode'))) :
            setQueryParam('mode', 'table')
    }, [location])

    useEffect(() => {
        async function getData() {
            const list = data.data || await (await fetch('data.json', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })).json()
            sortList(list, controls)
            const filteredList = filterList(list, controls.filter)
            dispatch(dataActions.setData(filteredList))
        }
        getData()
    }, [controls])

    const setQueryParam = (param, value) => {
        query.set(param, value)
        history.push({
            search: '?' + query.toString()
        })
    }

    const ToggleBy = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        background-color: ${ props => props.value === controls.sortControls.by ? 'rgba(0, 0, 0, 0.2)' : 'white' }
    `

    const ToggleAscendence = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        background-color: ${ props => props.value === controls.sortControls.ascendence ? 'rgba(0, 0, 0, 0.2)' : 'white' }
    `

    const ToggleView = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        background-color: ${ props => props.value === controls.modeControls.mode ? 'rgba(0, 0, 0, 0.2)' : 'white' }
    `

    return (
        <div className = "list-wrapper">
            <div className = "controls-wrapper">
                <div className = "sort-wrapper">
                    <p className = "title">{ t("sort") }</p>
                    <div className = "sort-by">
                        <ToggleBy 
                            onClick = { () => setQueryParam('by', 'id') } 
                            value = "id">ID</ToggleBy>
                        <ToggleBy 
                            onClick = { () => setQueryParam('by', 'name') } 
                            value = "name">{ t("name") }</ToggleBy>
                        <ToggleBy 
                            onClick = { () => setQueryParam('by', 'age') } 
                            value = "age">{ t("age") }</ToggleBy>
                    </div>
                    <div className = "sort-ascendence">
                        <ToggleAscendence 
                            onClick = { () => setQueryParam('ascendence', 'ascend') } 
                            value = "ascend">{ t("ascend") }</ToggleAscendence>
                        <ToggleAscendence 
                            onClick = { () => setQueryParam('ascendence', 'descend') } 
                            value = "descend">{ t("descend") }</ToggleAscendence>
                    </div>
                </div>
                <div className = "mode-wrapper">
                    <p className = "title">{ t("mode") }</p>
                    <div className = "mode">
                        <ToggleView 
                            onClick = { () => setQueryParam('mode', 'table') } 
                            value = "table">{ t('table') }</ToggleView>
                        <ToggleView 
                            onClick = { () => setQueryParam('mode', 'preview') } 
                            value = "preview">{ t("preview") }</ToggleView>
                    </div>
                </div>
                <div className = "search">
                    <p>{ t("search") }</p>
                    <form>
                        <input
                            name = "filter"
                            className = "search-input"
                            value = { controls.filter }
                            onChange = { (e) => dispatch(controlsActions.setFilter(e.target.value)) }/>
                    </form>
                </div>
            </div>
            <div className = "content">
                { controls.modeControls.mode === 'table' ? <Table /> : <Preview /> }
            </div>
        </div>
    )
}