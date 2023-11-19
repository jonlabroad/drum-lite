import IRemoteDriver from "./IRemoteDriver";

export class NullDriver implements IRemoteDriver {
    send(topic: string, message: any): boolean {
        return true;
    }
}
