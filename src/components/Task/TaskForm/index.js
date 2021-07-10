import { Box, Button, Grid, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import renderSelectField from "../../FormHelper/Seletect";
import renderTextField from "../../FormHelper/TextField";
import * as modalActions from "./../../../actions/modal";
import * as taskActions from "./../../../actions/task";
import styles from "./styles";

TaskForm.propTypes = {
  classes: PropTypes.object,
};
const required = (values) => {
  const errors = {};
  const requiredField = ["title", "description"];
  requiredField.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};
function TaskForm(props) {
  const {
    classes,
    modalActionCreators,
    handleSubmit,
    invalid,
    submitting,
    taskEditing,
  } = props;
  const { hideModal } = modalActionCreators;
  const handleSubmitForm = (data) => {
    const { taskActionCreators, taskEditing } = props;
    const { addTask, updateTask } = taskActionCreators;
    const { title, description, status } = data;
    if (taskEditing && taskEditing.id) {
      updateTask(title, description, status);
    } else {
      console.log("data", data);
      addTask(title, description);
    }
  };

  const renderStatusSelection = () => {
    let xhtml = null;
    const { taskEditing } = props;
    if (taskEditing) {
      xhtml = (
        <Field
          className={classes.select}
          id="status"
          name="status"
          label="Trạng thái"
          component={renderSelectField}
        >
          <option value={0}>Ready</option>
          <option value={1}>In Progress</option>
          <option value={2}>Completed</option>
        </Field>
      );
    }
    return xhtml;
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Grid container>
        <Grid item md={12}>
          <Field
            className={classes.textField}
            margin="normal"
            id="name"
            name="title"
            label="Tiêu đề"
            component={renderTextField}
            value={taskEditing ? taskEditing.title : ""}
          />
        </Grid>
        <Grid item md={12}>
          <Field
            className={classes.textField}
            margin="normal"
            id="name"
            label="Mô tả"
            multiple
            rowsMax="4"
            component={renderTextField}
            name="description"
            value={taskEditing ? taskEditing.description : ""}
          />
        </Grid>
        <Grid item md={12}>
          {renderStatusSelection()}
        </Grid>
        <Grid item md={12}>
          <Box display="flex" flexDirection="row-reverse" mt={1}>
            <Box ml={1}>
              <Button
                disabled={invalid || submitting}
                color="primary"
                variant="contained"
                type="submit"
              >
                {" "}
                Lưu lại
              </Button>
            </Box>
            <Button variant="contained" onClick={hideModal}>
              {" "}
              Hủy bỏ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: {
      title: state.task.taskEditing ? state.task.taskEditing.title : null,
      status: state.task.taskEditing ? state.task.taskEditing.status : null,
      description: state.task.taskEditing
        ? state.task.taskEditing.description
        : null,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
  taskActionCreators: bindActionCreators(taskActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = "TASK_MANAGEMNET";

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate: required,
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
