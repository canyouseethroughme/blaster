import * as Cookies from "js-cookie";
import {Konami, PATTERN_KONAMI, PATTERN_IDKFA} from "../util/keypattern-shortcut";

class FeatureFlag {
  flags : Flag[] = [];

  constructor() {
    this.setupFlags();
    this.init();
  }

  setupFlags() : void {
    this.addFlag(new FlagTestFilter());
    this.addFlag(new FlagTopics());
    this.addFlag(new FlagCapablityDelete());
  }

  init() : void {
    const ff_cookie = Cookies.get('blaster.ff');
    if (ff_cookie !== undefined) {
        const currentClientFlags = JSON.parse(atob(ff_cookie));
        var res = (Object as any).values(currentClientFlags);

        res.forEach((val : Flag, i : number) => {
            if (Object.keys(this.flags).find(valx => valx.valueOf() === val.name.valueOf())) {
                this.flags[val.name as any] = val;
            }
        })
    }
  }

  static setKeybinding() {
    new (Konami as any)('/featureflags', PATTERN_IDKFA);
    new (Konami as any)('/featureflags', PATTERN_KONAMI);
  }

    flagExists(name : string) : boolean {
        return name in this.flags;
    }

    addFlag(flag : Flag) : void {
        this.flags[flag.name as any] = flag;
    }

    getFlag(name : string) : Flag {
        return this.flags[name as any];
    }  
}

class Flag {
  enabled : boolean;
  name : string;
  description : string;
}

class FlagTestFilter extends Flag {
  constructor() {
      super();
      this.name = 'testfilter';
      this.description = "Show Capabilities that are deemed \"tests\"";
  }
}

class FlagTopics extends Flag {
  constructor() {
      super();
      this.name = 'topics';
      this.description = "Show Topic functionality on a Capability page";
  }
}

class FlagCapablityDelete extends Flag {
  constructor() {
      super();
      this.name = 'capabilitydelete';
      this.description = "Show Capability delete functionality on a Capability page";
  }
}

export default FeatureFlag;
export {FeatureFlag, Flag};