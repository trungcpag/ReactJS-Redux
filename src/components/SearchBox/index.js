import React from "react";
import PropTypes from "prop-types";
import { TextField, withStyles } from "@material-ui/core";
import styles from "./styles";

SearchBok.propTypes = {
  classes: PropTypes.object,
};

function SearchBok(props) {
  const { classes, handleChange } = props;
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        autoComplete="off"
        margin="normal"
        onChange={handleChange}
        className={classes.textField}
        placeholder="Nhập từ khóa"
      />
    </form>
  );
}

export default withStyles(styles)(SearchBok);
