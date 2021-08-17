import { useState, useCallback } from 'react';
import ProgressBar from './ProgressBar'
import useTwitch from '../lib/useTwitch'

export default function TwitchProgressBar({duration: defaultDuration, color}) {
  const [duration, setDuration] = useState(defaultDuration);
  const [add, setAdd] = useState(0);

  const onCommand = useCallback(
    (channel, command, args, message, superuser) => {
      console.log(channel, command, args, message, superuser)
      switch (command) {
        case 'set': {
          if(args.length >= 1 && superuser) {
            const time = parseInt(args[0]);
            setDuration(time);
            setAdd(0);
          }
          break;
        }
        case 'add': {
          if(args.length >= 1 && superuser) {
            const time = parseInt(args[0]);
            setAdd(add + time);
          }
          break;
        }
      }
    }, 
    [add]
  );

  useTwitch(onCommand);

  return (<ProgressBar duration={duration} add={add} color={color} />);
}