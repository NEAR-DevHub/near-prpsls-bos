import { REPL_DEVHUB, TIMELINE_STATUS } from "@/includes//common";
const setSelected = props.onStateChange ?? (() => {});

const timelineStatusArray = Object.entries(TIMELINE_STATUS).map(
  ([key, value]) => ({
    label: key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
    value,
  })
);
return (
  <div>
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.DropDown`}
      props={{
        options: timelineStatusArray,
        label: "Timeline",
        onUpdate: (v) => {
          setSelected(v);
        },
      }}
    />
  </div>
);
