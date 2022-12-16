import { useEffect, useState } from 'react';

function useFetch(url) {
    const [countryDetail, setCountryDetail] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setCountryDetail(data);
            }
            catch (error) {
                alert(error.message);
            }
        }
        fetchData();
    }, [url]);
    return { countryDetail };
}

export default useFetch;