import React from 'react';
import { X, Layers, ShieldCheck, Info } from 'lucide-react';

interface MapAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapAssetModal: React.FC<MapAssetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16181D]/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FFFFFF] rounded-xs border border-[#E2E5EB] max-w-xl w-full p-8 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xs text-[#697386] hover:text-[#16181D] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xs bg-[#EAF0FF] text-[#1E40AF] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 id="map-modal-title" className="text-2xl font-serif text-[#16181D]">
              Map Assets Protocol
            </h3>
            <span className="text-xs font-mono text-[#697386]">
              Verified Research Documentation
            </span>
          </div>
        </div>

        <p className="text-sm text-[#697386] leading-relaxed mb-6 font-normal">
          Landscape placeholders are active across Sections 02, 03, 05, and 09 to preserve space for official research diagrams without inventing speculative relationships.
        </p>

        {/* 4 Map Status Cards */}
        <div className="space-y-3 mb-8">
          
          <div className="p-4 rounded-xs bg-[#F7F7F5] border border-[#E2E5EB] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-serif text-base text-[#16181D]">
                01. ACTORS MAP // Section 02
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#E6F4EA] text-[#137333] font-medium border border-[#CEEAD6]">
                Verified Asset Integrated
              </span>
            </div>
            <p className="text-xs text-[#697386]">
              Verified system actor diagram integrated. Full-width responsive display with high-resolution lightbox inspection. Alumni strictly excluded.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-[#F7F7F5] border border-[#E2E5EB] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-serif text-base text-[#16181D]">
                02. CSD ECOSYSTEM MAP // Section 03
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#E6F4EA] text-[#137333] font-medium border border-[#CEEAD6]">
                Verified Asset Integrated
              </span>
            </div>
            <p className="text-xs text-[#697386]">
              Verified concentric ecosystem architecture integrated. Full-width responsive canvas with high-resolution lightbox inspection.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-[#F7F7F5] border border-[#E2E5EB] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-serif text-base text-[#16181D]">
                03. CSD OPERATIONAL PROCESS MAP // Section 05
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#E6F4EA] text-[#137333] font-medium border border-[#CEEAD6]">
                Verified Asset Integrated
              </span>
            </div>
            <p className="text-xs text-[#697386]">
              Verified operational workflow diagram integrated. Full-width responsive visual mapping CSD, Departments, Companies, and Students with high-resolution lightbox inspection.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-[#F7F7F5] border border-[#E2E5EB] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-serif text-base text-[#16181D]">
                04. STUDENT PLACEMENT JOURNEY // Section 09
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#E6F4EA] text-[#137333] font-medium border border-[#CEEAD6]">
                Verified Asset Integrated
              </span>
            </div>
            <p className="text-xs text-[#697386]">
              Verified 7-milestone student placement experience diagram integrated. Full-width responsive canvas mapping touchpoints and emotions with high-resolution lightbox inspection.
            </p>
          </div>

        </div>

        {/* Guide Note */}
        <div className="p-4 rounded-xs bg-[#EAF0FF]/50 border border-[#DCE6FF] space-y-1.5 mb-6 text-xs text-[#16181D]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#1E40AF] font-semibold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Integration Instructions</span>
          </span>
          <p className="text-xs text-[#697386]">
            When ready, provide PDF or image map files and prompt with <code className="bg-[#FFFFFF] px-1.5 py-0.5 rounded-xs border border-[#E2E5EB] text-[#1E40AF]">02_MAPS_LATER_PROMPT.txt</code> to update only the diagram visuals.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xs bg-[#1E40AF] hover:bg-[#1e3a8a] text-[#FFFFFF] text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
