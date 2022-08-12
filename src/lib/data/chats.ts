export interface Guild {
  guild_id: string;
  name: string;
  description: string;
  icon: string;
  owner_id: string;
  channels: Array<Channel>;
}

export interface Channel {
  channel_id: string;
  guild_id: string;
  name: string;
  description: string;
}
