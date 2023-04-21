import React from 'react';
import * as C from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';


function Register() {

  return (
    <C.RegisterContainer>
      <C.Title>Vamos Começar?</C.Title>

      <C.FormContainer>
        <Input
          Text='Email'
          type='email'
          placeholder='exemplo@email.com'
        />
        <Input
          Text='Senha'
          type='password'
          placeholder='*****'
        />
        <Input
          Text='Confirmar senha'
          type='password'
          placeholder='*****'
        />
        <C.ErrorLabel></C.ErrorLabel>
        <Button
          Text='Cadastrar'
        />
      </C.FormContainer>
    </C.RegisterContainer>
  );
}


export default Register;
