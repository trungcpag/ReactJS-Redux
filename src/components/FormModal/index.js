import { Modal, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Clear";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as modalActions from "./../../actions/modal";
import styles from "./styles";

function FormModal(props) {
  const { classes, open, component, modalActionCreators, title } = props;
  const { hideModal } = modalActionCreators;
  return (
    <Modal open={open}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <span className={classes.title}>{title}</span>
          <CloseIcon className={classes.icon} onClick={hideModal} />
        </div>
        <div className={classes.content}>{component}</div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  open: state.modal.showModal,
  component: state.modal.component,
  title: state.modal.title,
});
const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(FormModal);
