import { useParams } from "react-router-dom";

function ViewIngredient(props) {
  let name = useParams().name;
  const extra = props.inventory[name];

  return (
    <div>
      {name + ': '}
      <div>
        {Object.keys(extra).map(element => {
          if (element === 'price') {
            return (
              <div>
                {'Pris: ' + extra[element] + 'kr'}
              </div>
            )
          } else if (element === 'extra') {
            return "";
          } else {
            return (
              <div>
                {element + ': ' + extra[element]}
              </div>
            )
          }
        })}
      </div>
    </div>
  );
}
export default ViewIngredient;