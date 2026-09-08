"use client";

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Heart } from 'lucide-react';

export function FamilyUnionNode() {
  return (
    <div className="w-5 h-5 rounded-full bg-rose-500/90 hover:bg-rose-600 border border-white shadow-sm flex items-center justify-center text-white transition-transform hover:scale-125 cursor-default relative">
      {/* Side handles to connect from spouses */}
      <Handle
        type="target"
        position={Position.Left}
        id="union-left"
        className="!bg-rose-400 !w-1.5 !h-1.5 !border-0 !opacity-0"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="union-right"
        className="!bg-rose-400 !w-1.5 !h-1.5 !border-0 !opacity-0"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="union-top"
        className="!bg-rose-400 !w-1.5 !h-1.5 !border-0 !opacity-0"
      />

      {/* Center icon */}
      <Heart className="w-2.5 h-2.5 fill-white" />

      {/* Bottom handle to branch down to children */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="union-bottom"
        className="!bg-rose-500 !w-2 !h-2 !border-0"
      />
    </div>
  );
}

export default FamilyUnionNode;
