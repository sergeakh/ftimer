import { JSX } from "preact";
import cn from "classnames";

import { ButtonBase } from "./ButtonBase";

import styles from "./ProcessControl.css";

export const BUTTON_START_TITLE = "Start";
export const BUTTON_PAUSE_TITLE = "Pause";
export const BUTTON_RESUME_TITLE = "Resume";
export const BUTTON_STOP_TITLE = "Stop";

export const enum Status {
  Start,
  Run,
  Pause,
}

const buttonMainTitles = {
  [Status.Start]: BUTTON_START_TITLE,
  [Status.Run]: BUTTON_PAUSE_TITLE,
  [Status.Pause]: BUTTON_RESUME_TITLE,
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
}: Props): JSX.Element => (
  <div className={styles.processControl}>
    <ButtonBase
      title={buttonMainTitles[status]}
      color={status === Status.Run ? "secondary" : "primary"}
      className={cn(styles.btnIcon, {
        [styles.btnStart]: [Status.Start, Status.Pause].includes(status),
        [styles.btnPause]: status === Status.Run,
      })}
      onClick={status === Status.Run ? onPause : onStart}
    />
    {status === Status.Pause && (
      <ButtonBase
        title={BUTTON_STOP_TITLE}
        color="secondary"
        className={cn(styles.btnIcon, styles.btnStop)}
        onClick={onStop}
      />
    )}
  </div>
);
