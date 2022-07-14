import { useState, useEffect } from "react";
import "./App.scss";
import ExtendedAccordion from "./components/Accordion";
import { NodeContext } from "./contexts/NodeContext";

const CONTINENTS_QUERY = `
query {
  continents{
    name
    countries{
      name
      languages{
        name
      }
    }
  }
}

`;

function App() {
  const [hideTree, setHideTree] = useState(-1);

  const [continents, setContinents] = useState();

  const [queryName] = useState(["countries", "languages"]);

  useEffect(() => {
    fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: CONTINENTS_QUERY }),
    })
      .then((result) => result.json())
      .then((data) => {
        setContinents(data.data.continents);
        console.log(data);
      });
  }, []);

  const createNode = (node, index, lvl) => {
    return (
      <ExtendedAccordion open={false} title={node.name}>
        {node[queryName[lvl]] &&
          node[queryName[lvl]].map((child) =>
            createNode(child, index, lvl + 1)
          )}
      </ExtendedAccordion>
    );
  };

  return (
    <NodeContext.Provider value={{ hideTree, setHideTree }}>
      <div className="App">
        <h1>React Test Task</h1>
        <section className="nodesContainer">
          {continents &&
            continents.map((node, index) => createNode(node, index, 0))}
        </section>
      </div>
    </NodeContext.Provider>
  );
}

export default App;
