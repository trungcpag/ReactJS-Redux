import { Button, withStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchBox from "../../components/SearchBox";
import TaskForm from "../../components/Task/TaskForm";
import * as modalAction from "./../../actions/modal";
import * as taskActions from "./../../actions/task";
import Board from "./Board";
import style from "./styles";

function TaskBoard(props) {
  const { classes, listState } = props;

  useEffect(() => {
    const { taskActionsCreator } = props;
    const { fetchListTaskRequest } = taskActionsCreator;
    const fetchTaskList2 = async () => {
      try {
        const response = await fetchListTaskRequest();
        console.log(response);
      } catch (error) {
        console.log("error2");
      }
    };
    fetchTaskList2();
  }, []);

  const handleClickOpen = () => {
    const { modalActions, taskActionsCreator } = props;
    const { setTaskEditing } = taskActionsCreator;
    setTaskEditing(null);
    const { showModal, changeModalTitle, changeModalContent } = modalActions;
    showModal();
    changeModalTitle("Thêm mới công việc");
    changeModalContent(<TaskForm />);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const { taskActionsCreator } = props;
    const { filterTask } = taskActionsCreator;
    filterTask(value);
  };

  const readerSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox handleChange={handleChange} />;
    return xhtml;
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        <Add /> Thêm mới công việc
      </Button>
      {readerSearchBox()}
      <Board tasks={listState}></Board>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listState: state.task.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActionsCreator: bindActionCreators(taskActions, dispatch),
    modalActions: bindActionCreators(modalAction, dispatch),
  };
};

export default withStyles(style)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
