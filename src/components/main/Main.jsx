import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRepos } from '../actions/repos'
import Repo from './Repo/Repo'
import './Main.less'
import { setCurrentPage } from '../../reducers/reposReducer'
import { createPages } from '../../utils/pagesCreator'
import { Redirect } from 'react-router'

const Main = () => {

    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const perPage = useSelector(state => state.repos.perPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const isFetchError = useSelector(state => state.repos.isFetchError)
    const [searchValue, setSearchValue] = useState("")
    const pagesCount = Math.ceil(totalCount / perPage)

    const pages = []
    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    function searchHandle() {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }


    return (
        <div>
            {isFetchError &&
                <div class="alert alert-danger" role="alert">
                    Ошибка
                </div>
            }
            <div className="search">
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='Input repo name' className="search-input" />
                <button onClick={() => searchHandle()} className="search-btn">Search</button>
            </div>
            {
                isFetching === false
                    ? repos.map(repo => <Repo repo={repo} />)
                    : <div className="fetching"></div>
            }
            <div className="pages">
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage == page ? 'current-page' : 'page'}
                    onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
        </div>
    )
}

export default Main
