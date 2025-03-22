import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <NavContainer>
      <Logo to="/">
        <LogoIcon>☁️</LogoIcon>
        <LogoText>WeatherPulse</LogoText>
      </Logo>
      
      <NavLinks>
        <NavItem 
          isActive={location.pathname === '/'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink to="/">Dashboard</NavLink>
        </NavItem>
        
        <NavItem 
          isActive={location.pathname === '/preferences'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink to="/preferences">Preferences</NavLink>
        </NavItem>
        
        <ThemeToggle 
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </ThemeToggle>
      </NavLinks>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${props => props.theme.text};
`;

const LogoIcon = styled.span`
  font-size: 1.8rem;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavItem = styled(motion.div)`
  padding: 8px 12px;
  border-radius: 8px;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  font-weight: 500;
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

export default Navbar;
