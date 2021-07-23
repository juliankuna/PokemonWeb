import React from 'react';
import '../App.css';
import {Button, Icons} from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

const Pagination = (props) => {
const {onLeftCLick, onRightCLick, page, totalPages} = props;

    return(
        <div className="pagination">
            <Button onClick={onLeftCLick}><ArrowLeft></ArrowLeft></Button>
            <div>{page} de {totalPages}</div>
            <Button onClick={onRightCLick}><ArrowRight></ArrowRight></Button>

        </div>
    )

}
export default Pagination;