import React, { useEffect, useState } from "react";
import axios from "axios";

function StarWars() {
    const [searchTerm, setSearchTerm] = useState("luke");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios
            .get(`https://swapi.dev/api/people/?search=${searchTerm}`)
            .then((res) => {
                setData(res.data.results);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [searchTerm]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Star Wars Character Search</h2>

            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search character..."
            />

            {loading && <p>Loading...</p>}

            {data.map((item) => (
                <div key={item.name}>
                    <strong>{item.name}</strong>
                </div>
            ))}
        </div>
    );
}

export default StarWars;
