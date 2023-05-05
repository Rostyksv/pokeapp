import React from 'react';

function TableRow({data}) {
    return (
        <tr className='border-2 border-black capitalize text-center' key={data?.name}>
            <td className='border-r-2 border-black'>{data?.name}</td>
            <td>{data?.value}</td>
        </tr>
    );
}

export default TableRow;