import React from 'react';
import { AiOutlineUser, AiOutlineFileAdd } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { HiOutlineHome } from 'react-icons/hi';
import { TbFile, TbSocial } from 'react-icons/tb';
import * as C from './styles';

import Header from '../../components/Header';
import Acesso from './components/Acesso';

function Home() {

  return (
    <C.HomeContainer>
      <Header />
      <C.HomeBody>
        <C.Acessos>
          <Acesso
            Text='Redes Sociais'
            Icon={ TbSocial }
            bgColor='#696969'
          />
          <Acesso
            Text='Nova Consulta'
            Icon={ AiOutlineFileAdd }
            bgColor='#696969'
          />
          <Acesso
            Text='Meu Perfil'
            to='/perfil'
            Icon={ AiOutlineUser }
            bgColor='#696969'
          />
        </C.Acessos>
      </C.HomeBody>
      <C.Footer>
        <Acesso
          Text='Inicio'
          Icon={ HiOutlineHome }
          color='#fff'
        />
        <Acesso
          Text='Suporte'
          Icon={ BsWhatsapp }
          color='#fff'
        />
        <Acesso
          Text='Minhas Consultas'
          Icon={ TbFile }
          color='#fff'
        />
      </C.Footer>
    </C.HomeContainer>
  );

}

export default Home;
