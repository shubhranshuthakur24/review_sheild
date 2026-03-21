import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import ReplyEditor from '../ReplyEditor';
import { renderWithProviders } from '../../../test/test-utils';

describe('ReplyEditor', () => {
  const defaultProps = {
    reviewId: '1',
    onCancel: vi.fn(),
    onSuccess: vi.fn()
  };

  it('renders correctly', () => {
    renderWithProviders(<ReplyEditor {...defaultProps} />);
    expect(screen.getByPlaceholderText(/type your response here/i)).toBeInTheDocument();
    expect(screen.getByText(/post reply/i)).toBeInTheDocument();
  });

  it('updates text on change', () => {
    renderWithProviders(<ReplyEditor {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/type your response here/i);
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(textarea).toHaveValue('Hello');
  });

  it('applies template correctly', () => {
    renderWithProviders(<ReplyEditor {...defaultProps} />);
    const templateBtn = screen.getByText(/general thank you/i);
    fireEvent.click(templateBtn);
    expect(screen.getByPlaceholderText(/type your response here/i)).toHaveValue('Thank you for your kind words! We hope to see you again soon.');
  });

  it('triggers onCancel when cancel clicked', () => {
    renderWithProviders(<ReplyEditor {...defaultProps} />);
    const cancelBtn = screen.getByText(/cancel/i);
    fireEvent.click(cancelBtn);
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});
