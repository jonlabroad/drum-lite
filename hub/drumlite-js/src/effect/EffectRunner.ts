import EffectPriorityHandler from "./EffectPriorityHandler";
import Util from "../util/Util";
import InstructionExecutor from "../driver/InstructionExecutor";
import IRemoteDriver from "../driver/IRemoteDriver";
import EffectActivator from "./EffectActivator";

export interface RunnerOptions {
    periodMillis?: number
}

export default class EffectRunner {
    activator: EffectActivator;
    priorityHandler: EffectPriorityHandler;
    ledDriver: IRemoteDriver;
    executor: InstructionExecutor;
    runLeds: boolean;
    options: RunnerOptions;

    constructor(activator: EffectActivator, driver: IRemoteDriver, options: RunnerOptions) {
        this.activator = activator;
        this.priorityHandler = new EffectPriorityHandler();
        this.ledDriver = driver;
        this.executor = new InstructionExecutor(this.ledDriver);
        this.runLeds = false;
        this.options = options;
    }

    public async run() {
        this.runLeds = true;
        while(this.runLeds) {
            const t = new Date().getTime();
            const activeEffects = this.activator.getCurrentActiveEffects();
            this.priorityHandler.clear();
            for (let activeEffect of activeEffects) {
                const instructions = activeEffect.getInstructions(t);
                instructions.map(instruction => this.priorityHandler.addLedEffect(instruction));
            }
            
            const mappedEffectsToRun = this.priorityHandler.getLeds();

            // TODO combiner or no combiner?
            this.executor.runEffects(mappedEffectsToRun)

            await Util.sleep(this.options.periodMillis || 10);
        }
    }

    public clear() {
        this.executor.clear();
    }

    public stop() {
        this.runLeds = false;
    }

    public setActivator(activator: EffectActivator) {
        this.activator = activator;
    }
}