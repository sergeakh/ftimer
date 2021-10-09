import { JSX } from "preact";
import cn from "classnames";

import { ButtonBase } from "./ButtonBase";

import styles from "./ProcessControl.css";
import { LocaleLabelName } from "../../locales/types";
import { useTranslate } from "../../locales/useTranslate";

export const enum Status {
  Start,
  Run,
  Pause,
  Another,
}

const buttonMainTitles = {
  [Status.Start]: LocaleLabelName.TimerProcessControlButtonStartTitle,
  [Status.Run]: LocaleLabelName.TimerProcessControlButtonPauseTitle,
  [Status.Pause]: LocaleLabelName.TimerProcessControlButtonResumeTitle,
};

type OnClick = () => void;

type Props = {
  status: Status;
  onStart: OnClick;
  onPause: OnClick;
  onStop: OnClick;
};

export const ProcessControl = ({
  status,
  onStart,
  onPause,
  onStop,
}: Props): JSX.Element => {
  const t = useTranslate();

  return (
    <div className={styles.wrapper}>
      {status !== Status.Another && (
        <div className={styles.processControl}>
          <ButtonBase
            title={t(buttonMainTitles[status])}
            color={status === Status.Run ? "secondary" : "primary"}
            className={cn(styles.btnIcon, {
              [styles.btnStart]: [Status.Start, Status.Pause].includes(status),
              [styles.btnPause]: status === Status.Run,
            })}
            onClick={status === Status.Run ? onPause : onStart}
          />
          {status === Status.Pause && (
            <ButtonBase
              title={t(LocaleLabelName.TimerProcessControlButtonStopTitle)}
              color="secondary"
              className={cn(styles.btnIcon, styles.btnStop)}
              onClick={onStop}
            />
          )}
        </div>
      )}
    </div>
  );
};
