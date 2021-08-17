import { useEffect } from 'react';
import * as TMI from 'tmi.js';

const options = {
	channels: ["#ryzingtest"],
	connection: {
		reconnect: true,
		secure: true
	},
};

const SUPER_USERS = [ // LOWERCASE OK
  'ryzingphoenixeuw', 'studytme'
]

const isSuperUser = (tags) => {
  return SUPER_USERS.includes(tags['display-name'].toLowerCase())
}

export default function useTwitch(onCommand) {
  useEffect(() => {
    const client = TMI.Client(options);
    client.on('message', (channel, tags, message, self) => {
      if (self) return;
      if (message[0] === '!' && message.length > 1) {
        var args = message.substr(1).split(' ');
        var command = args.shift();
        if (onCommand) {
          onCommand(channel, command, args, message, isSuperUser(tags))
        }
      }
    });
    client.connect();

    return () => {
      client.disconnect();
    }
  }, []);
}