// src/__tests__/SearchBar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('calls onSearch with input value on form submission', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    const submitButton = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(submitButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Paris');
  });
});

