import React, { createContext, useEffect, useState } from 'react';
import http from '../http';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const [user, setUser] = useState('');

  useEffect(() => {
    // Toda vez que inicializar, verificar se há usuário
    const userToken = localStorage.getItem('user_token');
  
    if (userToken) {
      http.get('/usuario')
        .then(res => res.data.find(u => u.email === userToken.email))
        .then(u => setUser(u))
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
      setUser({ email, senha });
      return;
    } else {
      return 'Email ou senha incorretos!';
    }
  }


  async function registrar(nome, cpf, email, senha, tipo='P') {
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
      .then(res => {
        const token = Math.random().toString(36).substring(2);
        const Email = res.data.email;
        const Senha = res.data.senha;
        localStorage.setItem('user_token', JSON.stringify({ Email, token }))
        setUser({ Email, Senha });
      })
      .catch(err => console.log(err));

    return;
  }


  async function signout() {
    // deslogar
    setUser(null);
    localStorage.removeItem('user_token');
  }


  return (
    <AuthContext.Provider
      value={{ user, logado: !!user, login, registrar, signout }}
    >
      {children}
    </AuthContext.Provider>
  );

}

