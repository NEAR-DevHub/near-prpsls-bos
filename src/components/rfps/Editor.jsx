import {
  REPL_INFRASTRUCTURE_COMMITTEE,
  REPL_DEVHUB,
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  REPL_RPC_URL,
  RfpCategoryOptions,
} from "@/includes//common";

const { href } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);

const draftKey = "RFP_EDIT";
href || (href = () => {});

const { id, timestamp } = props;

const isEditPage = typeof id === "string";
const author = context.accountId;
const FundingDocs =
  "https://near.social/devhub.near/widget/app?page=community&handle=developer-dao&tab=funding";
const ToCDocs = "";
const CoCDocs = "";
const RFPImage =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const TIMELINE_STATUS = {
  ACCEPTING_SUBMISSIONS: "ACCEPTING_SUBMISSIONS",
  EVALUATION: "EVALUATION",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  CANCELLED: "CANCELLED",
};

if (!author) {
  return (
    <Widget src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.LoginScreen`} />
  );
}
let editRfpData = null;
let draftRfpData = null;

if (isEditPage) {
  editRfpData = Near.view(
    `${REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT}`,
    "get_rfp",
    {
      id: parseInt(id),
    }
  );
}

const Container = styled.div`
  input {
    font-size: 14px !important;
  }

  .card.no-border {
    border-left: none !important;
    border-right: none !important;
    margin-bottom: -3.5rem;
  }

  textarea {
    font-size: 14px !important;
  }

  .full-width-div {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .text-sm {
    font-size: 13px;
  }

  .h5 {
    font-size: 18px !important;
  }

  @media screen and (max-width: 768px) {
    .h6 {
      font-size: 14px !important;
    }

    .h5 {
      font-size: 16px !important;
    }

    .text-sm {
      font-size: 11px;
    }

    .gap-6 {
      gap: 0.5rem !important;
    }
  }

  .border-bottom {
    border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color);
  }

  .text-xs {
    font-size: 10px;
  }

  .flex-2 {
    flex: 2;
  }

  .flex-1 {
    flex: 1;
  }
  .bg-grey {
    background-color: #f4f4f4;
  }

  .border-bottom {
    border-bottom: 1px solid grey;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .border-1 {
    border: 1px solid #e2e6ec;
  }
  .green-btn {
    background-color: #04a46e !important;
    border: none;
    color: white;
    &:active {
      color: white;
    }
  }

  .black-btn {
    background-color: #000 !important;
    border: none;
    color: white;
    &:active {
      color: white;
    }
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

  .input-icon {
    display: flex;
    height: 100%;
    align-items: center;
    border-right: 1px solid #dee2e6;
    padding-right: 10px;
  }

  /* Tooltip container */
  .custom-tooltip {
    position: relative;
    display: inline-block;
  }

  /* Tooltip text */
  .custom-tooltip .tooltiptext {
    visibility: hidden;
    width: 250px;
    background-color: #fff;
    color: #6c757d;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    font-size: 12px;
    border: 0.2px solid #6c757d;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: -30px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Tooltip arrow */
  .custom-tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 15%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .custom-tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .form-check-input:checked {
    background-color: #04a46e !important;
    border-color: #04a46e !important;
  }

  .gap-6 {
    gap: 2.5rem;
  }

  a.no-space {
    display: inline-block;
  }

  .fw-light-bold {
    font-weight: 600 !important;
  }

  .disabled .circle {
    opacity: 0.5;
  }

  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .grey {
    background-color: #818181;
  }

  @media screen and (max-width: 970px) {
    .gap-6 {
      gap: 1.5rem !important;
    }
  }

  @media screen and (max-width: 570px) {
    .gap-6 {
      gap: 0.5rem !important;
    }
  }
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const [labels, setLabels] = useState([]);
const [title, setTitle] = useState(null);
const [description, setDescription] = useState(null);
const [summary, setSummary] = useState(null);
const [consent, setConsent] = useState({ toc: false, coc: false });
const [submissionDeadline, setSubmissionDeadline] = useState(null);
const [allowDraft, setAllowDraft] = useState(true);

const [loading, setLoading] = useState(true);
const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(false);
const [isDraftBtnOpen, setDraftBtnOpen] = useState(false);

const [showRFPPage, setShowRfpPage] = useState(false); // when user creates/edit a RFP and confirm the txn, this is true
const [rfpId, setRfpId] = useState(null);
const [rfpIdsArray, setRfpIdsArray] = useState(null);
const [isTxnCreated, setCreateTxn] = useState(false);
const [oldRfpData, setOldRfpData] = useState(null);
const [selectedProposals, setSelectedProposals] = useState([]);

const [timeline, setTimeline] = useState({
  status: TIMELINE_STATUS.ACCEPTING_SUBMISSIONS,
});

if (allowDraft) {
  draftRfpData = Storage.privateGet(draftKey);
}

const memoizedDraftData = useMemo(
  () => ({
    id: editRfpData.id ?? null,
    snapshot: {
      name: title,
      description: description,
      labels: labels,
      summary: summary,
      submission_deadline: submissionDeadline,
      timeline: timeline,
    },
  }),
  [title, summary, description, submissionDeadline, labels]
);

useEffect(() => {
  if (allowDraft) {
    let data = editRfpData || JSON.parse(draftRfpData);
    let snapshot = data.snapshot;
    if (data) {
      if (timestamp) {
        snapshot =
          data.snapshot_history.find((item) => item.timestamp === timestamp) ??
          data.snapshot;
      }
      if (
        draftRfpData &&
        editRfpData &&
        editRfpData.id === JSON.parse(draftRfpData).id
      ) {
        snapshot = {
          ...editRfpData.snapshot,
          ...JSON.parse(draftRfpData).snapshot,
        };
      }
      setLabels(snapshot.labels);
      setTitle(snapshot.name);
      setSummary(snapshot.summary);
      setDescription(snapshot.description);
      setSubmissionDeadline(snapshot.submission_deadline);
      setTimeline(snapshot.timeline);
      if (isEditPage) {
        setConsent({ toc: true, coc: true });
      }
    }
    setLoading(false);
  }
}, [editRfpData, draftRfpData, allowDraft]);

useEffect(() => {
  if (draftRfpData) {
    setAllowDraft(false);
  }
}, [draftRfpData]);

useEffect(() => {
  if (showRFPPage) {
    return;
  }
  setDisabledSubmitBtn(
    isTxnCreated ||
      !title ||
      !description ||
      !summary ||
      !labels ||
      !submissionDeadline ||
      !consent.toc ||
      !consent.coc
  );
  const handler = setTimeout(() => {
    Storage.privateSet(draftKey, JSON.stringify(memoizedDraftData));
  }, 10000);

  return () => clearTimeout(handler);
}, [
  memoizedDraftData,
  draftKey,
  draftRfpData,
  consent,
  isTxnCreated,
  showRFPPage,
]);

const InputContainer = ({ heading, description, children }) => {
  return (
    <div className="d-flex flex-column gap-1 gap-sm-2 w-100">
      <b className="h6 mb-0">{heading}</b>
      {description && (
        <div className="text-muted w-100 text-sm">{description}</div>
      )}
      {children}
    </div>
  );
};

// show RFP created after txn approval for popup wallet
useEffect(() => {
  if (isTxnCreated) {
    if (editRfpData) {
      setOldRfpData(editRfpData);
      if (
        editRfpData &&
        typeof editRfpData === "object" &&
        oldRfpData &&
        typeof oldRfpData === "object" &&
        JSON.stringify(editRfpData) !== JSON.stringify(oldRfpData)
      ) {
        setCreateTxn(false);
        setRfpId(editRfpData.id);
        setShowRfpPage(true);
      }
    } else {
      const rfpIds = Near.view(
        REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
        "get_all_rfp_ids"
      );
      if (Array.isArray(rfpIds) && !rfpIdsArray) {
        setRfpIdsArray(rfpIds);
      }
      if (
        Array.isArray(rfpIds) &&
        Array.isArray(rfpIdsArray) &&
        rfpIds.length !== rfpIdsArray.length
      ) {
        setCreateTxn(false);
        setRfpId(rfpIds[rfpIds.length - 1]);
        setShowRfpPage(true);
      }
    }
  }
});

useEffect(() => {
  if (props.transactionHashes) {
    setLoading(true);
    useCache(
      () =>
        asyncFetch(REPL_RPC_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "dontcare",
            method: "tx",
            params: [props.transactionHashes, context.accountId],
          }),
        }).then((transaction) => {
          const transaction_method_name =
            transaction?.body?.result?.transaction?.actions[0].FunctionCall
              .method_name;

          const is_edit_or_add_rfp_transaction =
            transaction_method_name == "add_rfp" ||
            transaction_method_name == "edit_rfp";

          if (is_edit_or_add_rfp_transaction) {
            setShowRfpPage(true);
            Storage.privateSet(draftKey, null);
          }
          // show the latest created rfp to user
          if (transaction_method_name == "add_rfp") {
            useCache(
              () =>
                Near.asyncView(
                  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
                  "get_all_rfp_ids"
                ).then((rfpIdsArray) => {
                  setRfpId(rfpIdsArray?.[rfpIdsArray?.length - 1]);
                }),
              props.transactionHashes + "rfpIds",
              { subscribe: false }
            );
          } else {
            setRfpId(id);
          }
          setLoading(false);
        }),
      props.transactionHashes + context.accountId,
      { subscribe: false }
    );
  } else {
    if (showRFPPage) {
      setShowRfpPage(false);
    }
  }
}, [props.transactionHashes]);

const LoadingButtonSpinner = (
  <span
    class="submit-rfp-loading-indicator spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>
);

//TODO
const onSubmit = () => {
  setCreateTxn(true);
  console.log("submitting transaction");
  const body = {
    rfp_body_version: "V0",
    name: title,
    description: description,
    summary: summary,
    submission_deadline: submissionDeadline,
    timeline: {},
  };
  const args = { labels: labels, body: body };
  if (isEditPage) {
    args["id"] = editRfpData.id;
  }

  Near.call([
    {
      contractName: REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
      methodName: isEditPage ? "edit_rfp" : "add_rfp",
      args: args,
      gas: 270000000000000,
    },
  ]);
};

function cleanDraft() {
  Storage.privateSet(draftKey, null);
}

if (loading) {
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

const [collapseState, setCollapseState] = useState({});

const CollapsibleContainer = ({ title, children, noPaddingTop }) => {
  return (
    <div
      className={
        "border-bottom py-4 " +
        (noPaddingTop && "pt-0 ") +
        (collapseState[title] && " pb-0")
      }
    >
      <div className={"d-flex justify-content-between "}>
        <div className="h5 text-muted mb-2 mb-sm-3">{title}</div>
        <div
          className="d-flex d-sm-none cursor-pointer"
          onClick={() =>
            setCollapseState((prevState) => ({
              ...prevState,
              [title]: !prevState[title],
            }))
          }
        >
          {!collapseState[title] ? (
            <i class="bi bi-chevron-up h4"></i>
          ) : (
            <i class="bi bi-chevron-down h4"></i>
          )}
        </div>
      </div>
      <div className={!collapseState[title] ? "" : "d-none"}>{children}</div>
    </div>
  );
};

const CategoryDropdown = useMemo(() => {
  return (
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.MultiSelectCategoryDropdown`}
      props={{
        selected: labels,
        onChange: (v) => setLabels(v),
        disabled: false,
        availableOptions: RfpCategoryOptions,
      }}
    />
  );
}, [draftRfpData]);

const TitleComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
      props={{
        className: "flex-grow-1",
        value: title,
        onBlur: (e) => {
          setTitle(e.target.value);
        },
        skipPaddingGap: true,
        inputProps: {
          max: 80,
          required: true,
        },
      }}
    />
  );
}, [draftRfpData]);

const SummaryComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
      props={{
        className: "flex-grow-1",
        value: summary,
        multiline: true,
        onBlur: (e) => {
          setSummary(e.target.value);
        },
        skipPaddingGap: true,
        inputProps: {
          max: 500,
          required: true,
        },
      }}
    />
  );
}, [draftRfpData]);

const DescriptionComponent = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Compose`}
      props={{
        data: description,
        onChange: setDescription,
        autocompleteEnabled: true,
        autoFocus: false,
      }}
    />
  );
}, [draftRfpData]);

const ConsentComponent = useMemo(() => {
  return (
    <div className="d-flex flex-column gap-2">
      <Widget
        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Checkbox`}
        props={{
          value: "toc",
          label: (
            <>
              I’ve agree to{" "}
              <a
                href={ToCDocs}
                className="text-decoration-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
              and commit to honoring it
            </>
          ),
          isChecked: consent.toc,
          onClick: (value) =>
            setConsent((prevConsent) => ({
              ...prevConsent,
              toc: value,
            })),
        }}
      />
      <Widget
        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Checkbox`}
        props={{
          value: "coc",
          label: (
            <>
              I’ve read{" "}
              <a
                href={CoCDocs}
                className="text-decoration-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code of Conduct
              </a>
              and commit to honoring it
            </>
          ),
          isChecked: consent.coc,
          onClick: (value) =>
            setConsent((prevConsent) => ({
              ...prevConsent,
              coc: value,
            })),
        }}
      />
    </div>
  );
}, [draftRfpData]);

const SubmitBtn = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
      props={{
        classNames: {
          root: "d-flex h-100 fw-light-bold btn-outline shadow-none border-1",
        },
        label: (
          <div className="d-flex align-items-center gap-2">
            <div className="circle grey"></div> <div>Submit</div>
          </div>
        ),
        onClick: onSubmit,
      }}
    />
  );
}, [disabledSubmitBtn]);

const SubmissionDeadline = useMemo(() => {
  return (
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Input`}
      props={{
        className: "flex-grow-1",
        value: submissionDeadline,
        onBlur: (e) => {
          setSubmissionDeadline(e.target.value);
        },
        skipPaddingGap: true,
        type: "date",
        inputProps: {
          required: true,
        },
      }}
    />
  );
}, [draftRfpData]);

const SelectedProposal = useMemo(() => {
  return (
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.ProposalSearchDropdown`}
      props={{
        whereClause: {
          timeline: { _cast: { String: { _ilike: `%APPROVED%` } } },
        },
        linkedProposals: selectedProposals,
        onChange: (v) => setSelectedProposals(v),
      }}
    />
  );
}, [draftRfpData]);

if (showRFPPage) {
  return (
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.Rfp`}
      props={{ id: rfpId, ...props }}
    />
  );
} else
  return (
    <Container className="w-100 py-2 px-0 px-sm-2 d-flex flex-column gap-3">
      <Heading className="px-2 px-sm-0">
        {isEditPage ? "Edit" : "Create"} RFP
      </Heading>
      <div className="card no-border rounded-0 px-2 p-lg-0 full-width-div">
        <div className="container-xl py-4 d-flex flex-wrap gap-6 w-100">
          <div
            style={{ minWidth: "350px" }}
            className="flex-2 w-100 order-2 order-md-1"
          >
            <div className="d-flex gap-3 w-100">
              <div className="d-none d-sm-flex">
                <img src={RFPImage} height={35} width={35} />
              </div>
              <div className="d-flex flex-column gap-4 w-100">
                <InputContainer
                  heading="Category"
                  description={
                    <>
                      Select the category to help users quickly understand the
                      nature of the need. Need guidance? See{" "}
                      <a
                        href={FundingDocs}
                        className="text-decoration-underline no-space"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Funding Docs
                      </a>
                      .
                    </>
                  }
                >
                  {CategoryDropdown}
                </InputContainer>
                <InputContainer
                  heading="Title"
                  description="Highlight the essence of your RFP in a few words. This will appear on your RFP’s detail page and the main RFP feed. Keep it short, please :)"
                >
                  {TitleComponent}
                </InputContainer>
                <InputContainer
                  heading="Summary"
                  description="Explain your RFP briefly. What is the problem or need, desired outcome, and benefit to the NEAR developer community."
                >
                  {SummaryComponent}
                </InputContainer>
                <InputContainer
                  heading="Description"
                  description={
                    "Expand on your summary with any relevant details like a detailed explanation of the problem and the expected solution, scope, and deliverables. Also include an estimate range for the project if you have a specific budget. And the selection criteria."
                  }
                >
                  {DescriptionComponent}
                </InputContainer>
                <InputContainer heading="Final Consent">
                  {ConsentComponent}
                </InputContainer>
                <div className="d-flex justify-content-between gap-2 align-items-center">
                  <div>
                    {isEditPage && (
                      <Widget
                        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
                        props={{
                          classNames: {
                            root: "btn-outline-danger shadow-none border-0 btn-sm",
                          },
                          label: (
                            <div className="d-flex align-items-center gap-1">
                              <i class="bi bi-trash3"></i> Cancel RFP
                            </div>
                          ),
                          onClick: () => setCancelModal(true), // TODO
                        }}
                      />
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      to={
                        isEditPage
                          ? href({
                              widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
                              params: {
                                page: "rfp",
                                id: parseInt(id),
                              },
                            })
                          : href({
                              widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
                              params: {
                                page: "rfps",
                              },
                            })
                      }
                    >
                      <Widget
                        src={`${REPL_DEVHUB}/widget/devhub.components.molecule.Button`}
                        props={{
                          classNames: {
                            root: "d-flex h-100 text-muted fw-bold btn-outline shadow-none border-0 btn-sm",
                          },
                          label: "Discard Changes",
                          onClick: cleanDraft,
                        }}
                      />
                    </Link>
                    {SubmitBtn}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ minWidth: "350px" }}
            className="flex-1 w-100 order-1 order-md-2"
          >
            <CollapsibleContainer noPaddingTop={true}>
              <div className="d-flex flex-column gap-3 gap-sm-4">
                <InputContainer
                  heading="Submission Deadline"
                  description="Enter the deadline for submitting proposals."
                >
                  {SubmissionDeadline}
                </InputContainer>
              </div>
            </CollapsibleContainer>
            <div className="my-2">
              <CollapsibleContainer title="Timeline">
                <Widget
                  src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.rfps.TimelineConfigurator`}
                  props={{
                    timeline: timeline,
                    setTimeline: setTimeline,
                    disabled: false,
                  }}
                />
              </CollapsibleContainer>
            </div>
            <div className="my-2">
              <CollapsibleContainer
                title="Selected Proposal"
                description="Add the proposal(s) you want to approve for this RFP. Only approved proposals are shown in the list."
              >
                {SelectedProposal}
              </CollapsibleContainer>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
