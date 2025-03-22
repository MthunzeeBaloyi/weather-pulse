import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const Preferences = () => {
  const { theme, temperatureUnit, notifications, updatePreferences } = useContext(ThemeContext);
  
  const [preferences, setPreferences] = useState({
    temperatureUnit: temperatureUnit,
    defaultCity: '',
    notifications: notifications,
    theme: theme
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  
  // Update local state when context changes
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      temperatureUnit,
      notifications,
      theme
    }));
  }, [temperatureUnit, notifications, theme]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      // Update preferences in context
      updatePreferences({
        theme: preferences.theme,
        temperatureUnit: preferences.temperatureUnit,
        notifications: preferences.notifications
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStatus({
        loading: false,
        success: true,
        error: null
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({
          loading: false,
          success: false,
          error: 'Failed to save preferences'
        });
      }
    };
    
    return (
      <PreferencesContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>User Preferences</h1>
        <p>Customize your WeatherPulse experience</p>
        
        <PreferencesForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Temperature Unit</Label>
            <Select 
              name="temperatureUnit" 
              value={preferences.temperatureUnit}
              onChange={handleChange}
            >
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Default City</Label>
            <Input 
              type="text" 
              name="defaultCity"
              value={preferences.defaultCity}
              onChange={handleChange}
              placeholder="Enter your default city"
            />
          </FormGroup>
          
          <FormGroup>
            <CheckboxContainer>
              <Checkbox 
                type="checkbox" 
                name="notifications"
                checked={preferences.notifications}
                onChange={handleChange}
                id="notifications"
              />
              <CheckboxLabel htmlFor="notifications">
                Enable weather notifications
              </CheckboxLabel>
            </CheckboxContainer>
          </FormGroup>
          
          <FormGroup>
            <Label>Theme</Label>
            <ThemeOptions>
              <ThemeOption>
                <RadioInput 
                  type="radio" 
                  name="theme"
                  value="dark"
                  checked={preferences.theme === 'dark'}
                  onChange={handleChange}
                  id="darkTheme"
                />
                <RadioLabel htmlFor="darkTheme">Dark</RadioLabel>
              </ThemeOption>
              
              <ThemeOption>
                <RadioInput 
                  type="radio" 
                  name="theme"
                  value="light"
                  checked={preferences.theme === 'light'}
                  onChange={handleChange}
                  id="lightTheme"
                />
                <RadioLabel htmlFor="lightTheme">Light</RadioLabel>
              </ThemeOption>
            </ThemeOptions>
          </FormGroup>
          
          <SaveButton 
            type="submit"
            disabled={status.loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status.loading ? 'Saving...' : 'Save Preferences'}
          </SaveButton>
          
          {status.success && (
            <SuccessMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Preferences saved successfully!
            </SuccessMessage>
          )}
          
          {status.error && (
            <ErrorMessage>
              {status.error}
            </ErrorMessage>
          )}
        </PreferencesForm>
      </PreferencesContainer>
    );
  };
  
  const PreferencesContainer = styled(motion.div)`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      text-align: center;
    }
    
    p {
      text-align: center;
      margin-bottom: 30px;
      opacity: 0.8;
    }
  `;
  
  const PreferencesForm = styled.form`
    background: ${props => props.theme.cardBg};
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;
  
  const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;
  
  const Label = styled.label`
    font-size: 1.1rem;
    margin-bottom: 5px;
  `;
  
  const Input = styled.input`
    padding: 12px 15px;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.text};
    font-size: 1rem;
    
    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.15);
    }
  `;
  
  const Select = styled.select`
    padding: 12px 15px;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.text};
    font-size: 1rem;
    
    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.15);
    }
    
    option {
      background: #2a5298;
      color: white;
    }
  `;
  
  const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `;
  
  const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;
  `;
  
  const CheckboxLabel = styled.label`
    font-size: 1.1rem;
    cursor: pointer;
  `;
  
  const ThemeOptions = styled.div`
    display: flex;
    gap: 20px;
  `;
  
  const ThemeOption = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  const RadioInput = styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;
  `;
  
  const RadioLabel = styled.label`
    font-size: 1.1rem;
    cursor: pointer;
  `;
  
  const SaveButton = styled(motion.button)`
    padding: 15px;
    border-radius: 8px;
    border: none;
    background: ${props => props.theme.accent};
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `;
  
  const SuccessMessage = styled(motion.div)`
    background: rgba(46, 213, 115, 0.2);
    color: #2ed573;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    margin-top: 10px;
  `;
  
  const ErrorMessage = styled.div`
    background: rgba(255, 71, 87, 0.2);
    color: #ff4757;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    margin-top: 10px;
  `;
  
  export default Preferences;
  