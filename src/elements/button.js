import React from 'react';

function Button({handleClick, loading}) {
    return (
        <button onClick={handleClick} className='h-20 w-full bg-blue-500 rounded-xl text-white text-3xl font-bold'>{loading ? 'loading' : 'Load more'}</button>
    );
}

export default Button;