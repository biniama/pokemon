import React, { useState } from 'react'
import mockData from '../../data/mockData'
import { Typography, Link } from '@material-ui/core'
import { toFirstCharUpperCase } from '../../utils/helpers'

const Pokemon = ({ match }) => {
    const pokemonId = match.params.pokemonId

    const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`])


    const generatePokemonJSX = () => {
        const { id, name, species, height, weight, types, sprites } = pokemon
        const { front_default } = sprites
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

        return (
            <>
                <Typography variant='h2'>
                    {`${id}. ${toFirstCharUpperCase(name)}`}
                    <img src={front_default} width='100px' height='100px' alt='small pokemon' />
                </Typography>
                <img src={fullImageUrl} width='300px' height='300px' alt='full pokemon' />
                <Typography variant='h4'>Pokemon Info</Typography>
                <Typography>
                    {`Species: `}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height: {height}</Typography>
                <Typography>Weight: {weight}</Typography>
                <Typography variant='h6'>Types:</Typography>
                {types.map((typeInfo) => {
                    const { name, url } = typeInfo.type
                    return <Typography key={name}>{name} {url}</Typography>
                    //return <div><Link href={url} key={name}>{name}</Link></div>
                })}
            </>
        )
    }

    return (
        <>
            {generatePokemonJSX()}
        </>
    )
}

export default Pokemon