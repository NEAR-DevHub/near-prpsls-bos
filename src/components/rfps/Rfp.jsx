import {
  REPL_INFRASTRUCTURE_COMMITTEE,
  REPL_DEVHUB,
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  REPL_RPC_URL,
  RFP_TIMELINE_STATUS,
  RFP_IMAGE,
} from "@/includes/common";

const { href } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`) || {
  href: () => {},
};
const { readableDate } = VM.require(
  `${REPL_DEVHUB}/widget/core.lib.common`
) || { readableDate: () => {} };

const accountId = context.accountId;
/*
  ---props---
  props.id: number;
  props.timestamp: number; optional
  accountId: string
  blockHeight:number
  */

const { id, timestamp } = props;

const Container = styled.div`
  .full-width-div {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .fw-bold {
    font-weight: 600 !important;
  }

  .card.no-border {
    border-left: none !important;
    border-right: none !important;
    margin-bottom: -3.5rem;
  }

  .description-box {
    font-size: 14px;
  }

  .accept-submission-info-container {
    background-color: #ecf8fb;
  }

  .text-sm {
    font-size: 13px !important;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-3 {
    flex: 3;
  }

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid grey;
  }

  .green-fill {
    background-color: rgb(4, 164, 110) !important;
    border-color: rgb(4, 164, 110) !important;
    color: white !important;
  }

  .yellow-fill {
    border-color: #ff7a00 !important;
  }

  .vertical-line {
    width: 2px;
    height: 180px;
    background-color: lightgrey;
  }

  @media screen and (max-width: 970px) {
    .vertical-line {
      height: 135px !important;
    }

    .vertical-line-sm {
      height: 70px !important;
    }

    .gap-6 {
      gap: 0.5rem !important;
    }
  }

  @media screen and (max-width: 570px) {
    .vertical-line {
      height: 180px !important;
    }

    .vertical-line-sm {
      height: 75px !important;
    }

    .gap-6 {
      gap: 0.5rem !important;
    }
  }

  .vertical-line-sm {
    width: 2px;
    height: 70px;
    background-color: lightgrey;
  }

  .form-check-input:disabled ~ .form-check-label,
  .form-check-input[disabled] ~ .form-check-label {
    opacity: 1;
  }

  .form-check-input {
    border-color: black !important;
  }

  .grey-btn {
    background-color: #687076;
    border: none;
    color: white;
  }

  .blue-btn {
    background-color: #3c697d;
    border: none;
    color: white;
  }

  .form-check-input:checked {
    background-color: #3c697d !important;
    border-color: #3c697d !important;
  }

  .dropdown-toggle:after {
    position: absolute;
    top: 46%;
    right: 5%;
  }

  .drop-btn {
    max-width: none !important;
  }

  .dropdown-menu {
    width: 100%;
    border-radius: 0.375rem !important;
  }

  .green-btn {
    background-color: #04a46e !important;
    border: none;
    color: white;

    &:active {
      color: white;
    }
  }

  .gap-6 {
    gap: 2.5rem;
  }

  .border-vertical {
    border-top: var(--bs-border-width) var(--bs-border-style)
      var(--bs-border-color) !important;
    border-bottom: var(--bs-border-width) var(--bs-border-style)
      var(--bs-border-color) !important;
  }

  button.px-0 {
    padding-inline: 0px !important;
  }

  red-icon i {
    color: red;
  }

  input[type="radio"] {
    min-width: 13px;
  }
`;

const RfpContainer = styled.div`
  border: 1px solid lightgrey;
  overflow: auto;
`;

const Header = styled.div`
  position: relative;
  background-color: #f4f4f4;
  height: 50px;

  .menu {
    position: absolute;
    right: 10px;
    top: 4px;
    font-size: 30px;
  }
`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: -6px -6px 6px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  pointer-events: none;

  img {
    object-fit: cover;
    border-radius: 40px;
    width: 100%;
    height: 100%;
  }
`;

const rfpLabelOptions = Near.view(
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  "get_global_labels"
);

const LinkProfile = ({ account, children }) => {
  return (
    <Link href={`/near/widget/ProfilePage?accountId=${account}`}>
      {children}
    </Link>
  );
};

const rfp = Near.view(REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT, "get_rfp", {
  rfp_id: parseInt(id),
});

if (!rfp) {
  return (
    <div
      style={{ height: "50vh" }}
      className="d-flex justify-content-center align-items-center w-100"
    >
      <Widget
        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Spinner`}
      />
    </div>
  );
}
if (timestamp && rfp) {
  rfp.snapshot =
    rfp.snapshot_history.find((item) => item.timestamp === timestamp) ??
    rfp.snapshot;
}

const { snapshot } = rfp;

const authorId = rfp.author_id;
const blockHeight = parseInt(rfp.social_db_post_block_height);
const item = {
  type: "social",
  path: `${REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT}/post/main`,
  blockHeight,
};
const rfpURL = `https://near.org/${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app?page=rfp&id=${rfp.id}&timestamp=${snapshot.timestamp}`;

const SidePanelItem = ({ title, children, hideBorder, ishidden }) => {
  return (
    <div
      style={{ gap: "8px" }}
      className={
        ishidden
          ? "d-none"
          : "d-flex flex-column pb-3 " + (!hideBorder && " border-bottom")
      }
    >
      <div className="h6 mb-0">{title} </div>
      <div className="text-muted">{children}</div>
    </div>
  );
};

const isAllowedToWriteRfp = Near.view(
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  "is_allowed_to_write_rfps",
  {
    editor: accountId,
  }
);

const link = href({
  widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
  params: {
    page: "create-rfp",
    id: rfp.id,
    timestamp: timestamp,
  },
});

const createdDate =
  rfp.snapshot_history?.[rfp.snapshot_history.length - 1]?.timestamp ??
  snapshot.timestamp;

return (
  <Container className="d-flex flex-column gap-2 w-100 mt-4">
    <div className="d-flex px-3 px-lg-0 justify-content-between">
      <div className="d-flex gap-2 align-items-center h3">
        <div>{snapshot.name}</div>
        <div className="text-muted">#{rfp.id}</div>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <Widget
          src={`${REPL_NEAR}/widget/ShareButton`}
          props={{
            postType: "post",
            url: rfpURL,
          }}
        />
        {isAllowedToWriteRfp && (
          <Link to={link} style={{ textDecoration: "none" }}>
            <Widget
              src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
              props={{
                label: "Edit",
                classNames: { root: "grey-btn btn-sm" },
              }}
            />
          </Link>
        )}
      </div>
    </div>
    <div className="d-flex flex-wrap flex-md-nowrap px-3 px-lg-0 gap-2 align-items-center text-sm pb-3 w-100">
      {/* TODO */}
      <Widget
        src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.StatusTag`}
        props={{
          timelineStatus: snapshot.timeline.status,
          size: "sm",
        }}
      />
      <div className="w-100 d-flex flex-wrap flex-md-nowrap gap-1 align-items-center">
        <div className="fw-bold text-truncate">
          <LinkProfile account={authorId}>{authorId}</LinkProfile>
        </div>
        <div>created on {readableDate(createdDate / 1000000)}</div>
      </div>
    </div>
    <div className="card no-border rounded-0 full-width-div px-3 px-lg-0">
      <div className="container-xl py-4">
        {snapshot.timeline.status ===
          RFP_TIMELINE_STATUS.ACCEPTING_SUBMISSIONS && (
          <div className="accept-submission-info-container p-3 p-sm-4 d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center gap-2 rounded-2">
            <div style={{ minWidth: "300px" }}>
              <b>This RFP is accepting submissions.</b>
              <p className="text-sm text-muted mt-2">
                Click Submit Proposal if you want to submit a proposal.
              </p>
            </div>
            <div style={{ minWidth: "fit-content" }}>
              <Link
                to={href({
                  widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
                  params: { page: "create-proposal", rfp_id: rfp.id },
                })}
              >
                <Widget
                  src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
                  props={{
                    label: (
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-plus-circle"></i>Submit Proposal
                      </div>
                    ),
                    classNames: { root: "blue-btn" },
                    onClick: () => setReviewModal(true),
                  }}
                />
              </Link>
            </div>
          </div>
        )}
        <div className="my-4">
          <div className="d-flex flex-wrap gap-6">
            <div
              style={{ minWidth: "350px" }}
              className="flex-3 order-2 order-md-1"
            >
              <div
                className="d-flex gap-2 flex-1"
                style={{
                  zIndex: 99,
                  background: "white",
                  position: "relative",
                }}
              >
                <div className="d-none d-sm-flex">
                  <img src={RFP_IMAGE} height={35} width={35} />
                </div>
                <RfpContainer className="rounded-2 flex-1">
                  <Header className="d-flex gap-1 align-items-center p-2 px-3 ">
                    <div
                      className="fw-bold text-truncate"
                      style={{ maxWidth: "60%" }}
                    >
                      <LinkProfile account={authorId}>{authorId}</LinkProfile>
                    </div>
                    <div
                      className="text-muted"
                      style={{ minWidth: "fit-content" }}
                    >
                      ･{" "}
                      <Widget
                        src={`${REPL_NEAR}/widget/TimeAgo`}
                        props={{
                          blockHeight,
                          blockTimestamp: createdDate,
                        }}
                      />
                      {context.accountId && (
                        <div className="menu">
                          <Widget
                            src={`${REPL_NEAR}/widget/Posts.Menu`}
                            props={{
                              accountId: authorId,
                              blockHeight: blockHeight,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Header>
                  <div className="d-flex flex-column gap-1 p-2 px-3 description-box">
                    <div className="text-muted h6 border-bottom pb-1 mt-3">
                      RFP CATEGORY
                      <div className="my-2">
                        <Widget
                          src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.MultiSelectCategoryDropdown`}
                          props={{
                            selected: snapshot.labels,
                            disabled: true,
                            hideDropdown: true,
                            onChange: () => {},
                            availableOptions: rfpLabelOptions,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-muted h6 border-bottom pb-1 mt-3">
                      SUMMARY
                    </div>
                    <div>{snapshot.summary}</div>
                    <div className="text-muted h6 border-bottom pb-1 mt-3 mb-4">
                      DESCRIPTION
                    </div>
                    <Widget
                      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.MarkdownViewer`}
                      props={{ text: snapshot.description }}
                    />
                    {/* TODO */}
                    <div className="d-flex gap-2 align-items-center mt-4">
                      <Widget
                        src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.LikeButton`}
                        props={{
                          item,
                          proposalId: rfp.id,
                          notifyAccountId: authorId,
                        }}
                      />
                      <Widget
                        src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.CommentIcon`}
                        props={{
                          item,
                          showOverlay: false,
                          onClick: () => {},
                        }}
                      />
                      <Widget
                        src={`${REPL_NEAR}/widget/CopyUrlButton`}
                        props={{
                          url: rfpURL,
                        }}
                      />
                    </div>
                  </div>
                </RfpContainer>
              </div>
              <div className="border-bottom pb-4 mt-4">
                <Widget
                  src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.CommentsAndLogs`}
                  props={{
                    ...props,
                    id: rfp.id,
                    item: item,
                    snapshotHistory: [...rfp.snapshot_history, snapshot],
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: 99,
                  backgroundColor: "white",
                }}
                className="pt-4"
              >
                <Widget
                  src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.ComposeComment`}
                  props={{
                    ...props,
                    item: item,
                    notifyAccountId: authorId,
                    id: rfp.id,
                  }}
                />
              </div>
            </div>
            <div
              style={{ minWidth: "300px" }}
              className="d-flex flex-column gap-4 flex-1 order-1 order-md-2"
            >
              <SidePanelItem title="Submission Deadline">
                <h5 className="text-black">
                  {readableDate(
                    parseFloat(snapshot.submission_deadline / 1000000)
                  )}
                </h5>
              </SidePanelItem>
              <SidePanelItem title="Timeline">
                <Widget
                  src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.TimelineConfigurator`}
                  props={{
                    timeline: snapshot.timeline,
                    disabled: true,
                  }}
                />
              </SidePanelItem>
              <SidePanelItem
                title="Selected Proposal"
                ishidden={true}
              ></SidePanelItem>
              <SidePanelItem
                title="All Proposals"
                ishidden={!snapshot.linked_proposals.length}
              >
                <Widget
                  src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.LinkedProposals`}
                  props={{
                    linkedProposalIds: [snapshot.linked_proposals],
                  }}
                />
              </SidePanelItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);
