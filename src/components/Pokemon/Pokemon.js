import React from 'react'

const Pokemon = ({ match }) => {
    const pokemonId = match.params.pokemonId

    return (
        <div>
            {`Pokemon #${pokemonId}`}
        </div>
    )
}

export default Pokemon