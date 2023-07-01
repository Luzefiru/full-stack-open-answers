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
      user: {},
    };

    render(<Blog blog={testBlog} />);

    expect(screen.getByText(/A Test Title/)).toBeInTheDocument();
    expect(screen.getByText(/Testy/)).toBeInTheDocument();
    expect(screen.queryByText(/https:\/\/test.com/)).not.toBeInTheDocument();
    expect(screen.queryByText(/7357/)).not.toBeInTheDocument();
  });

  test('shows the url and likes only after clicking the button to toggle details', () => {
    const testBlog = {
      title: 'A Test Title',
      author: 'Testy',
      url: 'https://test.com',
      likes: 7357,
      user: {},
    };

    render(<Blog blog={testBlog} />);

    expect(screen.queryByText(/https:\/\/test.com/)).not.toBeInTheDocument();
    expect(screen.queryByText(/7357/)).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(screen.queryByText(/https:\/\/test.com/)).toBeInTheDocument();
    expect(screen.queryByText(/7357/)).toBeInTheDocument();
  });

  test('ensures the refreshBlogs function is called twice after pressing the like button twice', () => {
    const testBlog = {
      title: 'A Test Title',
      author: 'Testy',
      url: 'https://test.com',
      likes: 7357,
      user: {},
    };

    const mockHandler = jest.fn();

    render(
      <Blog
        blog={testBlog}
        refreshBlogs={jest.fn()}
        token="testToken"
        notifySuccess={mockHandler}
        notifyFailure={jest.fn()}
      />
    );

    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByText('like'));
    userEvent.click(screen.getByText('like'));

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
