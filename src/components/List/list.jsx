import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataActions, controlsActions } from '../../store/actions'
import { Preview, Table } from '..'
import styled from 'styled-components'
import './list.css'

export const List = () => {
    const dispatch = useDispatch()

    const controls = useSelector(state => state.controls)

    useEffect(() => {
        async function getData() {
            // fetch("assets/data.json")
            //     .then(res => res.json())
            //     .then(json => console.log(json))
            const json = require('../../assets/data.json')
            console.log(json)

            const comparator = (a, b) => {
                switch(controls.sortControls.by) {
                    case 'id':
                        return a.id - b.id
                    case 'name':
                        if (a.name === b.name)
                            return 0
                        else
                            return a.name > b.name ? 1 : -1
                    case 'age':
                        return a.age - b.age
                    default:
                }
            }

            json.sort((a, b) => controls.sortControls.ascendence === 'ascend' ? comparator(a, b) : -comparator(a, b))
            dispatch(dataActions.setData(json))
        }
        getData()
    }, [controls.sortControls])

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
                            onClick = { () => dispatch(controlsActions.setSortBy('id')) } 
                            value = "id">ID</ToggleBy>
                        <ToggleBy 
                            onClick = { () => dispatch(controlsActions.setSortBy('name')) } 
                            value = "name">Имя</ToggleBy>
                        <ToggleBy 
                            onClick = { () => dispatch(controlsActions.setSortBy('age')) } 
                            value = "age">Возраст</ToggleBy>
                    </div>
                    <div className = "sort-ascendence">
                        <ToggleAscendence 
                            onClick = { () => dispatch(controlsActions.setSortAscendence('ascend')) } 
                            value = "ascend">По возрастанию</ToggleAscendence>
                        <ToggleAscendence 
                            onClick = { () => dispatch(controlsActions.setSortAscendence('descend')) } 
                            value = "descend">По убыванию</ToggleAscendence>
                    </div>
                </div>
                <div className = "mode-wrapper">
                    <p className = "title">Вид</p>
                    <div className = "mode">
                        <ToggleView 
                            onClick = { () => dispatch(controlsActions.setMode('table')) } 
                            value = "table">Таблица</ToggleView>
                        <ToggleView 
                            onClick = { () => dispatch(controlsActions.setMode('preview')) } 
                            value = "preview">Превью</ToggleView>
                    </div>
                </div>
            </div>
            { controls.modeControls.isTable ? <Table /> : <Preview /> }
        </div>
    )
}