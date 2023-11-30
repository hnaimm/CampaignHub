"use client";
import { Card } from "@/components";
import { ResponsiveRadar } from "@nivo/radar";
import { EffectivenessChartData } from "../../../data/EffectivenessChartData";

const EffectivenessChart = () => {
  return (
    <Card>
      <>
        <h1>Overall Campaign Effectiveness</h1>
        <p>
          Evaluate campaigns based on multiple metrics (e.g., impressions,
          conversions, social shares), providing a holistic view of each
          campaign's effectiveness.
        </p>
        <div style={{ height: "23vh" }}>
          <ResponsiveRadar
            data={EffectivenessChartData}
            keys={["Email", "Display Ads", "Video Ads"]}
            indexBy="Campaign Type"
            valueFormat=">-.2f"
            margin={{ top: 60, right: 60, bottom: 30, left: 60 }}
            borderColor={{ from: "color" }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            colors={{ scheme: "nivo" }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </>
    </Card>
  );
};

export default EffectivenessChart;
