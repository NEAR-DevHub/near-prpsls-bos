import {
  REPL_INFRASTRUCTURE_COMMITTEE,
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  REPL_DEVHUB,
  RFP_IMAGE,
} from "@/includes/common";

const { readableDate } = VM.require(
  `${REPL_DEVHUB}/widget/core.lib.common`
) || { readableDate: () => {} };

const linkedRfpIds = props.linkedRfpIds ?? [];
const linkedRfpsData = [];

linkedRfpIds.map((item) => {
  const data = Near.view(REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT, "get_rfp", {
    rfp_id: item,
  });
  if (data !== null) {
    linkedRfpsData.push(data);
  }
});

return (
  <div className="d-flex flex-column gap-3">
    {linkedRfpsData.map((item) => {
      const link = `https://near.org/${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app?page=rfp&id=${item.id}`;
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="d-flex gap-2">
            <img src={RFP_IMAGE} height={40} width={40} />
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
