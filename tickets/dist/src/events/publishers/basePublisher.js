"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePublisher = void 0;
class BasePublisher {
    client;
    constructor(client) {
        this.client = client;
    }
    publish(data) {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(`Event published`);
                    resolve();
                }
            });
        });
    }
}
exports.BasePublisher = BasePublisher;
;
