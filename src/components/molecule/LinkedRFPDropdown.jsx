import {
  REPL_INFRASTRUCTURE_COMMITTEE,
  REPL_DEVHUB,
  RFP_INDEXER_QUERY_NAME,
  TIMELINE_STATUS,
} from "@/includes/common";

const { href } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);
href || (href = () => {});

const linkedRfp = props.linkedRfp;
const onChange = props.onChange;
const [selectedRFP, setSelectedRFP] = useState(null);
const [rfpOptions, setRfpOptions] = useState([]);
const [searchRFPId, setSearchRfpId] = useState("");
const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;
const queryName = RFP_INDEXER_QUERY_NAME;
const query = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${queryName}_bool_exp = {}) {
  ${queryName}(
    offset: $offset
    limit: $limit
    order_by: {rfp_id: desc}
    where: $where
  ) {
    name
    rfp_id
  }
  }`;

function separateNumberAndText(str) {
  const numberRegex = /\d+/;

  if (numberRegex.test(str)) {
    const number = str.match(numberRegex)[0];
    const text = str.replace(numberRegex, "").trim();
    return { number: parseInt(number), text };
  } else {
    return { number: null, text: str.trim() };
  }
}

const buildWhereClause = () => {
  // show only accepting submissions stage rfps
  let where = {
    timeline: {
      _cast: {
        String: { _ilike: `%${TIMELINE_STATUS.ACCEPTING_SUBMISSIONS}%` },
      },
    },
  };
  const { number, text } = separateNumberAndText(searchRFPId);

  if (number) {
    where = { rfp_id: { _eq: number }, ...where };
  }

  if (text) {
    where = { name: { _ilike: `%${text}%` }, ...where };
  }

  return where;
};

function fetchGraphQL(operationsDoc, operationName, variables) {
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

const fetchRfps = () => {
  const FETCH_LIMIT = 30;
  const variables = {
    limit: FETCH_LIMIT,
    offset: 0,
    where: buildWhereClause(),
  };
  fetchGraphQL(query, "GetLatestSnapshot", variables).then(async (result) => {
    if (result.status === 200) {
      if (result.body.data) {
        const rfpsData = result.body.data?.[queryName];
        const data = [];
        for (const prop of rfpsData) {
          data.push({
            label: "# " + prop.rfp_id + " : " + prop.name,
            value: prop.rfp_id,
          });
        }
        setRfpOptions(data);
      }
    }
  });
};

useEffect(() => {
  fetchRfps();
}, [searchRFPId]);

useEffect(() => {
  if (
    JSON.stringify(linkedRfp) !== JSON.stringify(selectedRFP) &&
    rfpOptions.length > 0
  ) {
    if (typeof linkedRfp !== "object") {
      setSelectedRFP(rfpOptions.find((i) => linkedRfp === i.value));
    } else {
      setSelectedRFP(linkedRfp);
    }
  }
}, [linkedRfp, rfpOptions]);

useEffect(() => {
  if (JSON.stringify(linkedRfp) !== JSON.stringify(selectedRFP)) {
    onChange(selectedRFP);
  }
}, [selectedRFP]);

return (
  <>
    {selectedRFP && (
      <div className="d-flex gap-2 align-items-center">
        <a
          className="text-decoration-underline flex-1"
          href={href({
            widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
            params: {
              page: "rfp",
              id: selectedRFP.value,
            },
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {selectedRFP.label}
        </a>
        <div
          className="cursor-pointer"
          onClick={() => {
            setSelectedRFP(null);
          }}
        >
          <i className="bi bi-trash3-fill"></i>
        </div>
      </div>
    )}

    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.DropDownWithSearch`}
      props={{
        selectedValue: "",
        onChange: (v) => {
          setSelectedRFP(v);
        },
        options: rfpOptions,
        showSearch: true,
        searchInputPlaceholder: "Search by Id",
        defaultLabel: "Search RFP",
        searchByValue: true,
        onSearch: (value) => {
          setSearchRfpId(value);
        },
      }}
    />
  </>
);
