import { render, screen, fireEvent, getByAltText } from '@testing-library/react';
import {Book} from './Book';
import '@testing-library/jest-dom';
import trash from "../../media/delete.svg";
//import { Trash } from '../mocks/Trash';



// Arrange : Define the actual book data for testing
const actualBookData = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
};

test('renders book title and author', () => {
  
    // Render the Book component with the actual book data
  render(<Book book={actualBookData} onDelete={() => {}} />);

  // Act: Use screen.getByText to find elements by their text content
  const titleElement = screen.getByText('The Great Gatsby');
  const authorElement = screen.getByText('by: F. Scott Fitzgerald');

  // Assert
  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();
  expect(titleElement).toHaveClass('booktitle');
  expect(authorElement).toHaveClass('bookauthor');
});

test('renders an Trash with the correct alt text and ClassName', ()=> {
  // Arrange
  const onDelete = jest.fn()

  const {getByAltText, container} = render(<Book book={actualBookData} onDelete={onDelete} />);
  

  // Act
  const trashImage = getByAltText('delete');
  
  //Assert
  expect(trashImage).toBeInTheDocument();
  expect(trashImage).toHaveClass('bookcard--iconeTrash');
  
})


