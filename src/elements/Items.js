import React, {memo} from 'react';
import Card from "./card";

function Items({pokeList, handleClick}) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            {pokeList && pokeList.map(poke => <div className='flex md:block cursor-pointer' key={poke.id} onClick={() => handleClick(poke)}><Card poke={poke} /></div>)}
        </div>
    );
}

export default memo(Items);