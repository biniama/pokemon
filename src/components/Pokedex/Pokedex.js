import React from 'react'
import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    }
})

const Pokedex = () => {
    const classes = useStyles();

    const getPokemonCard = () => {
        return (
            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent>
                        Hi
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
            <Grid container spacing={2} className={classes.pokedexContainer}>
                {getPokemonCard()}
            </Grid>
        </>
    )
}

export default Pokedex
