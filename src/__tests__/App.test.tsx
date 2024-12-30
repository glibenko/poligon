/**
 * @format
 */

import 'react-native';
import React, { act } from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import { afterAll, describe, expect, jest, test } from '@jest/globals';

jest.mock('../Splash', () => {
  return {
    AnimatedBootSplash: () => {
      return <></>;
    },
  };
});

jest.mock('../keys.ts', () => {
  return {
    API_KEY: 'API_KEY_TEST',
  };
});

import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import axios from 'axios';
import tickersRes from '../__stubs__/tickersRes';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('happy case', async () => {
    mockedAxios.mockResolvedValueOnce({ data: tickersRes });
    mockedAxios.mockResolvedValueOnce({
      data: {
        results: [
          {
            ticker: 'X:A8USD',
            name: 'Ancient8 - United States dollar',
          },
        ],
      },
    });
    render(<App />);
    expect(screen.getByTestId('search')).toBeTruthy();
    expect(screen.getByTestId('loadingEmpty')).toBeTruthy();

    await waitFor(() => {
      expect(mockedAxios.mock.calls).toHaveLength(1);
    });
    await waitFor(() => {
      expect(screen.getByTestId('list')).toBeTruthy();
    });
    expect(screen.queryByTestId('loadingEmpty')).toBeFalsy();
    expect(screen.getByText('X:00USD')).toBeTruthy();
    expect(screen.getByText('00 Token - United States dollar')).toBeTruthy();

    jest.useFakeTimers();
    const user = userEvent.setup();
    user.paste(screen.getByTestId('search'), 'test search');
    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(mockedAxios.mock.calls).toHaveLength(2);
    });
    expect(screen.getByTestId('loadingEmpty')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('X:A8USD')).toBeTruthy();
    });
    expect(screen.getByText('Ancient8 - United States dollar')).toBeTruthy();
  });
});
