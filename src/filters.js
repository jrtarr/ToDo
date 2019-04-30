const filters = {
    searchtext: '',
    filterCompleted: false
}

const updateFilters = ({searchtext,filterCompleted}) =>{
    if (typeof searchtext === 'string'){
        filters.searchtext = searchtext
    }
    if (typeof filterCompleted === 'boolean'){
        filters.filterCompleted = filterCompleted
    }
}

const getFilters = () => filters

export {getFilters,updateFilters}