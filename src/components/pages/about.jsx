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
  <div className="p-sm-2 p-4">
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.Markdown`}
      props={{
        content: profile.description,
      }}
    />
  </div>
);
