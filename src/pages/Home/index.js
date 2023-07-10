import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <button>
                <Link to="/start">Start Game</Link>
            </button>
        </>
    );
}

export default Home;
