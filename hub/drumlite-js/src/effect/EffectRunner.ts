import EffectActivator from "./EffectActivator"
import EffectPriorityHandler from "./EffectPriorityHandler";
import BasicCombiner from "./combiners/BasicCombiner";
import SocketIODriver from "../light/drivers/SocketIODriver";
import LEDDriver from "../light/drivers/LedDriver";
import Util from "../util/Util";
import IRemoteDriver from "../light/drivers/IRemoteDriver";

export default class EffectRunner {
    activator: EffectActivator;
    priorityHandler: EffectPriorityHandler;
    combiner: BasicCombiner;
    ledDriver: IRemoteDriver;
    driver: LEDDriver;
    isRunning: boolean;

    constructor(activator: EffectActivator, driver: IRemoteDriver) {
        this.activator = activator;
        this.priorityHandler = new EffectPriorityHandler();
        this.combiner = new BasicCombiner();
        this.ledDriver = driver;
        this.driver = new LEDDriver(this.ledDriver);
        this.isRunning = false;
    }

    public async run() {
        while(true) {
            if (this.isRunning) {
                return;
            }
            this.isRunning = true;
            
            const activeEffects = this.activator.getCurrentActiveEffects();
            this.priorityHandler.clear();
            for (let activeEffect of activeEffects) {
                this.priorityHandler.addLedEffect(activeEffect);
            }
            
            const mappedEffectsToRun = this.priorityHandler.getLeds()

            this.combiner.combine(mappedEffectsToRun);
            this.driver.runEffects(mappedEffectsToRun)

            this.isRunning = false;
            await Util.sleep(100);
        }
    }
}