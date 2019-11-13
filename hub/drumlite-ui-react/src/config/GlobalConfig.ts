import io from "socket.io-client";

export default class GlobalConfig {
    public static readonly socketUri = "http://localhost:3000";
    public static readonly socket = io(GlobalConfig.socketUri);
}