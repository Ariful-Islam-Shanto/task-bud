import React from 'react';

const Container = ({children}) => {
    return (
        <div className='px-6 md:px-0 max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto'>
            {children}
        </div>
    );
};

export default Container;