import { ImageManualProps } from "@/interfaces";
import React, { useEffect, useState } from "react";

export const ImageManual: React.FC<ImageManualProps> = ({ name }) => {
  const [reduceName, setReduceName] = useState("");

  useEffect(() => {
    const nameSpace = name.split(" ");
    setReduceName(nameSpace[0][0] + nameSpace[1][0]);
  }, [name]);

  return (
    <main>
      <p className="bg-brand1 rounded-full w-8 h-8 text-center pt-1 text-whiteFixed font-medium">
        {reduceName}
      </p>
    </main>
  );
};
