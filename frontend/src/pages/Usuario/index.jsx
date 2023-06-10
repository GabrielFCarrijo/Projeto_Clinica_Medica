import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';
import * as C from './styles';

import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';


function Register() {

  const { cadastrarUserInterno } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [Cpf, setCpf] = useState('');
  const [tipo, setTipo] = useState('');
  const [erro, setErro] = useState('');

  async function handleRegistrar() {
    if (!nome || !email || !senha || !confirmar || !Cpf) {
      setErro('Preencha todos os campos!');
      return;
    }

    const numerosCpf = Cpf.replace(/[.-]/g, '');  // replace com expressão regular para remover os '.' e o '-' do CPF
    if (isNaN(+numerosCpf)) {  // Verifica se o CPF foi preenchido completamente
      setErro('Preencha o CPF corretamente!')
      return;
    }
    if (!cpf.isValid(numerosCpf)) {
      setErro('CPF inválido!');
      return;
    }

    if (senha !== confirmar) {
      setErro('Digite as senhas corretamente!');
      return;
    }

    const res = await cadastrarUserInterno(tipo, nome, numerosCpf, email, senha);

    if (!res?._id) {
      setErro(res);
      return;
    }else{
        alert('Usuario Cadastrado com sucesso!');
        setNome('');
        setEmail('');
        setCpf('');
        setSenha('');
        setConfirmar('');
    }

  }

  return (
    <C.RegisterContainer>
      <C.Title>Cadastrar Usuário</C.Title>

      <C.FormContainer>
        <C.Select
            value={ tipo }
            onChange={ (e) => setTipo(e.target.value) }
            style={{ marginBottom: '20px' }}
        >
            <option value="">Selecione o tipo de usuário</option>
            <option value="administrador">Administrador</option>
            <option value="medico">Medico</option>
            <option value="paciente">Paciente</option>
        </C.Select>

        <Input
          type='text'
          placeholder='Nome'
          value={ nome }
          onChange={ e => [setNome(e.target.value), setErro('')] }
        />
        <Input
          type='email'
          placeholder='exemplo@email.com'
          value={ email }
          onChange={ e => [setEmail(e.target.value), setErro('')] }
        />
        <InputMask
          placeholder='CPF'
          mask='999.999.999-99'
          value={ Cpf }
          onChange={ e => [setCpf(e.target.value), setErro('')] }
        />
        <Input
          type='password'
          placeholder='Senha'
          value={ senha }
          onChange={ e => [setSenha(e.target.value), setErro('')] }
        />
        <Input
          type='password'
          placeholder='Confirmar senha'
          value={ confirmar }
          onChange={ e => [setConfirmar(e.target.value), setErro('')] }
        />
        <C.ErrorLabel>{ erro }</C.ErrorLabel>
        <Button
          Text='Cadastrar'
          onClick={ handleRegistrar }
        />
        <C.BackButton to="/">Voltar</C.BackButton>
      </C.FormContainer>
    </C.RegisterContainer>
  );
}


export default Register;
