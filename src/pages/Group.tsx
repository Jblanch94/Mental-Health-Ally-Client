import { useParams } from "react-router-dom";

function Group() {
  const { id } = useParams();

  return <div>Group {id}</div>;
}

export default Group;
