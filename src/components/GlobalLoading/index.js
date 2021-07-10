import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import LoadingIcon from "./../../assets/loading.gif";
import styles from "./styles";

GlobalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

function GlobalLoading(props) {
  const { classes, showLoading } = props;
  let xhtml = null;
  if (showLoading) {
    xhtml = (
      <div className={classes.globalLoading}>
        <img src={LoadingIcon} alt="Loading" className={classes.icon} />
      </div>
    );
  }
  return xhtml;
}

const mapStateToProps = (state) => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const withConnect = connect(mapStateToProps, null);

export default compose(withStyles(styles), withConnect)(GlobalLoading);
