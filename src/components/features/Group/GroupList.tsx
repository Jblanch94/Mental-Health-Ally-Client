import { Fragment } from "react";

import ListItemLink from "../../common/ListItemLink";
import List from "../../common/mui/List";
import Divider from "../../common/mui/Divider";
import { Group } from "../../../types";

interface GroupListProps {
  groups: Group[];
}

function GroupList(props: GroupListProps): JSX.Element {
  const { groups } = props;

  return (
    <List>
      {groups.map((group) => {
        return (
          <Fragment key={group.id}>
            <ListItemLink
              to={`/groups/${group.id}`}
              primary={group.name}
              sx={{
                background: (theme) => theme.primary.main,
                color: (theme) => theme.text.white,
                "&:hover": {
                  background: (theme) => theme.primary.main,
                  opacity: 0.9,
                },
              }}
            />
            <Divider sx={{ backgroundColor: "rgba(61, 90, 128, 0.7)" }} />
          </Fragment>
        );
      })}
    </List>
  );
}

export default GroupList;
