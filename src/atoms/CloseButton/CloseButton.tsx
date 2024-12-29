import styles from "./Closebutton.module.css";
import { CloseButtonProps } from "./CloseButton.types";

function CloseButton(props: CloseButtonProps) {
  const { onclick } = props;

  const handleOnClick = () => {
    onclick();
  };

  return (
    <div
      id="closeButton"
      aria-hidden="true"
      className={styles.buttonObject}
      onClick={() => {
        handleOnClick();
      }}
      onKeyDown={handleOnClick}
    >
      <div className="w-8 h-8 rounded-full bg-maroon100 text-white border border-white p-3 flex place-content-center hover:bg-white hover:text-maroon100">
        <div className="self-center text-xs">X</div>
      </div>
    </div>
  );
}
export default CloseButton;
