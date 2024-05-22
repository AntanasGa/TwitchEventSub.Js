import {
  ChannelPredictionEndEvent,
  ChannelPredictionEndSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

// FIXME: alternatively requires channel:manage:predictions
export default class ChannelPredictionEnd extends BaseEvent<ChannelPredictionEndEvent> implements ChannelPredictionEndSubscription {
  readonly type = "channel.prediction.end";
  readonly version = "1";
  readonly permissions = ["channel:read:predictions"];

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelPredictionEndEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
