"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsWrapper = void 0;
exports.natsWrapper = {
    client: {
        // subscriptionOptions: jest.fn(),
        publish: jest.fn().mockImplementation((subject, data, callback) => {
            callback();
        })
    }
};
