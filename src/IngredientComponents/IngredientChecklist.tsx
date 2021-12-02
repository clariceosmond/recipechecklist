import * as React from "react";
import { IngredientMap, IngredientData, RecipeData } from "./IngredientData";
import IngredientElement from "./IngredientElement";
import { useEffect, useState } from "react";
import RecipeSummary from "./RecipeComponents/RecipeSummary";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  mainGrid: {
    marginTop: "5rem",
  },
  recipeGrid: {
    marginTop: "1rem",
  },
});

const IngredientChecklist: React.FC = () => {
  const classes = useStyles();
  const [ingMap, setIngMap] = useState(
    Array(IngredientData.length).fill(false)
  );
  //console.log(ingMap);
  const [eligibleRecipes, setEligibleRecipes] = useState(
    RecipeData.filter((el) => {
      for (const ing in el.list) {
        if (!ingMap[IngredientMap.get(ing) as number]) return false;
      }
      return true;
    })
  );

  useEffect(() => {
    setEligibleRecipes(
      RecipeData.filter((recipe) => {
        for (const ing of recipe.list) {
          if (!ingMap[IngredientMap.get(ing) as number]) return false;
        }
        return true;
      })
    );
  }, [ingMap]);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.mainGrid}
    >
      What Do You Have?
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
