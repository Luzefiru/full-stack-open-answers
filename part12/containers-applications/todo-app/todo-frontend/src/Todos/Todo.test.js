import { screen, render } from '@testing-library/react';
import Todo from './Todo';

test('it should not render content when passing it as children', () => {
  render(<Todo>content</Todo>);
  expect(screen.getByText('content')).toBeInTheDocument();
});
