import * as React from "react";
import { IngredientMap, IngredientData } from "./IngredientData";
import { RecipeData } from "./RecipeData";
import IngredientElement from "./IngredientElement";
import { useEffect, useState } from "react";
import RecipeSummary from "./RecipeComponents/RecipeSummary";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  mainGrid: {
    marginTop: "5rem",
  },
  recipeGrid: {
    marginTop: "1rem",
  },
  isAllCheck: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
  },
  whatDo: {
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
});

const IngredientChecklist: React.FC = () => {
  const classes = useStyles();
  const [isAll, setIsAll] = useState(false);
  const [ingMap, setIngMap] = useState(
    Array(IngredientData.length).fill(false)
  );
  //console.log(ingMap);
  const [eligibleRecipes, setEligibleRecipes] = useState(
    RecipeData.filter((el) => {
      for (const ing in el.list) {
        if (!isAll && !ingMap[IngredientMap.get(ing) as number]) return false;
      }
      return true;
    })
  );

  useEffect(() => {
    setEligibleRecipes(
      RecipeData.filter((recipe) => {
        for (const ing of recipe.list) {
          if (!isAll && !ingMap[IngredientMap.get(ing) as number]) return false;
        }
        return true;
      })
    );
  }, [ingMap, isAll]);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.mainGrid}
    >
      <Typography className={classes.isAllCheck}>
        <input
          type="checkbox"
          onChange={() => {
            setIsAll(!isAll);
          }}
        />
        All Recipes
      </Typography>
      <Typography className={classes.whatDo}>What Do You Have? </Typography>
      <Grid direction="column">
        {IngredientData.map((el: string) => {
          return (
            <IngredientElement
              name={el}
              onCheck={() => {
                setIngMap(
                  ingMap.map((x, idx) => {
                    if (idx == (IngredientMap.get(el) as number)) {
                      console.log(IngredientMap.get(el) as number);
                      return !x;
                    }
                    return x;
                  })
                );
                //console.log(ingMap);
              }}
            />
          );
        })}
      </Grid>
      <Grid direction="column" className={classes.recipeGrid}>
        {eligibleRecipes.map((el: any) => {
          return (
            <RecipeSummary
              name={el.name}
              time={el.time}
              extra={el.extra}
              descList={el.descList}
              steps={el.steps}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default IngredientChecklist;
