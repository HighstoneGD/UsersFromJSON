import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions, controlsActions } from '../../store/actions'
import { Preview, Table } from '..'
import { filterList, sortList } from '../../utils/util'
import styled from 'styled-components'
import './list.css'
import { useLocation, useHistory } from 'react-router-dom'

export const List = () => {
    const dispatch = useDispatch()

    const controls = useSelector(state => state.controls)
    const data = useSelector(state => state.data)

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const history = useHistory()

    useEffect(() => {
        if (query.entries) {
            console.log(query.get('by'))
            dispatch(controlsActions.setSortBy(query.get('by')))
            dispatch(controlsActions.setSortAscendence(query.get('ascendence')))
            dispatch(controlsActions.setMode(query.get('mode')))
        }
    }, [location])

    useEffect(() => {
        async function getData() {
            // fetch("assets/data.json")
            //     .then(res => res.json())
            //     .then(json => console.log(json))
            const list = data.data || require('../../assets/data.json')
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
                    <p className = "title">Сортировка</p>
                    <div className = "sort-by">
                        <ToggleBy 
                            onClick = { () => setQueryParam('by', 'id') } 
                            value = "id">ID</ToggleBy>
                        <ToggleBy 
                            onClick = { () => setQueryParam('by', 'name') } 
                            value = "name">Имя</ToggleBy>
                        <ToggleBy 
                            onClick = { () => setQueryParam('by', 'age') } 
                            value = "age">Возраст</ToggleBy>
                    </div>
                    <div className = "sort-ascendence">
                        <ToggleAscendence 
                            onClick = { () => setQueryParam('ascendence', 'ascend') } 
                            value = "ascend">По возрастанию</ToggleAscendence>
                        <ToggleAscendence 
                            onClick = { () => setQueryParam('ascendence', 'descend') } 
                            value = "descend">По убыванию</ToggleAscendence>
                    </div>
                </div>
                <div className = "mode-wrapper">
                    <p className = "title">Вид</p>
                    <div className = "mode">
                        <ToggleView 
                            onClick = { () => setQueryParam('mode', 'table') } 
                            value = "table">Таблица</ToggleView>
                        <ToggleView 
                            onClick = { () => setQueryParam('mode', 'preview') } 
                            value = "preview">Превью</ToggleView>
                    </div>
                </div>
                <div className = "search">
                    <p>Поиск</p>
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