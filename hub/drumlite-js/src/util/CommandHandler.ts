import EffectRunner from "../effect/EffectRunner";

export type CommandMessageType = "RunControl"

export class CommandMessage {
    type: CommandMessageType

    constructor(type: CommandMessageType) {
        this.type = type;
    }
}

export type RunCommandType = "RUN" | "STOP"
export class RunCommand extends CommandMessage {
    command: RunCommandType

    constructor(cmd: RunCommandType) {
        super("RunControl");
        this.command = cmd;
    }
}

export default class CommandHandler {
    runner: EffectRunner
    
    constructor(runner: EffectRunner) {
        this.runner = runner;
    }

    public async handle(message: CommandMessage) {
        switch (message.type) {
            case "RunControl":
                return await this.handleRunControl(message as RunCommand);
            default:
                console.warn(`Do not know how to process messages of type ${message.type}`)
        }
    }

    private async handleRunControl(cmd: RunCommand) {
        if (cmd.command === "RUN") {
            console.log("RUN");
            this.runner.run();
        } else if (cmd.command === "STOP") {
            console.log("STOP");
            await this.runner.stop();
        }
    }
}