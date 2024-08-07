"use client";
import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import { X, ScanSearch } from "lucide-react";
import debounce from "lodash.debounce";
import Modal from "./modal"; // Import the modal component

interface MachineProps {
  imgSrc: string;
  width: number;
  height: number;
  drop: {
    code: string;
    DateOfInstallation: string;
    NominalPower: string;
    NumberOfUnits: string;
  };
  isExpanded: boolean;
  onExpand: () => void;
  index: number;
}

const Machine: React.FC<MachineProps> = React.memo(
  ({ imgSrc, drop, width, isExpanded, onExpand }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const modalContainerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(width);

    const handleResize = useCallback(
      debounce(() => {
        const maxWidth = window.innerWidth * 0.4;
        setContainerWidth((prevWidth) =>
          isExpanded ? Math.max(maxWidth, width) : width
        );
      }, 300),
      [isExpanded, width]
    );

    useLayoutEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [handleResize]);

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          if (isExpanded) {
            onExpand();
          }
        }
      },
      [isExpanded, onExpand]
    );

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onExpand();
      },
      [onExpand]
    );

    useEffect(() => {
      if (isExpanded && containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, [isExpanded]);

    return (
      <div
        ref={containerRef}
        className={`w-full max-w-full flex flex-col justify-center items-center border ${
          isExpanded ? "border-slate-600" : "border-gray-400"
        } p-2 space-y-2 transition-all duration-700 ease-in-out overflow-hidden`}
        style={{ width: width }}
        onClick={handleClick}
      >
        <div className="w-full flex flex-row justify-between items-center border border-slate-400 p-2">
          <label className="font-bold">Cogeneration</label>
          <div className="flex items-center">
            <div className="h-full w-px bg-gray-700 mx-4"></div>
            {isExpanded ? (
              <X className="cursor-pointer" onClick={handleClick} />
            ) : (
              <ScanSearch className="cursor-pointer" onClick={handleClick} />
            )}
            <div className="h-full w-px bg-gray-700 mx-4"></div>
          </div>
        </div>
        <div className="relative w-full h-64">
          <Image
            src={imgSrc}
            alt="Machine"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <Modal ref={modalContainerRef} isOpen={isExpanded} onClose={onExpand}>
          <div className="flex flex-col justify-center space-y-2">
            <div className="relative w-full h-64">
              <Image
                src={imgSrc}
                alt="Machine"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-col justify-start space-y-2 px-2 bg-slate-400 transition-all duration-1000 ease-in-out">
              {Object.entries(drop).map(([key, value]) => (
                <React.Fragment key={key}>
                  <div className="md:flex md:flex-row justify-between sm:flex sm:flex-col sm:items-center p-2">
                    <span className="font-bold">{key}:</span>
                    <span>{value}</span>
                  </div>
                  <div className="w-full h-px bg-gray-600 my-1"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
);

Machine.displayName = "Machine";
export default Machine;
