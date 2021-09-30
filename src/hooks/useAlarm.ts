import { useEffect, useRef } from "preact/hooks";

import { noop } from "../utils/common";

import src from "../assets/alarm.ogg";

type AudioObj = {
  ctx: AudioContext;
  elem: HTMLAudioElement;
};

export const useAlarm = (enabled: boolean, handleFinish: () => void): void => {
  const audioObj = useRef<AudioObj>(null);

  useEffect(() => {
    const audioElement = new Audio(src);

    const audioCtx = new AudioContext();

    const track = audioCtx.createMediaElementSource(audioElement);
    track.connect(audioCtx.destination);

    const newAudioObj: AudioObj = {
      ctx: audioCtx,
      elem: audioElement,
    };

    audioObj.current = newAudioObj;

    return () => {
      audioCtx.close();
    };
  }, []);

  useEffect(() => {
    if (!audioObj.current) return noop;

    audioObj.current.elem.addEventListener("ended", handleFinish);

    return () => {
      audioObj.current?.elem.removeEventListener("ended", handleFinish);
    };
  }, [handleFinish]);

  useEffect(() => {
    if (enabled) {
      if (audioObj.current?.ctx.state === "suspended") {
        audioObj.current.ctx.resume();
      }
      audioObj.current?.elem?.play();
    }
  }, [enabled]);
};
