import EffectActivator from "./EffectActivator"
import EffectPriorityHandler from "./EffectPriorityHandler";
import BasicCombiner from "./combiners/BasicCombiner";
import LEDDriver from "../light/drivers/LEDDriver";
import Util from "../util/Util";
import IRemoteDriver from "../light/drivers/IRemoteDriver";

export interface RunnerOptions {
    periodMillis?: number
}

export default class EffectRunner {
    activator: EffectActivator;
    priorityHandler: EffectPriorityHandler;
    combiner: BasicCombiner;
    ledDriver: IRemoteDriver;
    driver: LEDDriver;
    runLeds: boolean;
    options: RunnerOptions;

    constructor(activator: EffectActivator, driver: IRemoteDriver, options: RunnerOptions) {
        this.activator = activator;
        this.priorityHandler = new EffectPriorityHandler();
        this.combiner = new BasicCombiner();
        this.ledDriver = driver;
        this.driver = new LEDDriver(this.ledDriver);
        this.runLeds = false;
        this.options = options;
    }

    public async run() {
        this.runLeds = true;
        while(this.runLeds) {
            const activeEffects = this.activator.getCurrentActiveEffects();
            this.priorityHandler.clear();
            for (let activeEffect of activeEffects) {
                this.priorityHandler.addLedEffect(activeEffect);
            }
            
            const mappedEffectsToRun = this.priorityHandler.getLeds()

            this.combiner.combine(mappedEffectsToRun);
            this.driver.runEffects(mappedEffectsToRun)

            await Util.sleep(this.options.periodMillis || 100);
        }
    }

    public clear() {
        this.driver.clear();
    }

    public stop() {
        this.runLeds = false;
    }

    public setActivator(activator: EffectActivator) {
        this.activator = activator;
    }
}