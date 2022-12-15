import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

const CountryDetails = (props) => {
    const { countryName } = useParams();
    console.log(countryName);
    const [countryDetail, setCountryDetail] = useState([]);

/*     const memoizedCallback = useCallback(
        () => {
          doSomething(a, b);
        },
        [a, b],
      ); */

    useEffect(() => {
        async function fetchData() {
            try {
                const url = `https://restcountries.com/v3.1/name/${countryName}`;
                const res = await fetch(url);
                const data = await res.json();
                setCountryDetail(data);
            }
            catch (error) {
                alert(error.message);
            }
        }
        fetchData();
    }, [countryName])
    return (
        <Card sx={{ maxWidth: 750, margin: 'auto', flexDirection: 'column', marginTop: 5 }}>
            {
                countryDetail && countryDetail.map((item, index) => (
                    <CardActionArea key={index}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={item.flags.svg}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name.official}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <hr></hr>
                    </CardActionArea>
                ))
            }
            <CardActions>
                <Link to="/home">
                    Go Back
                </Link>
            </CardActions>
        </Card>
    );
};

export default CountryDetails;