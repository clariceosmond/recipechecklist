import * as React from "react";

const IngredientElement: React.FC<IngredientElementProps> = (props) => {
  const { name, onCheck } = props;
  return (
    <div>
      <input type="checkbox" onChange={onCheck} />
      {name}
    </div>
  );
};

interface IngredientElementProps {
  name: String;
  onCheck: () => void;
}
export default IngredientElement;
