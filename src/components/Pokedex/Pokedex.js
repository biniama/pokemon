import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography, TextField } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { toFirstCharUpperCase } from '../../utils/helpers'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: 'auto'  // to center the image inside the card
    },
    searchContainer: {
        display: 'flex',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '5px',
        marginBottom: '5px'
    },
    searchIcon: {
        alignSelf: 'flex-end',
        marginBottom: '5px'
    },
    searchText: {
        width: '200px',
        margin: '5px'
    }
}))

const Pokedex = ({ history }) => {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({})
    const [filter, setFilter] = useState('')

    const handleSearchInputOnChange = (e) => {
        setFilter(e.target.value)
    }

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=807`) // only 807 pokemons have sprite image in the api
            .then((response) => {
                const { data } = response
                const { results } = data
                const newPokemonData = {}
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                    }
                })

                setPokemonData(newPokemonData)
            });
    }, [])

    const getPokemonCard = (pokemonId) => {

        const { id, name, sprite } = pokemonData[pokemonId]

        return (
            <Grid item xs={12} sm={4} md={3} lg={2} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: '130px', height: '130px' }}
                    />
                    <CardContent>
                        <Typography>{`${id}. ${toFirstCharUpperCase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    // <> </> is a React Fragment
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField className={classes.searchText}
                            label='Pokemon'
                            variant='standard'
                            onChange={handleSearchInputOnChange}>
                        </TextField>
                    </div>
                </Toolbar>
            </AppBar>
            {!pokemonData ?
                (
                    <CircularProgress />
                ) :
                (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map((pokemonId) =>
                            // display only those pokemons that match the filter value
                            pokemonData[pokemonId].name.includes(filter) && getPokemonCard(pokemonId)
                        )}
                    </Grid>
                )
            }
        </>
    )
}

export default Pokedex
