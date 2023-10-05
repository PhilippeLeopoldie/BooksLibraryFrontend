import { render, screen, fireEvent } from '@testing-library/react';
import {Book} from './Book';
import '@testing-library/jest-dom'


test('renders book title and author', () => {
  // Define the actual book data for testing
  const actualBookData = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  };

  // Render the Book component with the actual book data
  render(<Book book={actualBookData} onDelete={() => {}} />);

  // Use screen.getByText to find elements by their text content
  const titleElement = screen.getByText('The Great Gatsby');
  const authorElement = screen.getByText('by: F. Scott Fitzgerald');

  // Assert that the elements are in the document
  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();

  // Assert that the elements have the expected class names
  expect(titleElement).toHaveClass('booktitle');
  expect(authorElement).toHaveClass('bookauthor');
});
