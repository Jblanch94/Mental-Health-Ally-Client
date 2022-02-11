import { Group } from "../../../types";
import GroupListItem from "./GroupListItem";

interface GroupsListProps {
  groups: Group[];
}

function GroupsList(props: GroupsListProps): JSX.Element {
  const { groups } = props;
  const groupsList = groups.map((group: Group) => {
    return <GroupListItem id={group.id} name={group.name} key={group.id} />;
  });

  return <>{groupsList}</>;
}

export default GroupsList;
