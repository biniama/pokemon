import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"; // > V5.1
import { Typography, Link, CircularProgress, Button } from '@material-ui/core'
import { toFirstCharUpperCase } from '../../utils/helpers'
import axios from 'axios'

const Pokemon = () => {

    const { pokemonId } = useParams();
    let history = useHistory();

    // old way of getting the params and history
    // const Pokemon = ({ history, match }) => {
    // const pokemonId = match.params.pokemonId

    const [pokemon, setPokemon] = useState(undefined)

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => {
                const { data } = response
                setPokemon(data)
            })
            .catch((error) => {
                setPokemon(false)
            })
    }, [pokemonId])

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
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}
            {pokemon !== undefined &&
                <Button variant='contained' onClick={() => history.push('/')}>
                    Back to Pokedex
            </Button>}
        </>
    )
}

export default Pokemon