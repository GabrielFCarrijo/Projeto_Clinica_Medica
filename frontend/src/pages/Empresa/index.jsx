import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as C from './styles';

import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import Input from '../../components/Input';


function Empresa() {

  const { cadastrarEmpresa } = useAuth();

  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('');
  const [horaAbertura, setHoraAbertura] = useState('');
  const [horaFechamento, setHoraFechamento] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [erro, setErro] = useState('');

  async function handleRegistrar() {
    if (!nome || !endereco || !horaAbertura || !horaFechamento || !cnpj || !nomeFantasia || !razaoSocial) {
      setErro('Preencha todos os campos!');
      return;
    }

    const res = await cadastrarEmpresa(nome, endereco, horaAbertura, horaFechamento, cnpj, nomeFantasia, razaoSocial);

    if (!res?._id) {
      setErro(res);
      return;
    }else{
        alert('Atualizado com sucesso!');
        setNome('');
        setEndereco('');
        setHoraAbertura('');
        setHoraFechamento('');
        setCnpj('');
        setNomeFantasia('');
        setRazaoSocial('');
    }

  }

  return (
    <C.RegisterContainer>
      <C.Title>Empresa</C.Title>

      <C.FormContainer>
      <Input
          type='text'
          placeholder='nome'
          value={ nome }
          onChange={ e => [setNome(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='endereco'
          value={ endereco }
          onChange={ e => [setEndereco(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='Hora de Abertura'
          value={ horaAbertura }
          onChange={ e => [setHoraAbertura(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='Hora de fechamento'
          value={ horaFechamento }
          onChange={ e => [setHoraFechamento(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='CNPJ'
          value={ cnpj }
          onChange={ e => [setCnpj(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='Nome Fantasia'
          value={ nomeFantasia }
          onChange={ e => [setNomeFantasia(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='Razão Social'
          value={ razaoSocial }
          onChange={ e => [setRazaoSocial(e.target.value), setErro('')] }
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

export default Empresa;
