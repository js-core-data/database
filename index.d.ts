import { NappJS, NappJSModule } from 'nappjs';
export default class NappJSCoreData extends NappJSModule {
    register(napp: NappJS): Promise<void>;
    start(napp: NappJS): Promise<any>;
}
