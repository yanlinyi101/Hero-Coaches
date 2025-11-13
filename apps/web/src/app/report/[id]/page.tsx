"use client";

import { useQuery } from "@tanstack/react-query";
import { Report } from "@hero-coaches/schemas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchReport(id: string): Promise<Report> {
  const response = await fetch(`${API_BASE_URL}/report/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }
  return response.json();
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const { data: report, isLoading, error } = useQuery({
    queryKey: ["report", params.id],
    queryFn: () => fetchReport(params.id),
  });

  const handleSuggestionClick = (start: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start;
      videoRef.current.play();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center text-destructive">
          加载失败: {error instanceof Error ? error.message : "未知错误"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">复盘报告 #{report.reportId}</h1>
        <p className="text-muted-foreground">{report.summary}</p>
      </div>

      {/* 视频播放器 */}
      <Card>
        <CardHeader>
          <CardTitle>视频回放</CardTitle>
        </CardHeader>
        <CardContent>
          <video
            ref={videoRef}
            src={report.video.url}
            controls
            className="w-full rounded-lg"
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          >
            您的浏览器不支持视频播放。
          </video>
          <p className="text-sm text-muted-foreground mt-2">
            当前时间: {formatTime(currentTime)} / {formatTime(report.video.duration)}
          </p>
        </CardContent>
      </Card>

      {/* 3条建议卡片 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">改进建议</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {report.suggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSuggestionClick(suggestion.slice.start)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                <CardDescription>
                  {formatTime(suggestion.slice.start)} - {formatTime(suggestion.slice.end)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSuggestionClick(suggestion.slice.start);
                  }}
                >
                  跳转到片段
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 片段列表 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">关键片段</h2>
        <div className="space-y-2">
          {report.slices.map((slice, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleSuggestionClick(slice.start)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {formatTime(slice.start)} - {formatTime(slice.end)}
                    </p>
                    <p className="text-sm text-muted-foreground">{slice.why}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSuggestionClick(slice.start);
                    }}
                  >
                    查看
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

