"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCreatedPublisher = void 0;
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
class TicketCreatedPublisher extends common_1.BasePublisher {
    subject = common_2.Subjects.TicketCreated;
}
exports.TicketCreatedPublisher = TicketCreatedPublisher;
;
