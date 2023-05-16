import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';
import * as C from './styles';

import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

function Perfil() {

  const { user, atualizarPerfil } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [Cpf, setCpf] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (user && atualizarPerfil) {
      setNome(user.nome);
      setEmail(user.email);
      setCpf(user.cpf);
      return () => {};
    }
  }, [user, atualizarPerfil]);


  async function handleAttPerfil() {
    if (!nome || !email || !Cpf) {
      alert('Preencha todos os campos obrigatórios!');
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

    const id = await user._id;
    const senha = await user.senha;
    const tipo = await user.tipo;

    await atualizarPerfil(id, nome, Cpf, email, senha, tipo);

    navigate('/');
  }


  return (
    <C.Container>
      <Header />
      <C.PerfilBody>
        <C.FormContainer>
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
            placeholder='123.456.789-00'
            mask='999.999.999-99'
            value={ Cpf }
            onChange={ e => [setCpf(e.target.value), setErro('')] }
          />
          <C.ErrorLabel>{ erro }</C.ErrorLabel>
          <Button
            Text='Atualizar Perfil'
            onClick={ handleAttPerfil }
          />
        </C.FormContainer>
      </C.PerfilBody>
    </C.Container>
  );

}


export default Perfil;
