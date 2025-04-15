import mockOrdersData from './mockOrdersData';

const mockOrdersRepository = {
  findAll: jest
    .fn()
    .mockImplementation(async (criteria: { user_id: number }) => {
      return mockOrdersData.find((order) => order.user_id === criteria.user_id);
    }),
};

export default mockOrdersRepository;
