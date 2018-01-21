import Component from "inferno-component";
import dataUIComponent from "../dataUIComponent";
import linkstate from "linkstate";

class ManageTeam extends Component {
  state = {
    username: "",
    error: ""
  };
  inviteMember = async e => {
    e.preventDefault();
    let res = await window.fetchWithAuth(
      `/teams/${this.props.contestSlug}/invite/${this.state.username}`
    );
    if (!res.ok) this.setState({ error: "Unexpected error occurred" });
    else {
      this.setState({ username: "", error: "" });
      this.props.refresh();
    }
  };
  render(props) {
    return (
      <div>
        <h2>Team name: {props.data.team.teamname}</h2>
        <h2>Members</h2>
        <ul>
          {props.data.team.invites.map(invite => (
            <li>
              {invite.userUsername}
              {invite.accepted ? (
                <span className="success"> Accepted</span>
              ) : (
                <span className="error"> Not Accepted</span>
              )}
            </li>
          ))}
        </ul>
        {props.data.team.invites.length < props.data.maxTeamSize && (
          <form onSubmit={this.inviteMember}>
            <div className="error">{this.state.error}</div>
            <label>Username to invite</label>
            <input
              type="text"
              value={this.state.username}
              onChange={linkstate(this, "username")}
            />
            <button type="submit">Invite</button>
          </form>
        )}
      </div>
    );
  }
}

export default dataUIComponent(
  ManageTeam,
  "Manage Team",
  props => `/teams/${props.contestSlug}`
);
