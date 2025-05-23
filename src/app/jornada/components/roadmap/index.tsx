import { ReactFlow, Background, Handle, Position, Node } from "@xyflow/react";
import { useMemo } from "react";
import "@xyflow/react/dist/style.css";
import type { Edge } from "@xyflow/react";
import { Checkbox } from "@/components/ui/checkbox";
import { ConteudoJornadaResponse } from "../../service/types/conteudoJornadaResponse";

interface CustomNodeData extends Node {
  label: string;
  onClick?: () => void;
  connections?: boolean;
  checked?: boolean;
}

function CustomNode({ data }: { data: CustomNodeData }) {
  return (
    <div
      className="flex items-center gap-4 bg-card p-5 relative cursor-pointer rounded-lg"
      onClick={data.onClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#555",
          opacity: data.connections ? 1 : 0,
          pointerEvents: data.connections ? "auto" : "none",
        }}
      />
      <Checkbox className="size-8" checked={data.checked} />
      <span style={{ fontWeight: 600, whiteSpace: "pre-line" }}>
        {String(data.label)}
      </span>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#555",
          opacity: data.connections ? 1 : 0,
          pointerEvents: data.connections ? "auto" : "none",
        }}
      />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

export function Roadmap({
  data,
}: {
  data: void | ConteudoJornadaResponse | undefined;
}) {
  // Monta nodes e edges dinamicamente
  const { nodes, edges } = useMemo(() => {
    if (!data?.roadmap) return { nodes: [], edges: [] };

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let yBase = 0;

    data.roadmap.forEach((modulo, i: number) => {
      const parentId = `modulo-${i}`;
      // Nó do módulo (pai)
      nodes.push({
        id: parentId,
        type: "custom",
        data: { label: modulo.title },
        position: { x: 0, y: yBase + 50 },
      });

      // Subtópicos (filhos)
      modulo.subtopicos.forEach((sub, j: number) => {
        const childId = `modulo-${i}-sub-${j}`;
        nodes.push({
          id: childId,
          type: "custom",
          data: {
            label: sub.title,
            onClick: () => {
              console.log("Clicado");
            },
            checked: sub.concluido,
          },
          position: { x: 450, y: yBase + 50 + j * 100 },
        });
        edges.push({
          id: `e-${parentId}-${childId}`,
          source: parentId,
          target: childId,
        });
      });

      // Atualiza yBase para o próximo módulo
      yBase += Math.max(1, modulo.subtopicos.length) * 100 + 50;
    });

    return { nodes, edges };
  }, [data]);

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
