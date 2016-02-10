[![NPM](https://nodei.co/npm/b9-channels.png?compact=true)](https://nodei.co/npm/b9-channels/)<br />
[![Build Status](https://travis-ci.org/mhelgeson/b9-channels.svg?branch=master)](https://travis-ci.org/mhelgeson/b9-channels)
[![Coverage Status](https://coveralls.io/repos/github/mhelgeson/b9-channels/badge.svg?branch=master)](https://coveralls.io/github/mhelgeson/b9-channels?branch=master)
- - -

# b9-channels
A [b9](https://github.com/mhelgeson/b9) slack bot plugin, which provides and maintains an array of team channels.

## Methods

#### `b9.channel( key )`
Returns a channel object.

- **`key`** *`{String}`* <br />
The `id` or `name` of a channel to find.

## Properties

#### `b9.channels` *`{Array}`*
A list of channel objects, which the are visible to the bot. <br />
https://api.slack.com/types/channel

## Listeners

#### `"rtm.start"`
Initializes the `channels` list. <br />
https://api.slack.com/methods/rtm.start

#### `"channel_created"`
Adds a new channel to the the `channels` list. <br />
https://api.slack.com/events/channel_created

#### `"channel_rename"`
Updates an item in the `channels` list. <br />
https://api.slack.com/events/channel_rename

#### `"channel_deleted"`
Removes an item from the `channels` list. <br />
https://api.slack.com/events/channel_deleted

#### `"channel_archive"`
Updates an item in the `channels` list. <br />
https://api.slack.com/events/channel_archive

#### `"channel_unarchive"`
Updates an item in the `channels` list. <br />
https://api.slack.com/events/channel_unarchive
