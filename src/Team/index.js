import dataUIComponent from "../dataUIComponent";
import ManageTeam from "./ManageTeam";
import CreateTeam from "./CreateTeam";
import Invites from "./Invites";

const Team = props => (
  <div>
    <div class="clearfix">
      <a class="button float-right" href={props.data.public_url}>
        Go Back
      </a>
    </div>
    {props.data.team && <ManageTeam contestSlug={props.params.contestSlug} />}
    {!props.data.team && (
      <CreateTeam
        refreshParent={props.refresh}
        contestSlug={props.params.contestSlug}
      />
    )}
    {!props.data.team && (
      <Invites
        refreshParent={props.refresh}
        contestSlug={props.params.contestSlug}
      />
    )}
  </div>
);

export default dataUIComponent(
  Team,
  props => props.data.name,
  props => `/teams/${props.params.contestSlug}`
);
