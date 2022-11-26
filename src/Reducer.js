export const initialState = {
    basket: [],
    user: null,
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET", 
    REMOVE_TO_BASKET: "REMOVE_TO_BASKET",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
}

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        
        case "REMOVE_TO_BASKET":
            const index = state.basket.findIndex((basketItem => basketItem.id === action.id));
            let auxBasket = [...state.basket];

            if(index >= 0 ) {
                auxBasket.splice(index, 1);
            } else {
                console.log("Can't remove item");
            }

            return {
                ...state,
                basket: auxBasket
            }
        
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: action.basket
            }

        default: return state;
    }
}

export default reducer;