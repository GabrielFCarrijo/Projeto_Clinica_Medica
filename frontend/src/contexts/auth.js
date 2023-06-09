import React, { createContext, useEffect, useState } from 'react';
import http from '../http';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const [user, setUser] = useState('');

  useEffect(async () => {
    // Toda vez que inicializar, verificar se há usuário
    const userToken = JSON.parse(localStorage.getItem('user_token'));

    if (userToken) {
      await http.get('/usuario')
        .then(res => res.data.find(u => u.email === userToken.email))
        .then(async u => setUser(await u))
        .catch(err => console.log(err));
    }

  }, []);


  async function login(email, senha) {
    // Pega o usuario
    const hasUser = await http.get('/usuario')
      .then(res => res.data.find(u => u.email === email && u.senha === senha))
      .catch(err => console.log(err));

    if (hasUser) {
      // Verifica e se existe ele coloca no localStorage
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('user_token', JSON.stringify({ email, token }))
      setUser(await hasUser);
      return;
    } else {
      return 'Email ou senha incorretos!';
    }
  }


  async function registrar(nome, cpf, email, senha, tipo='paciente') {
    // Verifica se já há esse email cadastrado
    const hasUser = await http.get('/usuario')
      .then(res => res.data.some(u => u.email === email))
      .catch(err => console.log(err));
    
    if (hasUser) return 'Já há usuário com esse Email cadastrado';

    await http.post('/usuario', {
      email: email,
      senha: senha,
      nome: nome,
      cpf: cpf,
      tipo: tipo,
    })
      .then(async res => {
        const token = Math.random().toString(36).substring(2);
        const Email = res.data.email;
        localStorage.setItem('user_token', JSON.stringify({ Email, token }))
        setUser(await res.data);
      })
      .catch(err => console.log(err));

    return;
  }

  async function cadastrarUserInterno(tipo, nome, cpf, email, senha) {

    try {
      const response = await http.post('/usuario', {
        tipo: tipo,
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err; 
    }

  }

  async function atualizarPerfil(id, nome, cpf, email, senha, tipo) {
    await http.put(`/usuario/${id}`, {
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senha,
      tipo: tipo
    })
      .then(async res => {
        alert('Cadastro atualizado com sucesso!');
        const token = Math.random().toString(36).substring(2);
        const Email = res.data.email;
        localStorage.setItem('user_token', JSON.stringify({ Email, token }))
        setUser(await res.data);
      })
      .catch(err => {
        alert('Algo de errado ao atualizar o cadastro aconteceu!');
        console.log(err);
      });
  }

  async function cadastrarConsulta(data, medico, paciente) {

    try {
      const response = await http.post('/consulta', {
        data: data,
        medico: medico,
        paciente: paciente
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err; 
    }

  }

  async function cadastraEmpresa(nome, endereco, horaAbertura, horaFechamento, cnpj, nomeFantasia, razaoSocial) {

    try {
      const response = await http.post('/empresa', {
        nome: nome,
        endereco: endereco,
        horaAbertura: horaAbertura,
        horaFechamento: horaFechamento,
        cnpj: cnpj,
        nomeFantasia: nomeFantasia,
        razaoSocial: razaoSocial
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err; 
    }

  }

  async function signout() {
    // deslogar
    setUser(null);
    localStorage.removeItem('user_token');
  }


  return (
    <AuthContext.Provider
      value={{
        user, logado: !!user,
        login, registrar, signout,
        atualizarPerfil,cadastrarUserInterno, cadastrarConsulta
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

