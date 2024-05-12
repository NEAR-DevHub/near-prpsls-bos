export const REPL_DEVHUB = "devhub.near";
export const REPL_INFRASTRUCTURE_COMMITTEE = "infrastructure-committee.near";
export const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT = "truedove38.near";
export const REPL_RPC_URL = "https://rpc.mainnet.near.org";
export const REPL_NEAR = "near";
export const RFP_IMAGE =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

export const RFP_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_rfps_linked_rfps_with_latest_snapshot";

export const PROPOSAL_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_proposals_sierra_proposals_with_latest_snapshot";

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

export function fetchGraphQL(operationsDoc, operationName, variables) {
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