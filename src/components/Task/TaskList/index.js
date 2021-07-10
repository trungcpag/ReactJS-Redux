import React from "react";
import { Box, Grid, withStyles } from "@material-ui/core";
import styles from "./styles";
import TaskItem from "../TaskItem";
TaskList.propTypes = {};

function TaskList(props) {
  const { classes, status, tasks, onClickEdit, onClickDelete } = props;
  return (
    <Grid item md={4} xs={12} key={status.value}>
      <Box mt={2} mb={2}>
        {" "}
        <div className={classes.status}> {status.label}</div>
      </Box>
      {tasks.map((task) => {
        return (
          <TaskItem
            onClickEdit={() => onClickEdit(task)}
            onClickDelete={() => onClickDelete(task)}
            task={task}
            status={status}
            key={task.id}
          />
        );
      })}
    </Grid>
  );
}

export default withStyles(styles)(TaskList);
