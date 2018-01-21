import Component from "inferno-component";
import dataUIComponent from "../dataUIComponent";

class Invites extends Component {
  acceptInvite = async invite => {
    let res = await window.fetchWithAuth(
      `/teams/${this.props.contestSlug}/accept_invite/${invite.id}`
    );
    if (!res.ok) alert("Unexpected error occurred");
    else {
      // Accpeted invite, redirect to contest page
      this.props.refreshParent();
    }
  };
  render(props) {
    return (
      <div>
        {props.data.map(invite => (
          <li>
            Team Name: {invite.team.teamname}. Invited by{" "}
            {invite.team.userUsername}
            <button
              className="float-right"
              onClick={() => this.acceptInvite(invite)}
            >
              Accept Invite
            </button>
          </li>
        ))}
      </div>
    );
  }
}

export default dataUIComponent(
  Invites,
  "Invites",
  props => `/teams/${props.contestSlug}/invites`
);
