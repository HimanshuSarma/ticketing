"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelledPublisher = void 0;
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
class OrderCancelledPublisher extends common_1.BasePublisher {
    subject = common_2.Subjects.OrderCancelled;
}
exports.OrderCancelledPublisher = OrderCancelledPublisher;
;
