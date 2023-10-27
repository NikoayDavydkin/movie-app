/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { useContext } from 'react'
import { Pagination } from 'antd'
import './movie-list-pagination.css'

import { AppContext } from '../../../App';

export const MovieListPagination = (props) => {
  const { totalPages, current } = props
  const { handleSetCurrPage } = useContext(AppContext)

  return (
    <Pagination
      defaultPageSize={1}
      defaultCurrent={current}
      total={totalPages}
      onChange={(page) => {
        handleSetCurrPage(page)
      }}
    />
  )
};
