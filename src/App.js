import React, {useCallback, useEffect, useState} from "react";
import './App.css';
import Card from "./elements/card";
import Button from "./elements/button";
import Items from "./elements/Items";

function App() {
    const [pokeList, setPokeList] = useState([]);
    const [selectedPoke, setSelectedPoke] = useState(null);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((data) => {
                Promise.all(
                    data.results.map((pokemon) =>
                        fetch(pokemon.url)
                            .then((response) => {
                                if (response.ok) {
                                    return response.json();
                                }
                                throw new Error("Network response was not ok.");
                            })
                            .then((data) => {
                                const types = data.types.map((type) => type.type.name);
                                const spriteUrl = data.sprites.front_default;

                                return {
                                    id: data.id,
                                    name: data.name,
                                    types: types,
                                    spriteUrl: spriteUrl,
                                    url: pokemon.url
                                };
                            })
                    )
                ).then((allPokemons) => setPokeList([...pokeList, ...allPokemons]));
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [offset]);

    const handleClick = useCallback(async (poke) => {
        try {
            setLoading(true);
            const res = await fetch(poke.url);
            const data = await res.json();
            const types = data.types.map((type) => type.type.name);
            const spriteUrl = data.sprites.front_default;
            const stats = data.stats;

            setSelectedPoke({
                id: data.id,
                name: data.name,
                types: types,
                spriteUrl: spriteUrl,
                stats: stats,
                weight: data.weight,
                totalMoves: data.moves.length
            })
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }, [pokeList]);

    const handleLoadMore = () => {
        setOffset(prev => prev+12);
    }

    if(loading && pokeList.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-6 md:p-8 lg:p-16'>
            <div className='flex justify-center mb-8'>
                <h2 className='p-4 w-full max-w-2xl text-5xl text-center border-2 border-black font-semibold'>Pokedex</h2>
            </div>
            <div className='flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16 justify-center '>
                <div className='max-w-2xl'>
                    <Items pokeList={pokeList} handleClick={handleClick} />
                    {pokeList && <Button handleClick={handleLoadMore} loading={loading} />}
                </div>
                {selectedPoke && <div className='flex items-center'><Card poke={selectedPoke} /></div>}
            </div>
        </div>
    );
}

export default App;
