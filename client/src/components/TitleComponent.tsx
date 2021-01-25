/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import Helmet from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const TitleComponent = ({ title }: any) => {
    var defaultTitle = 'Cari Gawe';
    return (
        <HelmetProvider>
            <Helmet>
                <title>{defaultTitle} - {title}</title>
            </Helmet>
        </HelmetProvider>
    );
};

export { TitleComponent };