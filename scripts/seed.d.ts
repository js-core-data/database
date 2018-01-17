import { NappJS, NappJSScript } from 'nappjs';
export default class NappJSCoreDataSeedScript extends NappJSScript {
    run(napp: NappJS, seed: string | null): Promise<any>;
}
