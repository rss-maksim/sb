import { describe, it, expect } from 'vitest';
import { greet } from './utils';

describe('greet', () => {
  it('should greet the user by name', () => {
    expect(greet('Alice')).toBe('Hello, Alice!');
  });
});
