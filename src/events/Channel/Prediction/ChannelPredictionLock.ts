import {
  ChannelPredictionLockEvent,
  ChannelPredictionLockSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelPredictionLock extends BaseEvent<ChannelPredictionLockEvent> implements ChannelPredictionLockSubscription {
  readonly type = "channel.prediction.lock";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    const permissions = ["channel:read:predictions", "channel:manage:predictions"];
    return (tokenPermissions: string[]) => {
      if (!tokenPermissions.some((permission) => permissions.includes(permission))) {
        return [permissions[0]];
      }
      return [];
    };
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelPredictionLockEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
