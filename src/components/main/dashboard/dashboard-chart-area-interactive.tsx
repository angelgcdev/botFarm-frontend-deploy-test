"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Datos de ejemplo para interacciones en TikTok y Facebook
const chartData = [
  { date: "2024-04-01", tiktok: 222, facebook: 150 },
  { date: "2024-04-02", tiktok: 97, facebook: 180 },
  { date: "2024-04-03", tiktok: 167, facebook: 120 },
  { date: "2024-04-04", tiktok: 242, facebook: 260 },
  { date: "2024-04-05", tiktok: 373, facebook: 290 },
  { date: "2024-04-06", tiktok: 301, facebook: 340 },
  { date: "2024-04-07", tiktok: 245, facebook: 180 },
  { date: "2024-04-08", tiktok: 409, facebook: 320 },
  { date: "2024-04-09", tiktok: 59, facebook: 110 },
  { date: "2024-04-10", tiktok: 261, facebook: 190 },
  { date: "2024-04-11", tiktok: 327, facebook: 350 },
  { date: "2024-04-12", tiktok: 292, facebook: 210 },
  { date: "2024-04-13", tiktok: 342, facebook: 380 },
  { date: "2024-04-14", tiktok: 137, facebook: 220 },
  { date: "2024-04-15", tiktok: 120, facebook: 170 },
  { date: "2024-04-16", tiktok: 138, facebook: 190 },
  { date: "2024-04-17", tiktok: 446, facebook: 360 },
  { date: "2024-04-18", tiktok: 364, facebook: 410 },
  { date: "2024-04-19", tiktok: 243, facebook: 180 },
  { date: "2024-04-20", tiktok: 89, facebook: 150 },
  { date: "2024-04-21", tiktok: 137, facebook: 200 },
  { date: "2024-04-22", tiktok: 224, facebook: 170 },
  { date: "2024-04-23", tiktok: 138, facebook: 230 },
  { date: "2024-04-24", tiktok: 387, facebook: 290 },
  { date: "2024-04-25", tiktok: 215, facebook: 250 },
  { date: "2024-04-26", tiktok: 75, facebook: 130 },
  { date: "2024-04-27", tiktok: 383, facebook: 420 },
  { date: "2024-04-28", tiktok: 122, facebook: 180 },
  { date: "2024-04-29", tiktok: 315, facebook: 240 },
  { date: "2024-04-30", tiktok: 454, facebook: 380 },
]

const chartConfig = {
  interactions: {
    label: "Interacciones",
  },
  tiktok: {
    label: "TikTok",
    color: "hsl(0, 0%, 0%)", // Negro para TikTok
  },
  facebook: {
    label: "Facebook",
    color: "hsl(214, 89%, 52%)", // Azul para Facebook
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-04-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Interacciones Programadas en el Último Mes</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Comparativa entre TikTok y Facebook</span>
          <span className="@[540px]/card:hidden">TikTok vs Facebook</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Últimos 90 días
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Últimos 30 días
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Últimos 7 días
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="@[767px]/card:hidden flex w-40" aria-label="Select a value">
              <SelectValue placeholder="Últimos 30 días" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 90 días
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 días
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 días
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTikTok" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(0, 0, 0, 0.8)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="rgba(0, 0, 0, 0.1)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillFacebook" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(24, 119, 242, 0.8)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="rgba(24, 119, 242, 0.1)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="facebook" type="natural" fill="url(#fillFacebook)" stroke="hsl(214, 89%, 52%)" stackId="a" />
            <Area dataKey="tiktok" type="natural" fill="url(#fillTikTok)" stroke="hsl(0, 0%, 0%)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

