import IRemoteDriver from "./IRemoteDriver";

export default class DebugDriver implements IRemoteDriver {
    send(topic: string, message: any): boolean {
        console.log(message);
        return true;
    }
}
