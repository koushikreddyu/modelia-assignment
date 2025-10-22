import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// automatically unmount React trees after each test
afterEach(() => cleanup());

expect.extend({
  // optional custom matchers if needed
});
