import { useCallback, useEffect, useRef } from "preact/hooks";
import { isIOS } from "../utils/browser";

import { sounds } from "../Settings/constants";
import { useSettings } from "../Settings/useSettings";
import { SettingName } from "../Settings/types";

type AudioObj = {
  ctx: AudioContext;
  gainNode: GainNode;
  elem: HTMLAudioElement;
};

export const useAlarm = (enabled: boolean): (() => void) => {
  const { getSetting } = useSettings();
  const audioObj = useRef<AudioObj>(null);

  useEffect(() => {
    const audioElement = new Audio();

    const audioCtx = new AudioContext();

    const gainNode = audioCtx.createGain();

    const track = audioCtx.createMediaElementSource(audioElement);
    track.connect(gainNode).connect(audioCtx.destination);

    const newAudioObj: AudioObj = {
      ctx: audioCtx,
      gainNode,
      elem: audioElement,
    };

    audioObj.current = newAudioObj;

    return () => {
      audioCtx.close();
    };
  }, []);

  const init = useCallback(() => {
    const audioElem = audioObj.current?.elem;
    const ganiNode = audioObj.current?.gainNode;
    if (audioElem && ganiNode) {
      if (audioElem.muted) {
        audioElem.muted = false;
      }

      audioElem.src = sounds[getSetting(SettingName.soundName)];
      ganiNode.gain.value = 0;

      if (isIOS()) {
        audioElem.play();
        audioElem.pause();
      }

      ganiNode.gain.value = getSetting(SettingName.soundVolume) / 100;
    }
  }, [getSetting]);

  useEffect(() => {
    if (enabled) {
      if (audioObj.current?.ctx.state === "suspended") {
        audioObj.current.ctx.resume();
      }

      const audioElem = audioObj.current?.elem;
      if (audioElem) {
        audioElem.play();
      }
    }
  }, [enabled]);

  return init;
};
