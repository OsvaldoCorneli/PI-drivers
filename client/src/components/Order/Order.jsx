import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { order } from "../../redux/actions/actions";
import "./Order.css" 

export default function Order(props) {
  const { setCurrentPage, searchQueryLocal } = props;

  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  const handleOrder = (event) => {
    dispatch(order(event.target.value));
    setCurrentPage(0);
    if (aux) {
      setAux(false);
    } else {
      setAux(true);
    }
  };

  return (
    <div className="order-contener">
      <div>
        <p>Order</p>
        <select
          name="ordenar"
          onChange={handleOrder}
          disabled={searchQueryLocal !== ""}
        >
          <option value="reset">...</option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
          <option value="nacimientoa">Nacimiento ascendente</option>
          <option value="nacimientod">Nacimiento descendente</option>
        </select>
      </div>
    </div>
  );
}