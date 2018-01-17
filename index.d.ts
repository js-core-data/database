import { NappJS, NappJSService } from 'nappjs';
export default class NappJSCoreData extends NappJSService {
    database: any;
    constructor();
    private schemaLoaded;
    loadSchema(): Promise<any>;
    syncSchema(options: any): Promise<void>;
    createContext(): any;
    start(napp: NappJS): Promise<any>;
    stop(napp: NappJS): Promise<any>;
}
