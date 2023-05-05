import React from 'react';
import Type from "../elements/type";
import Table from "../elements/table/table";

function Card({ poke }) {
    const { name, spriteUrl, types, stats, weight, totalMoves } = poke || {};
console.log(poke, 'p')
    const tableData = stats ? [...stats?.map(stat => ({ name: stat.stat.name, value: stat.base_stat })), { name: 'Weight', value: weight }, { name: 'Total moves', value: totalMoves }] : [];

    return (
        <div className={`border-2 border-black pt-4 pb-14`}>
            <div className={`mx-4 flex justify-center border-2 border-gray-800 ${stats && 'h-48'}`}>
                <img src={spriteUrl} alt='Poke' />
            </div>
            <div className='px-2'>
                <h4 className='text-2xl font-semibold text-center my-2 capitalize'>{name}</h4>
                {!stats && <div className='flex gap-2 flex-wrap'>
                    {types  && types.map(type => <Type key={type} type={type} />)}
                </div>}
                {tableData && <Table tableData={tableData} /> }
            </div>
        </div>
    );
}

export default Card;