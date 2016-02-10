// https://api.slack.com/types/channel
module.exports = function( b9 ){

  // define public property
  b9.channels = [];

  // define public method
  b9.channel = function( key ){
    var found;
    b9.channels.every(function( chan ){
      if ( chan.id === key || chan.name === key ){
        found = chan;
      }
      return !found;
    });
    return found;
  };

  // initialize the channels list
  // https://api.slack.com/methods/rtm.start
  b9.on('rtm.start', function( arg ){
    b9.channels = arg.channels;
  });

  // update the channels list
  // https://api.slack.com/events/channel_created
  b9.on('channel_created',function( msg ){
    b9.channels.push( msg.channel );
  });

  // update the channels list
  // https://api.slack.com/events/channel_rename
  b9.on('channel_rename',function( msg ){
    b9.channels.every(function( chan ){
      if ( chan.id === msg.channel.id ){
        chan.name = msg.channel.name;
        return false; // break
      }
      return true; // continue
    });
  });

  // update the channels list
  // https://api.slack.com/events/channel_deleted
  b9.on('channel_deleted',function( msg ){
    b9.channels = b9.channels.filter(function( chan ){
      if ( chan.id === msg.channel ){
        return false; // remove
      }
      return true; // preserve
    });
  });

  // update the channels list
  // https://api.slack.com/events/channel_archive
  b9.on('channel_archive',function( msg ){
    b9.channels.every(function( chan ){
      if ( chan.id === msg.channel ){
        chan.is_archived = true;
        return false; // break
      }
      return true; // continue
    });
  });

  // update the channels list
  // https://api.slack.com/events/channel_unarchive
  b9.on('channel_unarchive',function( msg ){
    b9.channels.every(function( chan ){
      if ( chan.id === msg.channel ){
        chan.is_archived = false;
        return false; // break
      }
      return true; // continue
    });
  });

};
