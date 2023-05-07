import React, {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    setNome(user.nome);
    setEmail(user.email);
    setCpf(user.cpf);
  }, []);


  async function handleAttPerfil() {
    if (!nome || !email || !cpf) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const id = await user._id;
    const senha = await user.senha;
    const tipo = await user.tipo;

    await atualizarPerfil(id, nome, cpf, email, senha, tipo);

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
            onChange={e => setNome(e.target.value)}
          />
          <Input
            type='email'
            placeholder='exemplo@email.com'
            value={ email }
            onChange={e => setEmail(e.target.value)}
          />
          <InputMask
            placeholder='123.456.789-00'
            mask='999.999.999-99'
            value={ cpf }
            onChange={e => setCpf(e.target.value)}
          />
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
