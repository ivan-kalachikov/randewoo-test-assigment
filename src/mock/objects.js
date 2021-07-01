const createObjectsMock = (mock) => {
  mock.onGet('/api/v1/objects').reply(200, {
    data: [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' },
    ],
  });
};

export default createObjectsMock;
