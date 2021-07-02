const data = {
  data: [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ],
};

const createObjectsMock = (mock) => {
  mock.onGet('/api/v1/objects').reply(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, data]);
    }, 1000);
  }));
};

export default createObjectsMock;
