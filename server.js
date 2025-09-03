// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let kpiData = {
  punctualityRate: 92,
  avgDelay: 4.5,
  trackThroughput: 120,
};

let auditData = [
  {
    id: 1,
    timestamp: "2025-09-04 10:05",
    type: "AI Recommendation",
    detail: "Suggested dynamic rescheduling to avoid conflict at platform 5",
  },
  {
    id: 2,
    timestamp: "2025-09-04 10:10",
    type: "Human Decision",
    detail: "Controller approved 3-minute delay for Train 123",
  },
  {
    id: 3,
    timestamp: "2025-09-04 10:15",
    type: "AI Recommendation",
    detail: "Optimized route for Train 456 to reduce travel time by 8 minutes",
  },
  {
    id: 4,
    timestamp: "2025-09-04 10:20",
    type: "Human Decision",
    detail: "Emergency maintenance scheduled for Track 3 at Mumbai Central",
  },
];

// KPI Endpoints
app.get("/api/kpis", (req, res) => {
  // Simulate KPI fluctuation
  kpiData.punctualityRate = Math.min(
    100,
    (kpiData.punctualityRate + (Math.random() - 0.5) * 0.5).toFixed(1)
  );
  kpiData.avgDelay = Math.max(0, (kpiData.avgDelay + (Math.random() - 0.5) * 0.3).toFixed(2));
  kpiData.trackThroughput = Math.max(
    100,
    Math.round(kpiData.trackThroughput + Math.floor(Math.random() * 3 - 1))
  );

  res.json(kpiData);
});

app.put("/api/kpis", (req, res) => {
  const { punctualityRate, avgDelay, trackThroughput } = req.body;
  
  if (punctualityRate !== undefined) kpiData.punctualityRate = punctualityRate;
  if (avgDelay !== undefined) kpiData.avgDelay = avgDelay;
  if (trackThroughput !== undefined) kpiData.trackThroughput = trackThroughput;
  
  res.json({ message: "KPI data updated successfully", data: kpiData });
});

// Audit Trail Endpoints
app.get("/api/audit-trails", (req, res) => {
  res.json(auditData);
});

app.post("/api/audit-trails", (req, res) => {
  const { timestamp, type, detail } = req.body;
  
  if (!timestamp || !type || !detail) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  const newItem = {
    id: Date.now(),
    timestamp,
    type,
    detail
  };
  
  auditData.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/audit-trails/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { timestamp, type, detail } = req.body;
  
  const itemIndex = auditData.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  
  auditData[itemIndex] = {
    ...auditData[itemIndex],
    timestamp: timestamp || auditData[itemIndex].timestamp,
    type: type || auditData[itemIndex].type,
    detail: detail || auditData[itemIndex].detail
  };
  
  res.json(auditData[itemIndex]);
});

app.delete("/api/audit-trails/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = auditData.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  
  auditData.splice(itemIndex, 1);
  res.json({ message: "Item deleted successfully" });
});

// Analytics Endpoints
app.get("/api/analytics/performance", (req, res) => {
  const performanceData = {
    historical: [
      { time: '00:00', punctuality: 91, delay: 4.2, throughput: 115 },
      { time: '04:00', punctuality: 89, delay: 5.1, throughput: 98 },
      { time: '08:00', punctuality: 94, delay: 3.8, throughput: 125 },
      { time: '12:00', punctuality: 92, delay: 4.5, throughput: 120 },
      { time: '16:00', punctuality: 90, delay: 4.8, throughput: 118 },
      { time: '20:00', punctuality: 93, delay: 4.1, throughput: 122 },
    ],
    stations: [
      { name: 'Delhi', trains: 45, onTime: 42, delayed: 3 },
      { name: 'Mumbai', trains: 38, onTime: 35, delayed: 3 },
      { name: 'Chennai', trains: 32, onTime: 30, delayed: 2 },
      { name: 'Kolkata', trains: 28, onTime: 26, delayed: 2 },
      { name: 'Bangalore', trains: 25, onTime: 23, delayed: 2 },
    ],
    distribution: [
      { name: 'On Time', value: 85, color: '#10b981' },
      { name: 'Delayed', value: 12, color: '#f59e0b' },
      { name: 'Cancelled', value: 3, color: '#ef4444' },
    ]
  };
  
  res.json(performanceData);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
});
