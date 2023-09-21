import {CartIcon} from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../store/cart-context";

export const HeaderCartButton = props => {
    const { items } = useContext(CartContext);
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

    const numberOfItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0)

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        //return a function automatically means cleanup
        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span> Your Cart</span>
        <span className={classes.badge}>
            {numberOfItems}
        </span>
    </button>
}