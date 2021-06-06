import React from 'react';
import propTypes from 'prop-types';

Hero.propTypes = {
    count: propTypes.number,
    incrementCount: propTypes.func,
};

Hero.defaultProps = {
    count: 0,
    incrementCount: null,
}

function Hero(props) {
    const { count, incrementCount } = props;
    console.log('Components Hero re-render');
    return (
        <div>
            <p>{count}</p>
            <button onClick={incrementCount}>Increment</button>
        </div>
    );
}

export default React.memo(Hero);