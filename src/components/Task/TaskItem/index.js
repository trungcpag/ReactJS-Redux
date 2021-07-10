import React from "react";
import style from "./style";
import {
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
TaskItem.propTypes = {};

function TaskItem(props) {
  const { classes, task, status, onClickEdit, onClickDelete } = props;
  const { id, title } = task;
  return (
    <Card key={id} className={classes.card}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item md={8}>
            <Typography component="h2">{title}</Typography>
          </Grid>
          <Grid item md={4}>
            {status.label}
          </Grid>
        </Grid>
        <p>{task.description}</p>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Fab
          color="primary"
          aria-label="Edit"
          size="small"
          onClick={onClickEdit}
        >
          <Icon fontSize="small">edit_icon</Icon>
        </Fab>
        <Fab
          color="primary"
          aria-label="Delete"
          size="small"
          onClick={onClickDelete}
        >
          <Icon fontSize="small">delete_icon</Icon>
        </Fab>
      </CardActions>
    </Card>
  );
}

export default withStyles(style)(TaskItem);
