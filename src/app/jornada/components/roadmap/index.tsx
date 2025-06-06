import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useParams } from "react-router-dom";
import { ConteudoJornadaResponse } from "../../service/types/conteudoJornadaResponse";
import { CustomNode } from "./customNode";
import { useRoadmapData } from "./hooks/useRoadmapData";

const nodeTypes = { custom: CustomNode };

export function Roadmap({
  data,
}: {
  data: ConteudoJornadaResponse | undefined;
}) {
  const { idJornada } = useParams();
  const { nodes, edges } = useRoadmapData(data, idJornada);

  return (
    <section className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        attributionPosition="top-right"
        zoomOnDoubleClick={false}
      >
        <Background />
      </ReactFlow>
    </section>
  );
}
