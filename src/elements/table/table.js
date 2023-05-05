import React from 'react';
import TableRow from "./tableRow";

function Table({tableData}) {
    return (
        <table className='min-w-[240px] lg:min-w-[280px]'>
            <tbody>
                {tableData.map((el) => (<TableRow key={el.name} data={el} />))}
            </tbody>
        </table>
    );
}

export default Table;