"use client";

import { NavigationBar } from "@/components";
import { CTRChart, PerformanceChart, EffectivenessChart } from "./charts";
import "./style.scss";

const Insights = () => {
  return (
    <main>
      <NavigationBar selectedTab="insights" />

      <div id="insights-wrapper">
        <div id="charts-row-1">
          <CTRChart />
        </div>
        <div id="charts-row-2">
          <div className="chart-left">
            <PerformanceChart />
          </div>
          <div className="chart-right">
            <EffectivenessChart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Insights;
