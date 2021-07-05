import { waitFor, waitForElementToBeRemoved } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios'
import routes from '../routes';
import { data } from '../mock/objects'
import { dataForTests as movementsData } from '../mock/objects'
import initApp from '../initApp';
import ru from '../locales/ru'

beforeEach(async () => {
  jest.useFakeTimers();
  render(await initApp());
});

afterEach(() => {
  mockAxios.reset();
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('options - render ui', async () => {
  const labelElement = await screen.findByText(ru.translation.ui.objectsLabel);
  const selectElement = await screen.findByDisplayValue(ru.translation.ui.objectsPlaceholder);
  expect(labelElement).toBeInTheDocument();
  expect(selectElement).toBeInTheDocument();
});

test('options - send correct request', () => {
  expect(mockAxios.get).toHaveBeenCalledWith(routes.objects());
});

test('options - disable ui element and show spinner while fetching', async () => {
  const spinner = await screen.findByRole('status');
  expect(spinner).toBeInTheDocument();
  const selectElement = await screen.findByDisplayValue(ru.translation.ui.objectsPlaceholder);
  expect (selectElement).toBeDisabled();
});

test('options - not show error and unlock ui after successful fetching', async () => {
  const spinner = await screen.findByRole('status');
  const selectElement = await screen.findByDisplayValue(ru.translation.ui.objectsPlaceholder);
  mockAxios.mockResponseFor(routes.objects(), { data });
  const errorFeedbackElement = screen.queryByRole('alert');
  expect(errorFeedbackElement).not.toBeInTheDocument();
  await waitForElementToBeRemoved(spinner);
  expect (selectElement).not.toBeDisabled();
});

test('options - fetching failed - show feedback', async () => {
  mockAxios.mockError({message: 'expectedError'});
  const errorFeedbackElement = await screen.findByText('expectedError');
  expect(errorFeedbackElement).toBeInTheDocument();
});

test('options - select option', async () => {
  const selectElement = await screen.findByDisplayValue(ru.translation.ui.objectsPlaceholder);
  mockAxios.mockResponseFor(routes.objects(), { data });
  await waitFor(() => {
    expect(selectElement).not.toBeDisabled();
  });
  userEvent.selectOptions(selectElement, data.data[0].name);
  const expectSelectedOption = await screen.findByText(data.data[0].name);
  expect(expectSelectedOption.selected).toBeTruthy();
});

test('movements - send correct request', async () => {
  const selectElement = await screen.findByDisplayValue(ru.translation.ui.objectsPlaceholder);
  mockAxios.mockResponseFor(routes.objects(), { data });
  await waitFor(() => {
    expect(selectElement).not.toBeDisabled();
  });
  userEvent.selectOptions(selectElement, data.data[0].name);
  // fetch objects data, render and select the first one option in select

  expect(mockAxios.get).toHaveBeenCalledWith(routes.objectMovements(1));
});

// test('movements - render table', async () => {
//   const selectElement = await screen.findByDisplayValue(ru.translation.ui.objectsPlaceholder);
//   mockAxios.mockResponseFor(routes.objects(), { data });
//   await waitFor(() => {
//     expect(selectElement).not.toBeDisabled();
//   })
//   userEvent.selectOptions(selectElement, data.data[0].name);
//   // fetch objects data, render and select the first one option in select

//   mockAxios.mockResponseFor(routes.objectMovements(1), { data: movementsData });
//   const rows = await screen.findByRole('row');
//   expected(rows.length).toBe(9);
// });