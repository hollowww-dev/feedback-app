import RoadmapLoader from "@components/sections/roadmap/RoadmapLoader";

import styles from "@/components/sections/roadmap/RoadmapPage.module.scss";

import { RoadmapColumnSkeleton } from "@components/sections/roadmap/RoadmapColumn";

import "react-loading-skeleton/dist/skeleton.css";
import { Suspense } from "react";

import { RoadmapMobileSkeleton } from "@components/sections/roadmap/RoadmapMobile";
import RoadmapMobileLoader from "@components/sections/roadmap/RoadmapMobileLoader";
import RoadmapHeader from "@components/sections/roadmap/RoadmapHeader";

export default function Page() {
  return (
    <div className={styles.roadmapPage}>
      <RoadmapHeader />
      <div className={styles.roadmapDesktop}>
        <div className={styles.entries}>
          <Suspense fallback={<RoadmapColumnSkeleton />}>
            <RoadmapLoader status="planned" />
          </Suspense>
          <Suspense fallback={<RoadmapColumnSkeleton />}>
            <RoadmapLoader status="inprogress" />
          </Suspense>
          <Suspense fallback={<RoadmapColumnSkeleton />}>
            <RoadmapLoader status="live" />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<RoadmapMobileSkeleton />}>
        <RoadmapMobileLoader />
      </Suspense>
    </div>
  );
}
