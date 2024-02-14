import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export function BasketProvider({ children }){
  const [basketItems, setBasketItems] = useState([]);

  function addToBasket(item){
    setBasketItems([...basketItems, item]);
  };

  function removeFromBasket (id){
    setBasketItems(basketItems.filter((item) => item.id !== id));
  };

  return (
    <BasketContext.Provider value={{ basketItems, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};