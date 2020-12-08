import React from 'react';

const {
  Provider: ApiProvider,
  Consumer: ApiConsumer,
  // @ts-ignore
} = React.createContext();

export { ApiProvider, ApiConsumer };
