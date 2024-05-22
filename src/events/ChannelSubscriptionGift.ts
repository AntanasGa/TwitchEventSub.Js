import {
  ChannelSubscriptionGiftEvent,
  ChannelSubscriptionGiftSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

export default class ChannelSubscriptionGift extends BaseEvent<ChannelSubscriptionGiftEvent> implements ChannelSubscriptionGiftSubscription {
  readonly type = "channel.subscription.gift";
  readonly version = "1";
  readonly permissions = ["channel:read:subscriptions"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelSubscriptionGiftEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
