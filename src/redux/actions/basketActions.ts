export const addQtyItem = (id: string) => ({
    type: 'ADD_QTY_ITEM',
    payload: id,
  });
  
  export const minusQtyItem = (id: string) => ({
    type: 'MINUS_QTY_ITEM',
    payload: id,
  });
  
  export const removeFromBasket = (id: string) => ({
    type: 'REMOVE_FROM_BASKET',
    payload: id,
  });
  
  export const clearBasket = () => ({
    type: 'CLEAR_BASKET',
  });
  