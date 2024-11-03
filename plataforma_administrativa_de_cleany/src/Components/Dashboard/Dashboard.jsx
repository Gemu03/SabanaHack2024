"use client";

import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Pie,
  Cell,
  PieChart
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import data1 from "../DataTable/MOCK_DATA.json";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simular la obtención de datos desde una fuente externa o local storage
    setData(data1);
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const evaluacionesPorCargo = processEvaluacionesPorCargo(data);

  // Procesa los datos para el gráfico
  const chartData = data.map((item) => ({
    browser: item.cargo.toLowerCase().replace(/\s+/g, "-"),
    visitors: item["duracion total en seg"],
    fill: `var(--color-${item.cargo.toLowerCase().replace(/\s+/g, "-")})`,
  }));
  
  const chartConfig = {
    visitors: {
      label: "Tiempo de duración del lavado en segundos",
    },
    "staff-scientist": {
      label: "Staff Scientist",
      color: "hsl(var(--chart-1))",
    },
    "environmental-specialist": {
      label: "Environmental Specialist",
      color: "hsl(var(--chart-2))",
    },
    "developer-ii": {
      label: "Developer II",
      color: "hsl(var(--chart-3))",
    },
    "senior-quality-engineer": {
      label: "Senior Quality Engineer",
      color: "hsl(var(--chart-4))",
    },
    "research-associate": {
      label: "Research Associate",
      color: "hsl(var(--chart-5))",
    },
  };

  const chartlineData = data.map(item => ({
    fechaHora: item.fechaHora,
    duracion: item["duracion total en seg"]
  }));

  const evaluationCounts = data.reduce((acc, item) => {
    acc[item.evaluacion] = (acc[item.evaluacion] || 0) + 1;
    return acc;
  }, {});
  
  const chartPieData = Object.keys(evaluationCounts).map(key => ({
    name: key,
    value: evaluationCounts[key]
  }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Duración por cargo</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart width={280} height={220} data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="browser" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="visitors" strokeWidth={2} radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Evaluación por cargo</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={280} height={220} data={evaluacionesPorCargo} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cargo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Excelente" fill="#8884d8" />
              <Bar dataKey="Buena" fill="#82ca9d" />
              <Bar dataKey="Regular" fill="#ffc658" />
              <Bar dataKey="Mala" fill="#ff8042" />
            </BarChart>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Duración a lo largo del tiempo</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={280} height={220} data={chartlineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fechaHora" />
              <Tooltip />
              <Line type="monotone" dataKey="duracion" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Distribución de evaluaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={280} height={220}>
              <Pie
                data={chartPieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

const processEvaluacionesPorCargo = (data) => {
  const result = {};

  data.forEach((item) => {
    if (!result[item.cargo]) {
      result[item.cargo] = { Excelente: 0, Buena: 0, Regular: 0, Mala: 0 };
    }
    result[item.cargo][item.evaluacion]++;
  });

  return Object.keys(result).map((cargo) => ({
    cargo,
    ...result[cargo],
  }));
};

export default Dashboard;
