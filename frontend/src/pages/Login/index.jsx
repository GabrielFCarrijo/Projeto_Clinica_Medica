import React from 'react';
import * as C from './styles';

import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';

function Login () {

  return (
    <C.LoginContainer>
      <C.Title>Faça seu login!</C.Title>

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
        <C.ErrorLabel></C.ErrorLabel>
        <C.RegisterSpan>Não tem conta?
          <Link to='/registrar'>
            &nbsp;Registar-se
          </Link>
        </C.RegisterSpan>
        <Button
          Text='Entrar'
        />
      </C.FormContainer>
    </C.LoginContainer>
  );

}


export default Login;
