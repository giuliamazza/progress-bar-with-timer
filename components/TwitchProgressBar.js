import { useState, useCallback } from 'react';
import ProgressBar from './ProgressBar'
import useTwitch from '../lib/useTwitch'

export default function TwitchProgressBar({duration: defaultDuration, max: defaultMax, color}) {
  const [duration, setDuration] = useState(defaultDuration);
  const [add, setAdd] = useState(0);
  const [max, setMax] = useState(defaultMax);
  const [current, setCurrent] = useState(1);

  const onCommand = useCallback(
    (channel, command, args, message, superuser) => {
      console.log(channel, command, args, message, superuser)
      switch (command) {
        case 'setmax': {
          if (args.length >= 1 && superuser) {
            const max = parseInt(args[0]);
            setMax(max);
          }
          break;
        }
        case 'setcurrent': {
          if (args.length >= 1 && superuser) {
            const current = parseInt(args[0]);

            if (current > max)
              setMax(current);

            setCurrent(current);
          }
          break;
        }
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
        case 'next': {
          if (args.length >= 0 && superuser) {
            if (current + 1 > max)
              setMax(current + 1);

            setCurrent(current + 1);
          }
          break;
        }
      }
    }, 
    [add]
  );

  useTwitch(onCommand);

  return (<ProgressBar duration={duration} add={add} max={max} current={current} color={color} />);
}