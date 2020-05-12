import React, { useState } from 'react'
import { AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import mockData from '../../data/mockData'
import { toFirstCharUpperCase } from '../../utils/helpers'

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: 'auto'  // to center the image inside the card
    }
})

const Pokedex = (props) => {
    const { history } = props

    const [pokemonData, setPokemonData] = useState(mockData)

    const classes = useStyles();

    const getPokemonCard = (pokemonId) => {

        const { id, name } = pokemonData[pokemonId]

        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return (
            <Grid item xs={12} sm={4} md={3} key={pokemonId}>
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
                <Toolbar />
            </AppBar>
            {!pokemonData ?
                (
                    <CircularProgress />
                ) :
                (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map((pokemonId) =>
                            getPokemonCard(pokemonId)
                        )}
                    </Grid>
                )
            }
        </>
    )
}

export default Pokedex
