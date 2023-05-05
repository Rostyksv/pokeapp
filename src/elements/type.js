import React from 'react';

const colors = {
    grass: 'from-green-200 to-green-500',
    poison: 'from-violet-200 to-violet-500',
    fire: 'from-red-200 to-red-500',
    electric: 'from-yellow-200 to-yellow-500',
    other: 'from-cyan-500 to-blue-500'
}

function Type({type}) {
    return (
        <span className={`bg-gradient-to-b ${colors[type] || colors.other} rounded-md py-2 px-4`}>{type}</span>
    );
}

export default Type;