// Desc: Search bar component to search for a city
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <SearchContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <SearchButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

const SearchContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 30px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px;
  border-radius: 50px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  outline: none;
  backdrop-filter: blur(5px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SearchButton = styled(motion.button)`
  padding: 15px 25px;
  border-radius: 50px;
  border: none;
  background: #4facfe;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
`;

export default SearchBar;

