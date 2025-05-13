"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpirationCompletePublisher = void 0;
const common_1 = require("@himanshusarmaorg/common");
const common_2 = require("@himanshusarmaorg/common");
class ExpirationCompletePublisher extends common_1.BasePublisher {
    subject = common_2.Subjects.ExpirationComplete;
}
exports.ExpirationCompletePublisher = ExpirationCompletePublisher;
;
