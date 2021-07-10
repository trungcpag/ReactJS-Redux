import { ThemeProvider, withStyles } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import theme from "../../common/Theme";
import configureStore from "../../redux/configureStore";
import TaskBoard from "../TaskBoard";
import styles from "./styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLoading from "../../components/GlobalLoading";
import FormModal from "../../components/FormModal";

const store = configureStore();

function App(props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <GlobalLoading />
        <FormModal />
        <TaskBoard />
      </ThemeProvider>
    </Provider>
  );
}

export default withStyles(styles)(App);
