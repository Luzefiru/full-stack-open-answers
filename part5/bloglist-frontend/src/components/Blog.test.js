import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Blog from './Blog';

describe('the Blog component', () => {
  test('should render title & author, but not url or likes by default', () => {
    const testBlog = {
      title: 'A Test Title',
      author: 'Testy',
      url: 'https://test.com',
      likes: 7357,
      user: 'Not Testy',
    };

    render(<Blog blog={testBlog} />);

    expect(screen.getByText(/A Test Title/)).toBeInTheDocument();
    expect(screen.getByText(/Testy/)).toBeInTheDocument();
    expect(screen.queryByText(/https:\/\/test.com/)).not.toBeInTheDocument();
    expect(screen.queryByText(/7357/)).not.toBeInTheDocument();
  });
});
