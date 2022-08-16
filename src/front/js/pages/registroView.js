import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Registro from "../component/registro";

const RegistroView = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h4 className="text-center mt-4 mb-5">
        welcome, start your registration here to access safely.
      </h4>
      <Registro />
    </div>
  );
};

export default RegistroView;
