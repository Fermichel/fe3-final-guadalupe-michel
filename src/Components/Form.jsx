import React, { useState, useEffect } from "react";
import "./form.css";

const Form = () => {
  const initialData = {
    name: { value: "", isOK: null },
    email: { value: "", isOK: null },
  };

  const [data, setData] = useState(initialData);
  const [show, setShow] = useState(false);

  const errMje = {
    errName: "Tu nombre es muy corto, ¿Lo colocaste bien?",
    errEmail: "Coloca tu email correctamente",
  };
  const nombreData = `${data.name.value}`
  
  const exitMje = "Gracias " + nombreData +", te contactaremos cuando antes vía mail";

  const handleName = (e) => {
    const value = e.target.value;
  
    if (value.length > 5) {
      setData({
        ...data,
        name: { value: value, isOK: true },
      });
    } else {
      setData({
        ...data,
        name: { value: value, isOK: false },
      });
    }
  
    console.log("data.name.value en handleName:", data.name.value);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (regex.test(value)) {
      setData({
        ...data,
        email: { value: value, isOK: true },
      });
    } else {
      setData({
        ...data,
        email: { value: value, isOK: false },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = data.name.value;
    if (data.name.isOK === true && data.email.isOK === true) {
      setShow(true);
      console.log(`LEAD RECIBIDO: \n Nombre: ${name} \n Email: ${data.email.value}`);
  
      // Restablece los valores de los campos a su estado inicial
      //setData(initialData);
    } else {
      console.log("Tienes errores en el formulario");
    }
  };

  useEffect(() => {

    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <>
      <div className="contactForm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre Completo"
            onChange={handleName}
            value={data.name.value}
          />
          {data.name.isOK === false && <p className="warning">{errMje.errName}</p>}

          <input
            type="text"
            name="email"
            placeholder="e-mail"
            onChange={handleEmail}
            value={data.email.value}
          />
          {data.email.isOK === false && <p className="warning">{errMje.errEmail}</p>}

          {data.name.isOK === null || data.email.isOK === null ? (
            <button disabled>Enviar</button>
          ) : (
            <button type="submit" className="btn-able">Enviar</button>
          )}
          {show && <p className="btn-able">{exitMje}</p>}
        </form>
      </div>
    </>
  );
};

export default Form;

