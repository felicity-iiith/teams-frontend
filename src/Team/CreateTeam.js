import Component from "inferno-component";
import linkstate from "linkstate";
import dataUIComponent from "../dataUIComponent";

class CreateTeam extends Component {
  state = {
    teamname: "",
    error: ""
  };
  createTeam = async e => {
    e.preventDefault();
    const { contestSlug } = this.props;
    let res = await window.fetchWithAuth(`/teams/${contestSlug}`, {
      method: "POST",
      body: {
        teamname: this.state.teamname
      }
    });
    try {
      if (!res.ok) {
        if (res.error) this.setState({ error: res.error });
        else this.setState({ error: "Unexpected error occurred" });
      } else {
        this.setState({ teamname: "", error: "" });
        // HACK: Refresh after 200 ms coz doesnot work properly in prod if refreshed instantly
        window.setTimeout(() => this.props.refreshParent(), 200);
      }
    } catch (e) {
      if (res.status === 403)
        this.setState({ error: "Already part of a team" });
      else if (res.status === 409)
        this.setState({ error: "Team name already taken" });
      else this.setState({ error: "Unexpected error occurred" });
    }
  };
  render(props, state) {
    return (
      <form onSubmit={this.createTeam}>
        <div className="error">{this.state.error}</div>
        <label>Team Name</label>
        <input
          type="text"
          value={state.teamname}
          onChange={linkstate(this, "teamname")}
        />
        <button>Create</button>
      </form>
    );
  }
}

export default dataUIComponent(
  CreateTeam,
  "Create Team",
  props => `/teams/${props.contestSlug}`
);
