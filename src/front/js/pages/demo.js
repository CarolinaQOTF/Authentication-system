import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container text-center mt-5">
      <ul className="list-group">
        {store.demo.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between m-3"
              style={{ background: item.background }}
            >
              <Link to={"/single/" + index}>
                <span>Link to: {item.title}</span>
              </Link>
              {
                // Conditional render example
                // Check to see if the background is orange, if so, display the message
                item.background === "red" || "green" ? (
                  <p style={{ color: item.initial }}>
                    change color with one or double click
                  </p>
                ) : null
              }
              <button
                className="btn button"
                onClick={() => actions.changeColor(index, "red")}
                onDoubleClick={() => actions.changeColor(index, "green")}
              >
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
