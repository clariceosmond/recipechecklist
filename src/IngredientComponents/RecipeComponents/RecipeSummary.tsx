import * as React from "react";
import { useState } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  recipePaper: {
    padding: "1rem",
    marginBottom: "1rem",
  },
  descPaper: {
    marginTop: "1rem",
    padding: "1rem",
  },
  nameTitle: {
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  listItem: {
    marginLeft: "1.5rem",
  },
  listTitle: {
    fontSize: "1.15rem",
  },
});

const RecipeSummary: React.FC<RecipeSummaryProps> = (props) => {
  const { name, time, extra, descList, steps } = props;
  const classes = useStyles();
  const [isHidden, setHidden] = useState(true);

  return (
    <Paper
      elevation={3}
      className={classes.recipePaper}
      onClick={() => {
        setHidden(!isHidden);
      }}
    >
      <Typography className={classes.nameTitle}>{name}</Typography>
      <Typography> Time: {time} minutes</Typography>
      <Typography>
        <i> Extra Ingredients:</i> {extra}
      </Typography>
      <Paper
        elevation={3}
        className={classes.descPaper}
        style={{ display: isHidden ? "none" : "block" }}
      >
        <Typography className={classes.listTitle}>Ingredients</Typography>
        {descList.map((el: String) => {
          return <Typography className={classes.listItem}> {el} </Typography>;
        })}
        <Typography className={classes.listTitle} style={{ marginTop: "1rem" }}>
          {" "}
          Directions
        </Typography>
        {steps.map((el: String) => {
          return <Typography className={classes.listItem}> {el} </Typography>;
        })}
      </Paper>
    </Paper>
  );
};

interface RecipeSummaryProps {
  name: String;
  time: number;
  extra: String;
  descList: any;
  steps: any;
}

export default RecipeSummary;
