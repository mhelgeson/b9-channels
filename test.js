var assert = require('assert');
var B9 = require('b9');

describe('src/index', function(){

  var bot = new B9({ package:false });
  bot.install( require('./index') );

  it('initializes channels on `rtm.start`',function(){
    // simulate event
    bot.emit('rtm.start',{
      channels: [
        { id: "C001", name: "General", is_archived: false },
        { id: "C002", name: "Random", is_archived: false }
      ]
    });
    assert.equal( Array.isArray( bot.channels ), true );
    assert.equal( bot.channels.length, 2 );
    assert.equal( bot.channels[0].name, 'General' );
  });

  it('updates channels on `channel_created`',function(){
    // simulate event
    bot.emit('channel_created',{
      channel: { id: "C003", name: "Channel 3" }
    });
    assert.equal( bot.channels.length, 3 );
    assert.equal( bot.channels[2].name, 'Channel 3' );
  });

  it('updates channels on `channel_rename`',function(){
    // simulate event
    bot.emit('channel_rename',{
      channel: { id: "C003", name: "Channel Three" }
    });
    assert.equal( bot.channels.length, 3 );
    assert.equal( bot.channels[2].name, 'Channel Three' );
  });

  it('updates channels on `channel_deleted`',function(){
    // simulate event
    bot.emit('channel_deleted',{ channel: "C003" });
    assert.equal( bot.channels.length, 2 );
    assert.equal( bot.channels[0].name, 'General' );
    assert.equal( bot.channels[2], undefined );
  });

  it('updates channels on `channel_archive`',function(){
    // simulate event
    bot.emit('channel_archive',{ channel: "C002" });
    assert.equal( bot.channels[1].name, 'Random' );
    assert.equal( bot.channels[1].is_archived, true );
  });

  it('updates channels on `channel_unarchive`',function(){
    // simulate event
    bot.emit('channel_unarchive',{ channel: "C002" });
    assert.equal( bot.channels[1].name, 'Random' );
    assert.equal( bot.channels[1].is_archived, false );
  });

});
