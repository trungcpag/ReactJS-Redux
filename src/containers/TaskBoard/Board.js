import { Box, Button, Grid, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TaskList from "../../components/Task/TaskList";
import { STATUES } from "../../constants";
import styles from "./styles";
import * as taskActions from "./../../actions/task";
import * as modalAction from "./../../actions/modal";
import TaskForm from "../../components/Task/TaskForm";

function Board(props) {
  const { tasks } = props;

  const handleClickEdit = (task) => {
    const { taskActionsCreator, modalActions } = props;
    const { setTaskEditing } = taskActionsCreator;
    setTaskEditing(task);
    const { showModal, changeModalTitle, changeModalContent } = modalActions;
    showModal();
    changeModalTitle("Cập nhật công việc");
    changeModalContent(<TaskForm />);
  };

  const handleClickDeleteTask = (task) => {
    console.log(task);
  };

  const showModalDeleteTask = (task) => {
    const { modalActions, classes } = props;
    const { showModal, changeModalTitle, hideModal, changeModalContent } =
      modalActions;
    showModal();
    changeModalTitle("Xóa công việc");
    changeModalContent(
      <div className={classes.modelDelete}>
        <div className={classes.modelConfirmText}>
          Bạn chắc chắn muốn xóa{" "}
          <span className={classes.modelConfirmTextBold}>{task.title}</span>?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal} mt={2}>
              Hủy bỏ
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickDeleteTask(task)}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </div>
    );
  };
  return (
    <Grid container spacing={2}>
      {STATUES.map((status) => {
        const taskFiltered = tasks.filter(
          (task) => task.status === status.value
        );
        return (
          <TaskList
            key={status.value}
            tasks={taskFiltered}
            status={status}
            onClickEdit={handleClickEdit}
            onClickDelete={showModalDeleteTask}
          />
        );
      })}
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    taskActionsCreator: bindActionCreators(taskActions, dispatch),
    modalActions: bindActionCreators(modalAction, dispatch),
  };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Board));
