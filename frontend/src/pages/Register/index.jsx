import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from './styles';

import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button';
import Input from '../../components/Input';


function Register() {

  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [cpf, setCpf] = useState('');
  const [erro, setErro] = useState('');

  async function handleRegistrar() {
    if (!nome || !email || !senha || !confirmar || !cpf) {
      setErro('Preencha todos os campos!');
      return;
    }

    const numerosCpf = cpf.replace(/[.-]/g, '');  // replace com expressão regular para remover os '.' e o '-' do CPF

    if (isNaN(+numerosCpf)) {  // Verifica se o CPF foi preenchido completamente
      setErro('Preencha o CPF corretamente!')
      return
    }

    if (senha !== confirmar) {
      setErro('Digite as senhas corretamente!');
      return;
    }

    const res = await registrar(nome, numerosCpf, email, senha);

    if (res) {
      setErro(res);
      return;
    }

    navigate('/');
  }

  return (
    <C.RegisterContainer>
      <C.Title>Vamos Começar?</C.Title>

      <C.FormContainer>
        <Input
          Text='Nome'
          type='text'
          placeholder='Digite seu nome'
          value={nome}
          onChange={e => [setNome(e.target.value), setErro('')]}
        />
        <Input
          Text='Email'
          type='email'
          placeholder='exemplo@email.com'
          value={email}
          onChange={e => [setEmail(e.target.value), setErro('')]}
        />
        <Input
          Text='CPF'
          placeholder='123.456.789-00'
          mask='999.999.999-99'
          value={cpf}
          onChange={e => [setCpf(e.target.value), setErro('')]}
        />
        <Input
          Text='Senha'
          type='password'
          placeholder='*****'
          value={senha}
          onChange={e => [setSenha(e.target.value), setErro('')]}
        />
        <Input
          Text='Confirmar senha'
          type='password'
          placeholder='*****'
          value={confirmar}
          onChange={e => [setConfirmar(e.target.value), setErro('')]}
        />
        <C.ErrorLabel>{erro}</C.ErrorLabel>
        <Button
          Text='Cadastrar'
          onClick={handleRegistrar}
        />
      </C.FormContainer>
    </C.RegisterContainer>
  );
}


export default Register;
