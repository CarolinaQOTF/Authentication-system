import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Form from "../component/form";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container text-center mt-5">
      <h3 className="m-5">Please enter your data</h3>
      <Form />
    </div>
  );
};
