export default interface IRemoteDriver {
    send(topic: string, message: any): any;
}