import {
  REPL_INFRASTRUCTURE_COMMITTEE,
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  REPL_DEVHUB,
} from "@/includes/common";

const { readableDate } = VM.require(
  `${REPL_DEVHUB}/widget/core.lib.common`
) || { readableDate: () => {} };

const linkedProposalIds = props.linkedProposalIds ?? [];
const linkedProposalsData = [];

linkedProposalIds.map((item) => {
  const data = Near.view(
    REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
    "get_proposal",
    {
      proposal_id: item,
    }
  );
  if (data !== null) {
    linkedProposalsData.push(data);
  }
});

return (
  <div className="d-flex flex-column gap-3">
    {linkedProposalsData.map((item) => {
      const link = `https://near.org/${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app?page=proposal&id=${item.id}`;
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="d-flex gap-2">
            <Widget
              src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.Profile`}
              props={{
                accountId: item.snapshot.editor_id,
              }}
            />
            <div className="d-flex flex-column" style={{ maxWidth: 250 }}>
              <Link
                href={`/near/widget/ProfilePage?accountId=${item.snapshot.name}`}
              >
                <b className="text-truncate">{item.snapshot.name}</b>
              </Link>
              <div className="text-sm text-muted">
                created on {readableDate(item.snapshot.timestamp / 1000000)}
              </div>
            </div>
          </div>
        </a>
      );
    })}
  </div>
);
