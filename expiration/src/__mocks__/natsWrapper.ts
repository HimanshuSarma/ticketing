export const natsWrapper = {
  client: {
    // subscriptionOptions: jest.fn(),
    publish: jest.fn().mockImplementation(
      (subject: string, data: string, callback: () => void) => {
        callback();
      }
    )
  }
};