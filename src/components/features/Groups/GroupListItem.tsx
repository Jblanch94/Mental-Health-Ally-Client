import ListItem from "../../common/mui/ListItem";
import Link from "../../common/Link";

interface GroupListItemProps {
  id: string;
  name: string;
}

function GroupListItem(props: GroupListItemProps): JSX.Element {
  const { id, name } = props;

  return (
    <ListItem key={id}>
      <Link
        to={`/groups/${id}`}
        sx={{
          "&:hover": { color: (theme) => theme.text.primary },
          color: (theme) => theme.text.white,
        }}>
        {name}
      </Link>
    </ListItem>
  );
}

export default GroupListItem;
