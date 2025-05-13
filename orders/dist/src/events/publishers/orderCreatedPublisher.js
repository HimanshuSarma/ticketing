"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedPublisher = void 0;
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
class OrderCreatedPublisher extends common_1.BasePublisher {
    subject = common_2.Subjects.OrderCreated;
}
exports.OrderCreatedPublisher = OrderCreatedPublisher;
;
