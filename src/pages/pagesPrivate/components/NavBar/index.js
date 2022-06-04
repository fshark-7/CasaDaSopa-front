import { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  MdGroups, MdPerson, MdHome, MdHomeWork, MdLogout,
} from 'react-icons/md';
import { AuthContext } from '../../../../context/auth';

import { Menu, LogoutContent } from './styles';

export default function NavBar({ closeMenu }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu>
      <Link onClick={closeMenu} to="/adm/">
        <li>
          <MdHome className="ico" />
          Dashboard
        </li>
      </Link>
      <Link onClick={closeMenu} to="/adm/colaboradores">
        <li>
          <MdPerson className="ico" />
          Colaboradores
        </li>
      </Link>
      <Link onClick={closeMenu} to="/adm/grupos">
        <li>
          <MdGroups className="ico" />
          Grupos
        </li>
      </Link>
      <Link onClick={closeMenu} to="/adm/familias">
        <li>
          <MdGroups className="ico" />
          Famílias
        </li>
      </Link>
      <Link onClick={closeMenu} to="/adm/entidades">
        <li>
          <MdHomeWork className="ico" />
          Entidades
        </li>
      </Link>

      <LogoutContent onClick={handleLogout}>
        <h3>Sair</h3>
        <MdLogout />
      </LogoutContent>
    </Menu>
  );
}
