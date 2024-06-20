import {
  REPL_DEVHUB,
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  REPL_INFRASTRUCTURE_COMMITTEE,
} from "@/includes/common";

const profile = Social.getr(
  `${REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT}/profile`
);

if (!profile) {
  <div
    style={{ height: "50vh" }}
    className="d-flex justify-content-center align-items-center w-100"
  >
    <Widget src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Spinner`} />
  </div>;
}

return (
  <div style={{ width: "-webkit-fill-available" }} className="p-3">
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/components.molecule.Markdown`}
      props={{
        content: profile.description,
      }}
    />
  </div>
);
