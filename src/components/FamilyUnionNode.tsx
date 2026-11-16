"use client";

import React from 'react';
import { Handle, Position } from '@xyflow/react';

export function FamilyUnionNode() {
  return (
    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#8B1E1E] via-[#B45309] to-[#7F1D1D] border border-[#FDE68A] shadow-md shadow-[#8B1E1E]/30 flex items-center justify-center p-0.5 relative transition-transform hover:scale-130 cursor-default group">
      {/* Side handles to connect from spouses */}
      <Handle
        type="target"
        position={Position.Left}
        id="union-left"
        className="!bg-[#B45309] !w-1.5 !h-1.5 !border-0 !opacity-0"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="union-right"
        className="!bg-[#B45309] !w-1.5 !h-1.5 !border-0 !opacity-0"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="union-top"
        className="!bg-[#B45309] !w-1.5 !h-1.5 !border-0 !opacity-0"
      />

      {/* Pure Vector Golden Solar / Union Emblem */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#FEF3C7] select-none pointer-events-none">
        <circle cx="12" cy="12" r="10" stroke="#FDE68A" strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="12" cy="12" r="7" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <circle cx="12" cy="12" r="3.5" fill="#FDE68A" />
        <circle cx="12" cy="12" r="1.5" fill="#8B1E1E" />
      </svg>

      {/* Bottom handle to branch down to children */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="union-bottom"
        className="!bg-[#B45309] !w-2 !h-2 !border-0"
      />
    </div>
  );
}

export default FamilyUnionNode;


