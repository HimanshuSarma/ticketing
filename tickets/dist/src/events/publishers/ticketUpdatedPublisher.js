"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketUpdatedPublisher = void 0;
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
class TicketUpdatedPublisher extends common_1.BasePublisher {
    subject = common_2.Subjects.TicketUpdated;
}
exports.TicketUpdatedPublisher = TicketUpdatedPublisher;
;
