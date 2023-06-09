import Modal from "react-modal";
import styles from "@/styles/components/modal.module.css";

Modal.setAppElement("#modals-go-here");

export default function ErrorModal(props) {
  const modalProps = { ...props };
  delete modalProps.children;
  delete modalProps.title;
  delete modalProps.message;

  return (
    <Modal
      {...modalProps}
      className={`${styles["modal"]} ${styles["error-modal"]} ${ props?.className ?? "" }`}
      overlayClassName={styles["modal__overlay"]}
    >
      <h3>{props.title ?? 'Something went wrong!'}</h3>
      <p>{props.message ?? 'Check there are no errors in the form and try again!'}</p>
      <button type="button" className={`btn ${styles['modal__btn']}`} onClick={props.closeModal}>Okay</button>
    </Modal>
  );
}
