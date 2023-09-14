import React from "react";
import { useState } from "react";
import './form.css'


const Form = () => {
  //Aqui deberan implementar el form completo con sus validaciones

  const [data, setData] = useState ({
    name: {value : "", isOK: null},
    email: {value: "", isOK: null},
  });

  const [show, setShow]= useState(false);

  //preparamos los mensajes que vamos a usar
  const errMje= {
    errName:"Tu nombre es muy corto, ¿Lo colocaste bien?",
    errEmail: "Coloca tu email correctamente"
  };
  const exitMje = `Gracias ${data.name.value}, te contactaremos cuando antes vía mail`

  // handle del nombre con sus validaciones
  const handleName =(e)=>{
    //validamos longitud de mas de 5 y sin espacio en blanco al inicio como en el examen
    if(e.target.value.length > 5){
      setData({
        ...data,
        name: {value: e.target.value, isOK: true},
      });
    }else{
      setData({
        ...data,
        name: { value: "", isOK: false},
      })
    }
  }
  //handle con las validaciones del email
  const handleEmail = (e)=>{
    //validamos el email con la expresion regular
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(regex.test(e.target.value)){
      setData({
        ...data,
        email: {value: e.target.value, isOK: true},
      });
    } else{
      setData({
        ...data,
        email: {value: "", isOK: false}
      })
    }
  }

  // handle del submit con las validacions para que salgan los mensajes de error
  const handleSubmit =(e)=>{
    e.preventDefault();
    if (data.name.isOK === true && data.email.isOK === true){
      setShow(true);
      console.log(`LEAD RECIBIDO: \n Nombre: ${data.name.value} \n Email: ${data.email.value}`);
    }else{
     
      console.log("tienes errores en el form");
    }
     

  }
  return (
    <>
    <div>
      <form onSubmit = {handleSubmit}>
        <input type ="text" name= "name" placeholder="Nombre Completo" onChange={handleName}/>
        {data.name.isOK === null ? ( <></> )
        : data.name.isOK ?( <></> )
        : (<p>{errMje.errName}</p>)}
    
        <input type ="text" name= "email" placeholder="e-mail" onChange={handleEmail}/>
        {data.email.isOK === null ? ( <></> )
        : data.email.isOK ?( <></> )
        : (<p>{errMje.errEmail}</p>)}

        {(data.name.isOK === null || data.email.isOK === null) ?
          <button disabled>Enviar</button>:
          <button type="submit" >Enviar</button>}
          {show && <p>{exitMje}</p>}
      </form>
    </div>
    </>
  );
};

export default Form;
