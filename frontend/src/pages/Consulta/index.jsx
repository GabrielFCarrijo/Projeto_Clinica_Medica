import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from './styles';

import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

function Consulta() {

  const { cadastrarConsulta } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState('');
  const [paciente, setPaciente] = useState('');
  const [medico, setMedico] = useState('');
  const [erro, setErro] = useState('');
  
  async function handleRegistrar() {
    if (!data || !medico || !paciente) {
      setErro('Preencha todos os campos!');
      return;
    }

    const res = await cadastrarConsulta(data, medico, paciente);

    if (!res?._id) {
      setErro(res);
      return;
    }else{
        alert('Consulta Cadastrado com sucesso!');
        setData('');
        setMedico('');
        setPaciente('');        
    }

  }

  return (
    <C.RegisterContainer>
      <C.Title>Cadastrar Consulta</C.Title>

      <C.FormContainer>
        <InputMask
          type='text'
          placeholder='Data'
          value={ data }
          onChange={ e => [setData(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='Paciente'
          value={ paciente }
          onChange={ e => [setPaciente(e.target.value), setErro('')] }
        />
        <Input
          type='text'
          placeholder='Médico'
          value={ medico }
          onChange={ e => [setMedico(e.target.value), setErro('')] }
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

export default Consulta;
