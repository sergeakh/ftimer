import { useCallback, useEffect, useRef } from "preact/hooks";
import { isIOS } from "../utils/browser";

import { sounds } from "../Settings/constants";
import { useSettings } from "../Settings/useSettings";
import { SettingName } from "../Settings/types";

type AudioObj = {
  obj: {
    ctx: AudioContext;
    gainNode: GainNode;
    elem: HTMLAudioElement;
  } | null;
};

export const useAlarm = (enabled: boolean): (() => void) => {
  const { getSetting } = useSettings();
  const audioObj = useRef<AudioObj>({ obj: null });

  useEffect(() => {
    const audioElement = new Audio();

    const audioCtx = new AudioContext();

    const gainNode = audioCtx.createGain();

    const track = audioCtx.createMediaElementSource(audioElement);
    track.connect(gainNode).connect(audioCtx.destination);

    const newAudioObj: AudioObj = {
      obj: {
        ctx: audioCtx,
        gainNode,
        elem: audioElement,
      },
    };

    // eslint-disable-new-line
    audioObj.current = newAudioObj;

    return () => {
      audioCtx.close();
    };
  }, []);

  const init = useCallback(() => {
    const aObj = audioObj.current?.obj;
    const audioElem = aObj?.elem;
    const ganiNode = aObj?.gainNode;
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
      if (audioObj.current?.obj?.ctx.state === "suspended") {
        audioObj.current?.obj?.ctx.resume();
      }

      const audioElem = audioObj.current?.obj?.elem;
      if (audioElem) {
        audioElem.play();
      }
    }
  }, [enabled]);

  return init;
};
