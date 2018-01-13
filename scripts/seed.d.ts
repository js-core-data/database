import { NappJS, NappJSModule } from 'nappjs';
export default class NappJSCoreDataSeedScript extends NappJSModule {
    start(napp: NappJS, seed: string | null): Promise<any>;
}
