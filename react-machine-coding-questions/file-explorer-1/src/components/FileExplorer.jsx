import Folder from "./Folder.jsx";

const Explorer = ({ data = {} }) => {
  if (Array.isArray(data)) {
    return data.map((item, i) => (
      <li style={{ marginLeft: "10px" }} key={i}>
        {item}
      </li>
    ));
  }
  return (
    <>
      {Object.entries(data).map(([key, val]) => {
        return (
          <Folder name={key} key={key}>
            <Explorer data={val} />
          </Folder>
        );
      })}
    </>
  );
};

function FileExplorer({ data }) {
  return (
    <ul>
      <Explorer data={data} />
    </ul>
  );
}

export default FileExplorer;
