import RoadmapColumn from "@components/sections/roadmap/RoadmapColumn";

import styles from "@/components/sections/roadmap/RoadmapPage.module.scss";

import { RoadmapColumnSkeleton } from "@components/sections/roadmap/RoadmapColumn";

import "react-loading-skeleton/dist/skeleton.css";
import { Suspense } from "react";

import { RoadmapMobileSkeleton } from "@components/sections/roadmap/RoadmapMobile";
import RoadmapMobile from "@components/sections/roadmap/RoadmapMobile";
import RoadmapHeader from "@components/sections/roadmap/RoadmapHeader";
import { Status } from "@/types";

export default function Page() {
  return (
    <div className={styles.roadmapPage}>
      <RoadmapHeader />
      <div className={styles.roadmapDesktop}>
        <div className={styles.entries}>
          <Suspense fallback={<RoadmapColumnSkeleton />}>
            <RoadmapColumn status={Status["Planned"]} />
          </Suspense>
          <Suspense fallback={<RoadmapColumnSkeleton />}>
            <RoadmapColumn status={Status["Planned"]} />
          </Suspense>
          <Suspense fallback={<RoadmapColumnSkeleton />}>
            <RoadmapColumn status={Status["Planned"]} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<RoadmapMobileSkeleton />}>
        <RoadmapMobile />
      </Suspense>
    </div>
  );
}
