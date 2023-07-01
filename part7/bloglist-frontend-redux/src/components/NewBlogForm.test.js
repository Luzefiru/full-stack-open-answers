import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NewBlogForm from './NewBlogForm';

describe('the NewBlogForm component', () => {
  test('calls the event handler with correct details to make a new blog', () => {
    const testArgs = { title: 'Test Title', author: 'Testy', url: 'test.com' };
    const resultArgs = {};

    const handleCreateBlog = jest.fn(({ title, author, url }) => {
      resultArgs.title = title;
      resultArgs.author = author;
      resultArgs.url = url;
    });

    render(<NewBlogForm createBlog={handleCreateBlog} />);

    userEvent.type(screen.getByPlaceholderText('Title'), testArgs.title);
    userEvent.type(screen.getByPlaceholderText('Author'), testArgs.author);
    userEvent.type(screen.getByPlaceholderText('URL'), testArgs.url);

    userEvent.click(screen.getByRole('button'));

    expect(handleCreateBlog.mock.calls).toContainEqual([
      { title: 'Test Title', author: 'Testy', url: 'test.com' },
    ]);
  });
});
