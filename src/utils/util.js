export const sortList = (list, controls) => {
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

    list.sort((a, b) => controls.sortControls.ascendence === 'ascend' ? comparator(a, b) : -comparator(a, b))
}

export const filterList = (list, filter) => {
    const filterWords = filter.split(" ")
    return list.filter(item => filterWords.reduce((has, current) => has && item.name.toLowerCase().includes(current.toLowerCase()), true))
}