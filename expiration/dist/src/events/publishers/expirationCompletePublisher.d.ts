import { BasePublisher } from "@himanshusarmaorg/common";
import { IExpirationCompleteEvent } from "@himanshusarmaorg/common";
import { Subjects } from "@himanshusarmaorg/common";
declare class ExpirationCompletePublisher extends BasePublisher<IExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete;
}
export { ExpirationCompletePublisher };
