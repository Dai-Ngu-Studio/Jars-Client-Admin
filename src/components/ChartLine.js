import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend,
} from "recharts";
import Icon from "@material-tailwind/react/Icon";

export default function ChartLine({ report, chartName, headerColor, lineColor }) {
  return (
    <Card>
      <CardHeader color={headerColor} contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          Overview
        </h6>
        <h2 className="text-white text-2xl flex flex-row items-center gap-x-2">
          <Icon name="group" size="xl" />
          <div class="">{chartName}</div>
        </h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <ResponsiveContainer width="100%" height="95%">
            <LineChart data={report}>
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis dataKey="name">
                <Label value="Periods" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label
                  value="Number of users"
                  offset={10}
                  position="insideLeft"
                  angle={-90}
                />
              </YAxis>
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line name="Number of users" type="monotone" dataKey="value" stroke={lineColor}>
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
