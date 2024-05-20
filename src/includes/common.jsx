export const REPL_DEVHUB = "devhub.near";
export const REPL_INFRASTRUCTURE_COMMITTEE = "infrastructure-committee.near";
export const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT = "truedove38.near";
export const REPL_RPC_URL = "https://rpc.mainnet.near.org";
export const REPL_NEAR = "near";
export const RFP_IMAGE =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

export const RFP_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_rfps_with_latest_snapshot";

export const RFP_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_rfp_snapshots";

export const PROPOSAL_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_proposals_with_latest_snapshot";

export const PROPOSAL_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_proposal_snapshots";
export const RFP_TIMELINE_STATUS = {
  ACCEPTING_SUBMISSIONS: "ACCEPTING_SUBMISSIONS",
  EVALUATION: "EVALUATION",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  CANCELLED: "CANCELLED",
};

export const PROPOSAL_TIMELINE_STATUS = {
  DRAFT: "DRAFT",
  REVIEW: "REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELLED",
  APPROVED_CONDITIONALLY: "APPROVED_CONDITIONALLY",
  PAYMENT_PROCESSING: "PAYMENT_PROCESSING",
  FUNDED: "FUNDED",
};

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;

export async function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(QUERYAPI_ENDPOINT, {
    method: "POST",
    headers: { "x-hasura-role": `polyprogrammist_near` },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

export const CANCEL_RFP_OPTIONS = {
  CANCEL_PROPOSALS: "CANCEL_PROPOSALS",
  UNLINK_PROPOSALS: "UNLINK_PROPOSALSS",
  NONE: "NONE",
};

export function parseJSON(json) {
  if (typeof json === "string") {
    try {
      return JSON.parse(json);
    } catch (error) {
      return json;
    }
  } else {
    return json;
  }
}

export function isNumber(value) {
  return typeof value === "number";
}

export const PROPOSALS_APPROVED_STATUS_ARRAY = [
  PROPOSAL_TIMELINE_STATUS.APPROVED,
  PROPOSAL_TIMELINE_STATUS.APPROVED_CONDITIONALLY,
  PROPOSAL_TIMELINE_STATUS.PAYMENT_PROCESSING,
  PROPOSAL_TIMELINE_STATUS.FUNDED,
];
