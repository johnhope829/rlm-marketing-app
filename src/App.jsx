"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Calendar,
  BarChart2,
  Clock,
  Menu,
  X,
  ChevronRight,
  Percent,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import "./App.css"

// Chart components
const SalesTrendChart = ({ artist }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Generate mock data for sales trend
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const data = months.map((month) => ({
      month,
      sales: Math.floor(Math.random() * 500) + 500,
    }))
    setChartData(data)
  }, [artist])

  return (
    <div className="chart-container">
      <div className="chart-header">
        <TrendingUp size={18} />
        <h3 className="chart-title">Sales Trend</h3>
      </div>
      <div className="chart-content">
        <svg width="100%" height="200" viewBox="0 0 600 200">
          <g transform="translate(40,20)">
            {/* X-axis */}
            <line x1="0" y1="150" x2="520" y2="150" stroke="#e0e0e0" strokeWidth="1" />

            {/* Y-axis */}
            <line x1="0" y1="0" x2="0" y2="150" stroke="#e0e0e0" strokeWidth="1" />

            {/* X-axis labels */}
            {chartData.map((d, i) => (
              <text
                key={`x-label-${i}`}
                x={i * (520 / (chartData.length - 1))}
                y="170"
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {d.month}
              </text>
            ))}

            {/* Y-axis labels */}
            {[0, 250, 500, 750, 1000].map((tick, i) => (
              <text
                key={`y-label-${i}`}
                x="-10"
                y={150 - (i * 150) / 4}
                textAnchor="end"
                fontSize="12"
                fill="#666"
                dominantBaseline="middle"
              >
                {tick}
              </text>
            ))}

            {/* Line */}
            <path
              d={`M${chartData.map((d, i) => `${i * (520 / (chartData.length - 1))},${150 - (d.sales / 1000) * 150}`).join(" L")}`}
              fill="none"
              stroke="#2b5876"
              strokeWidth="3"
            />

            {/* Data points */}
            {chartData.map((d, i) => (
              <circle
                key={`point-${i}`}
                cx={i * (520 / (chartData.length - 1))}
                cy={150 - (d.sales / 1000) * 150}
                r="4"
                fill="#2b5876"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}

const TicketGaugeChart = ({ percentSold }) => {
  // Calculate the arc path for the gauge
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * 0.75 // 3/4 of a circle
  const startAngle = Math.PI * 0.625 // Start at 112.5 degrees (in radians)
  const endAngle = startAngle + Math.PI * 1.5 // End at 382.5 degrees (270 degree arc)

  // Calculate the progress point on the arc
  const progressAngle = startAngle + (percentSold / 100) * (endAngle - startAngle)
  const progressX = 100 + radius * Math.cos(progressAngle)
  const progressY = 100 + radius * Math.sin(progressAngle)

  // Calculate the arc path
  const arcPath = [
    `M ${100 + radius * Math.cos(startAngle)},${100 + radius * Math.sin(startAngle)}`,
    `A ${radius},${radius} 0 ${percentSold > 50 ? 1 : 0},1 ${progressX},${progressY}`,
  ].join(" ")

  // Calculate color based on percentage
  let color = "#ef4444" // red for low
  if (percentSold > 40) color = "#f59e0b" // amber for medium
  if (percentSold > 70) color = "#10b981" // green for high

  return (
    <div className="chart-container">
      <div className="chart-header">
        <Percent size={18} />
        <h3 className="chart-title">Tickets Sold</h3>
      </div>
      <div className="chart-content gauge-chart">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Background arc */}
          <path
            d={[
              `M ${100 + radius * Math.cos(startAngle)},${100 + radius * Math.sin(startAngle)}`,
              `A ${radius},${radius} 0 1,1 ${100 + radius * Math.cos(endAngle)},${100 + radius * Math.sin(endAngle)}`,
            ].join(" ")}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <path d={arcPath} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />

          {/* Percentage text */}
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="28"
            fontWeight="bold"
            fill="#333"
          >
            {percentSold}%
          </text>

          {/* Label */}
          <text x="100" y="130" textAnchor="middle" fontSize="14" fill="#666">
            Capacity
          </text>
        </svg>
      </div>
    </div>
  )
}

// Modify the AdSpendRevenueChart component to remove the ROI calculation
const AdSpendRevenueChart = ({ adSpend, revenue }) => {
  // Calculate the ratio for visual comparison
  const maxValue = Math.max(adSpend, revenue)
  const adSpendHeight = (adSpend / maxValue) * 120
  const revenueHeight = (revenue / maxValue) * 120

  return (
    <div className="chart-container">
      <div className="chart-header">
        <DollarSign size={18} />
        <h3 className="chart-title">Ad Spend vs Revenue</h3>
      </div>
      <div className="chart-content">
        <svg width="100%" height="200" viewBox="0 0 300 200">
          {/* Y-axis */}
          <line x1="60" y1="30" x2="60" y2="150" stroke="#e0e0e0" strokeWidth="1" />

          {/* X-axis */}
          <line x1="60" y1="150" x2="240" y2="150" stroke="#e0e0e0" strokeWidth="1" />

          {/* Ad Spend Bar */}
          <rect x="100" y={150 - adSpendHeight} width="40" height={adSpendHeight} fill="#f59e0b" rx="4" />

          {/* Revenue Bar */}
          <rect x="160" y={150 - revenueHeight} width="40" height={revenueHeight} fill="#10b981" rx="4" />

          {/* Bar Labels */}
          <text x="120" y="170" textAnchor="middle" fontSize="12" fill="#666">
            Ad Spend
          </text>
          <text x="180" y="170" textAnchor="middle" fontSize="12" fill="#666">
            Revenue
          </text>

          {/* Values */}
          <text x="120" y={145 - adSpendHeight} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">
            ${adSpend.toLocaleString()}
          </text>
          <text x="180" y={145 - revenueHeight} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">
            ${revenue.toLocaleString()}
          </text>
        </svg>
      </div>
    </div>
  )
}

// Add the new CampaignMetricsChart component after the AdSpendRevenueChart component
const CampaignMetricsChart = ({ artist }) => {
  const [campaigns, setCampaigns] = useState([])
  const [selectedMetric, setSelectedMetric] = useState("reach")
  const [hoveredBar, setHoveredBar] = useState(null)

  const metrics = [
    { id: "reach", label: "Reach", color: "#3b82f6" },
    { id: "clicks", label: "Clicks", color: "#10b981" },
    { id: "engagement", label: "Engagement", color: "#f59e0b" },
    { id: "likes", label: "Likes", color: "#8b5cf6" },
    { id: "shares", label: "Shares", color: "#ef4444" },
  ]

  useEffect(() => {
    // Generate mock data for campaigns - only Instagram and Facebook
    const campaignNames = ["Instagram", "Facebook"]
    const campaignColors = ["#E1306C", "#4267B2"] // Instagram pink/purple, Facebook blue
    const timePoints = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]

    const mockCampaigns = campaignNames.map((name, idx) => {
      const data = timePoints.map((week) => {
        return {
          week,
          reach: Math.floor(Math.random() * 50000) + 10000,
          clicks: Math.floor(Math.random() * 5000) + 1000,
          engagement: Math.floor(Math.random() * 2000) + 500,
          likes: Math.floor(Math.random() * 1000) + 200,
          shares: Math.floor(Math.random() * 500) + 50,
        }
      })

      return {
        id: idx + 1,
        name,
        color: campaignColors[idx],
        data,
      }
    })

    setCampaigns(mockCampaigns)
  }, [artist])

  // Find the max value for the selected metric to scale the chart
  const maxValue =
    campaigns.length > 0
      ? Math.max(...campaigns.flatMap((campaign) => campaign.data.map((d) => d[selectedMetric])))
      : 1000

  // Calculate bar width and spacing
  const barWidth = 20
  const barSpacing = 10
  const groupWidth = (barWidth + barSpacing) * campaigns.length
  const totalGroups = campaigns.length > 0 ? campaigns[0].data.length : 6

  return (
    <div className="chart-container campaign-chart">
      <div className="chart-header">
        <BarChart2 size={18} />
        <h3 className="chart-title">Campaign Performance</h3>
        <div className="metric-selector">
          <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)} className="metric-select">
            {metrics.map((metric) => (
              <option key={metric.id} value={metric.id}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="chart-content">
        <svg width="100%" height="300" viewBox="0 0 600 300">
          <g transform="translate(50,20)">
            {/* X-axis */}
            <line x1="0" y1="230" x2="500" y2="230" stroke="#e0e0e0" strokeWidth="1" />

            {/* Y-axis */}
            <line x1="0" y1="0" x2="0" y2="230" stroke="#e0e0e0" strokeWidth="1" />

            {/* X-axis labels */}
            {campaigns.length > 0 &&
              campaigns[0].data.map((d, i) => (
                <text
                  key={`x-label-${i}`}
                  x={i * (500 / totalGroups) + 500 / totalGroups / 2}
                  y="250"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {d.week}
                </text>
              ))}

            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((percent, i) => {
              const value = Math.round(maxValue * percent)
              return (
                <text
                  key={`y-label-${i}`}
                  x="-10"
                  y={230 - (i * 230) / 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#666"
                  dominantBaseline="middle"
                >
                  {value.toLocaleString()}
                </text>
              )
            })}

            {/* Bars for each campaign */}
            {campaigns.map((campaign, campaignIndex) => (
              <g key={`bars-${campaign.id}`}>
                {campaign.data.map((d, weekIndex) => {
                  const barHeight = (d[selectedMetric] / maxValue) * 230
                  const barX =
                    weekIndex * (500 / totalGroups) +
                    campaignIndex * (barWidth + barSpacing) +
                    (500 / totalGroups - groupWidth) / 2
                  const barY = 230 - barHeight
                  const barId = `bar-${campaign.id}-${weekIndex}`

                  return (
                    <g key={barId}>
                      <rect
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={campaign.color}
                        opacity={hoveredBar === barId ? 0.8 : 1}
                        rx="2"
                        onMouseEnter={() => setHoveredBar(barId)}
                        onMouseLeave={() => setHoveredBar(null)}
                        className="chart-bar"
                      />

                      {hoveredBar === barId && (
                        <g>
                          <rect x={barX - 40} y={barY - 30} width="80" height="25" rx="4" fill="rgba(0,0,0,0.8)" />
                          <text x={barX} y={barY - 15} textAnchor="middle" fontSize="12" fill="white">
                            {d[selectedMetric].toLocaleString()}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </g>
            ))}
          </g>
        </svg>

        {/* Legend */}
        <div className="chart-legend">
          {campaigns.map((campaign) => (
            <div key={`legend-${campaign.id}`} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: campaign.color }}></span>
              <span className="legend-label">{campaign.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SimilarArtistDetails = ({ artist }) => {
  const [query, setQuery] = useState("")
  const [similarArtists, setSimilarArtists] = useState([
    {
      id: 1,
      artist: "The Avett Brothers",
      venue: "Red Rocks Amphitheatre",
      date: "2024-07-20",
      city: "Morrison, CO",
      metrics: {
        totalTicketsSold: 9000,
        revenue: 630000,
        averageTicketPrice: 70,
        socialMediaReach: 145000,
      },
    },
    {
      id: 2,
      artist: "Lord Huron",
      venue: "Greek Theatre",
      date: "2024-08-25",
      city: "Berkeley, CA",
      metrics: {
        totalTicketsSold: 7800,
        revenue: 546000,
        averageTicketPrice: 70,
        socialMediaReach: 110000,
      },
    },
  ])

  const [answer, setAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate a mock answer
    const mockAnswers = [
      `Based on data from similar artists like The Avett Brothers and Lord Huron, ${artist} is likely to sell between 7,800-9,000 tickets at this venue, with an expected revenue of $546,000-$630,000.`,
      `${artist} has historically performed well in this region. Similar artists have seen an average ticket price of $70 with strong social media engagement of 110,000-145,000 impressions.`,
      `Compared to similar artists, ${artist} could expect to see approximately 15-20% higher merchandise sales at this venue, especially if they perform their most popular songs based on streaming data.`,
    ]
    const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)]
    setAnswer(randomAnswer)
    setShowAnswer(true)
  }

  return (
    <div className="similar-artists-panel">
      <h2 className="section-title">Information from Similar Artists</h2>

      <form onSubmit={handleSubmit} className="artist-query-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask a question about ${artist} or similar artists`}
            className="search-input"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {showAnswer && (
        <div className="answer-pane">
          <div className="answer-header">
            <h3 className="subsection-title">Answer</h3>
            <button className="btn-close" onClick={() => setShowAnswer(false)} aria-label="Close answer">
              <X size={18} />
            </button>
          </div>
          <div className="answer-content">
            <p>{answer}</p>
          </div>
        </div>
      )}

      <div className="similar-artists-list">
        <h3 className="subsection-title">Similar Artist Shows</h3>
        <div className="shows-grid">
          {similarArtists.map((show) => (
            <div key={show.id} className="show-card">
              <div className="show-card-header">
                <h3 className="show-title">{show.artist}</h3>
                <span className="show-date">
                  {new Date(show.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="show-card-content">
                <p className="show-venue">{show.venue}</p>
                <p className="show-location">{show.city}</p>
              </div>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-label">Tickets Sold</span>
                  <span className="metric-value">{show.metrics.totalTicketsSold.toLocaleString()}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Revenue</span>
                  <span className="metric-value">${show.metrics.revenue.toLocaleString()}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Avg. Ticket</span>
                  <span className="metric-value">${show.metrics.averageTicketPrice}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Social Reach</span>
                  <span className="metric-value">{show.metrics.socialMediaReach.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PastShowQuestionField = ({ artist }) => {
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate a mock answer
    const mockAnswers = [
      `${artist}'s performance had a 92% venue capacity, which is 15% higher than the average for this venue. The audience demographics showed a strong presence in the 25-34 age group.`,
      `${artist} performed 18 songs during this show, with the highest audience engagement during the encore. Social media mentions peaked 2 hours after the show ended.`,
      `Compared to their previous performance at this venue, ${artist} saw a 12% increase in ticket sales and a 20% increase in merchandise revenue.`,
    ]
    const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)]
    setAnswer(randomAnswer)
    setShowAnswer(true)
  }

  return (
    <div className="past-show-question-panel">
      <h3 className="subsection-title">Ask about this performance</h3>

      <form onSubmit={handleSubmit} className="artist-query-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask a question about ${artist}'s performance`}
            className="search-input"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {showAnswer && (
        <div className="answer-pane">
          <div className="answer-header">
            <h3 className="subsection-title">Answer</h3>
            <button className="btn-close" onClick={() => setShowAnswer(false)} aria-label="Close answer">
              <X size={18} />
            </button>
          </div>
          <div className="answer-content">
            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const UpcomingShows = () => {
  const [shows, setShows] = useState([
    {
      id: 1,
      artist: "The Lumineers",
      venue: "Red Rocks Amphitheatre",
      date: "2024-07-15",
      city: "Morrison, CO",
      metrics: {
        totalTicketsSold: 9500,
        revenue: 665000,
        averageTicketPrice: 70,
        socialMediaReach: 250000,
        percentSold: 92,
        adSpend: 85000,
      },
    },
    {
      id: 2,
      artist: "Khruangbin",
      venue: "Greek Theatre",
      date: "2024-08-22",
      city: "Berkeley, CA",
      metrics: {
        totalTicketsSold: 7200,
        revenue: 504000,
        averageTicketPrice: 70,
        socialMediaReach: 95000,
        percentSold: 78,
        adSpend: 65000,
      },
    },
    {
      id: 3,
      artist: "Leon Bridges",
      venue: "Stubb's Amphitheater",
      date: "2024-09-05",
      city: "Austin, TX",
      metrics: {
        totalTicketsSold: 6800,
        revenue: 476000,
        averageTicketPrice: 70,
        socialMediaReach: 85000,
        percentSold: 85,
        adSpend: 60000,
      },
    },
  ])

  const [selectedShow, setSelectedShow] = useState(null)
  const [showSimilarArtists, setShowSimilarArtists] = useState(false)

  const renderShowDetails = (show) => (
    <div className="show-details">
      <button onClick={() => setSelectedShow(null)} className="btn btn-secondary mb-4">
        <ChevronRight className="rotate-180" size={16} />
        Back to Upcoming Shows
      </button>

      <h2 className="section-title">{show.artist} - Show Details</h2>

      <div className="metrics-container">
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">Tickets Sold</span>
            <span className="metric-value">{show.metrics.totalTicketsSold.toLocaleString()}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Total Revenue</span>
            <span className="metric-value">${show.metrics.revenue.toLocaleString()}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Avg. Ticket Price</span>
            <span className="metric-value">${show.metrics.averageTicketPrice}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Social Media Reach</span>
            <span className="metric-value">{show.metrics.socialMediaReach.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <h3 className="subsection-title">Performance Analytics</h3>
        <div className="charts-grid">
          <SalesTrendChart artist={show.artist} />
          <TicketGaugeChart percentSold={show.metrics.percentSold} />
          <AdSpendRevenueChart adSpend={show.metrics.adSpend} revenue={show.metrics.revenue} />
          <CampaignMetricsChart artist={show.artist} />
        </div>
      </div>

      {!showSimilarArtists ? (
        <button onClick={() => setShowSimilarArtists(true)} className="btn btn-primary mt-6">
          Information from Similar Artists
        </button>
      ) : (
        <SimilarArtistDetails artist={show.artist} />
      )}
    </div>
  )

  return (
    <div className="upcoming-shows-panel">
      {selectedShow ? (
        renderShowDetails(selectedShow)
      ) : (
        <>
          <h2 className="section-title">Upcoming Shows</h2>
          <div className="shows-grid">
            {shows.map((show) => (
              <div key={show.id} className="show-card" onClick={() => setSelectedShow(show)}>
                <div className="show-card-header">
                  <h3 className="show-title">{show.artist}</h3>
                  <span className="show-date">
                    {new Date(show.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="show-card-content">
                  <p className="show-venue">{show.venue}</p>
                  <p className="show-location">{show.city}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const PastShows = () => {
  const [selectedShow, setSelectedShow] = useState(null)
  const [shows, setShows] = useState([
    {
      id: 1,
      artist: "Bon Iver",
      venue: "Red Rocks Amphitheatre",
      date: "2023-06-15",
      city: "Morrison, CO",
      metrics: {
        totalTicketsSold: 8500,
        revenue: 595000,
        averageTicketPrice: 70,
        socialMediaReach: 125000,
        percentSold: 88,
        adSpend: 75000,
      },
    },
    {
      id: 2,
      artist: "The National",
      venue: "Greek Theatre",
      date: "2023-07-22",
      city: "Berkeley, CA",
      metrics: {
        totalTicketsSold: 7200,
        revenue: 504000,
        averageTicketPrice: 70,
        socialMediaReach: 95000,
        percentSold: 82,
        adSpend: 62000,
      },
    },
  ])

  const renderShowDetails = (show) => (
    <div className="show-details">
      <button onClick={() => setSelectedShow(null)} className="btn btn-secondary mb-4">
        <ChevronRight className="rotate-180" size={16} />
        Back to Past Shows
      </button>

      <h2 className="section-title">{show.artist} - Show Report</h2>

      <div className="metrics-container">
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">Tickets Sold</span>
            <span className="metric-value">{show.metrics.totalTicketsSold.toLocaleString()}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Total Revenue</span>
            <span className="metric-value">${show.metrics.revenue.toLocaleString()}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Avg. Ticket Price</span>
            <span className="metric-value">${show.metrics.averageTicketPrice}</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Social Media Reach</span>
            <span className="metric-value">{show.metrics.socialMediaReach.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <h3 className="subsection-title">Performance Analytics</h3>
        <div className="charts-grid">
          <SalesTrendChart artist={show.artist} />
          <TicketGaugeChart percentSold={show.metrics.percentSold} />
          <AdSpendRevenueChart adSpend={show.metrics.adSpend} revenue={show.metrics.revenue} />
          <CampaignMetricsChart artist={show.artist} />
        </div>
      </div>

      <div className="question-section mt-6">
        <PastShowQuestionField artist={show.artist} />
      </div>
    </div>
  )

  return (
    <div className="past-shows-panel">
      {selectedShow ? (
        renderShowDetails(selectedShow)
      ) : (
        <>
          <h2 className="section-title">Past Shows</h2>
          <div className="shows-grid">
            {shows.map((show) => (
              <div key={show.id} className="show-card" onClick={() => setSelectedShow(show)}>
                <div className="show-card-header">
                  <h3 className="show-title">{show.artist}</h3>
                  <span className="show-date">
                    {new Date(show.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="show-card-content">
                  <p className="show-venue">{show.venue}</p>
                  <p className="show-location">{show.city}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState("")
  const [sqlQuery, setSqlQuery] = useState("")
  const [results, setResults] = useState([])
  const [resultsSummary, setResultsSummary] = useState("")
  const [insights, setInsights] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [currentPage, setCurrentPage] = useState("Marketing Insights")
  const [view, setView] = useState("query") // 'query', 'results', 'insights', 'history'
  const [isInfoPaneOpen, setIsInfoPaneOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [availableInfo, setAvailableInfo] = useState([
    "Customer information (name, email, location)",
    "Purchase history and order details",
    "Product catalog and pricing",
    "Marketing campaign performance",
    "Website traffic and user engagement",
    "Social media metrics and audience data",
    "Email marketing statistics",
    "Sales trends and revenue analytics",
  ])

  // Generate a summary based on the results
  const generateResultsSummary = (data, queryText) => {
    if (!data || data.length === 0) {
      return "No results found for your query."
    }

    let summary = ""

    if (queryText.toLowerCase().includes("user")) {
      summary = `Found ${data.length} users in the database. The results show basic user information including names, email addresses, and account creation dates. The most recent user joined on ${data[data.length - 1].created_at}.`
    } else if (queryText.toLowerCase().includes("order")) {
      const totalAmount = data.reduce((sum, item) => sum + Number.parseFloat(item.amount || 0), 0)
      summary = `Found ${data.length} orders in the database. These orders represent a total revenue of $${totalAmount.toFixed(2)}. The results include order IDs, customer information, and order status.`
    } else if (queryText.toLowerCase().includes("product")) {
      const categories = [...new Set(data.map((item) => item.category))]
      summary = `Found ${data.length} products across ${categories.length} categories (${categories.join(", ")}). The results include product names, pricing information, and category classifications.`
    } else {
      summary = `Found ${data.length} results matching your query. The data includes a mix of user information and related order details, showing the relationship between customers and their purchases.`
    }

    return summary
  }

  // Mock function to generate SQL from natural language
  const generateSQL = async (text) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, generate a simple SQL query based on input
    let generatedSQL = ""

    if (text.toLowerCase().includes("user")) {
      generatedSQL = "SELECT * FROM users LIMIT 10;"
    } else if (text.toLowerCase().includes("order")) {
      generatedSQL = 'SELECT * FROM orders WHERE status = "completed" LIMIT 10;'
    } else if (text.toLowerCase().includes("product")) {
      generatedSQL = "SELECT * FROM products ORDER BY price DESC LIMIT 10;"
    } else {
      generatedSQL = "SELECT * FROM users JOIN orders ON users.id = orders.user_id LIMIT 10;"
    }

    setSqlQuery(generatedSQL)
    setIsLoading(false)
    return generatedSQL
  }

  // Mock function to execute SQL and get results
  const executeSQL = async (sql) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate mock results based on the SQL query
    let mockResults = []

    if (sql.includes("users")) {
      mockResults = [
        { id: 1, name: "John Doe", email: "john@example.com", created_at: "2023-01-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2023-02-20" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", created_at: "2023-03-10" },
      ]
    } else if (sql.includes("orders")) {
      mockResults = [
        { id: 101, user_id: 1, amount: 99.99, status: "completed", created_at: "2023-04-05" },
        { id: 102, user_id: 1, amount: 149.99, status: "completed", created_at: "2023-05-12" },
        { id: 103, user_id: 2, amount: 79.99, status: "pending", created_at: "2023-06-20" },
      ]
    } else if (sql.includes("products")) {
      mockResults = [
        { id: 201, name: "Laptop", price: 1299.99, category: "Electronics" },
        { id: 202, name: "Smartphone", price: 899.99, category: "Electronics" },
        { id: 203, name: "Headphones", price: 199.99, category: "Accessories" },
      ]
    } else {
      mockResults = [
        { id: 1, name: "John Doe", order_id: 101, amount: 99.99, status: "completed" },
        { id: 1, name: "John Doe", order_id: 102, amount: 149.99, status: "completed" },
        { id: 2, name: "Jane Smith", order_id: 103, amount: 79.99, status: "pending" },
      ]
    }

    setResults(mockResults)

    // Generate a summary of the results
    const summary = generateResultsSummary(mockResults, query)
    setResultsSummary(summary)

    setIsLoading(false)
    return mockResults
  }

  // Mock function to generate insights from results
  const generateInsights = async (data) => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate insights based on data type
    let generatedInsights = []

    if (data.length > 0 && data[0].hasOwnProperty("amount")) {
      const totalAmount = data.reduce((sum, item) => sum + Number.parseFloat(item.amount || 0), 0)
      const avgAmount = totalAmount / data.length

      generatedInsights = [
        { type: "summary", text: `Total orders: ${data.length}` },
        { type: "metric", text: `Total revenue: $${totalAmount.toFixed(2)}` },
        { type: "metric", text: `Average order value: $${avgAmount.toFixed(2)}` },
        {
          type: "recommendation",
          text: "Consider offering discounts to users with higher average order values to increase retention.",
        },
      ]
    } else if (data.length > 0 && data[0].hasOwnProperty("email")) {
      generatedInsights = [
        { type: "summary", text: `Total users: ${data.length}` },
        { type: "metric", text: `User acquisition rate: 15 users/month` },
        { type: "recommendation", text: "Send targeted emails to users who haven't ordered in the last 30 days." },
      ]
    } else if (data.length > 0 && data[0].hasOwnProperty("price")) {
      const avgPrice = data.reduce((sum, item) => sum + Number.parseFloat(item.price || 0), 0) / data.length

      generatedInsights = [
        { type: "summary", text: `Total products: ${data.length}` },
        { type: "metric", text: `Average price: $${avgPrice.toFixed(2)}` },
        {
          type: "recommendation",
          text: "Consider bundling high-priced items with accessories for higher conversion rate.",
        },
      ]
    }

    setInsights(generatedInsights)
    setIsLoading(false)
    return generatedInsights
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const sql = await generateSQL(query)
    const data = await executeSQL(sql)
    await generateInsights(data)

    // Add to history
    setHistory([{ query, sql, timestamp: new Date().toISOString() }, ...history])

    // Switch to results view
    setView("results")
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const renderQueryView = () => (
    <div className="query-panel">
      <h2 className="section-title">Marketing Analytics Agent</h2>
      <form onSubmit={handleSubmit} className="query-form">
        <div className="input-group">
          <div className="textarea-wrapper">
            <textarea
              className="query-textarea"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your question (e.g., 'Show me all users who placed orders last month')"
              rows={4}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Processing..." : "Generate Results"}
          </button>
        </div>
      </form>

      <div className="info-explorer">
        <h3 className="subsection-title">Available Information</h3>
        <ul className="info-list-grid">
          {availableInfo.map((info, index) => (
            <li key={index} className="info-item">
              <div className="info-item-content">{info}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  const renderResultsView = () => (
    <div className="results-panel">
      <div className="panel-header">
        <h2 className="section-title">Results</h2>
        <div className="view-controls">
          <button className="btn btn-secondary" onClick={() => setView("query")}>
            Back to Query
          </button>
          <button className="btn btn-primary" onClick={() => setView("insights")} disabled={insights.length === 0}>
            View Insights
          </button>
        </div>
      </div>

      <div className="summary-display">
        <div className="summary-header">
          <h3 className="subsection-title">Summary</h3>
        </div>
        <div className="summary-content">
          <p>{resultsSummary}</p>
        </div>
      </div>

      <div className="results-table-container">
        {results.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((value, j) => (
                    <td key={j}>{value?.toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-results">No results to display</p>
        )}
      </div>
    </div>
  )

  const renderInsightsView = () => (
    <div className="insights-panel">
      <div className="panel-header">
        <h2 className="section-title">Data Insights</h2>
        <div className="view-controls">
          <button className="btn btn-secondary" onClick={() => setView("results")}>
            Back to Results
          </button>
        </div>
      </div>

      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-card ${insight.type}`}>
            <div className="insight-icon">
              {insight.type === "summary" && "📊"}
              {insight.type === "metric" && "📈"}
              {insight.type === "recommendation" && "💡"}
            </div>
            <p className="insight-text">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHistoryView = () => (
    <div className="history-panel">
      <div className="panel-header">
        <h2 className="section-title">Query History</h2>
        <button className="btn btn-secondary" onClick={() => setView("query")}>
          Back to Query
        </button>
      </div>

      <div className="history-list">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-item-header">
                <span className="history-timestamp">{new Date(item.timestamp).toLocaleString()}</span>
                <div className="history-actions">
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      setQuery(item.query)
                      setSqlQuery(item.sql)
                      setView("query")
                    }}
                    title="Load Query"
                  >
                    Load
                  </button>
                </div>
              </div>
              <p className="history-query">{item.query}</p>
            </div>
          ))
        ) : (
          <p className="no-history">No query history yet</p>
        )}
      </div>
    </div>
  )

  // Render function based on current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Marketing Insights":
        return (
          <>
            {view === "query" && renderQueryView()}
            {view === "results" && renderResultsView()}
            {view === "insights" && renderInsightsView()}
            {view === "history" && renderHistoryView()}
          </>
        )
      case "Upcoming Shows":
        return <UpcomingShows />
      case "Past Shows":
        return <PastShows />
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="app-logo">
            <img src="/rlm.png" alt="RLM Marketing" className="app-icon" />
          </div>
        </div>

        <nav className={`main-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {currentPage === "Marketing Insights" && (
            <>
              <button
                className={`nav-button ${view === "query" ? "active" : ""}`}
                onClick={() => {
                  setView("query")
                  setIsMobileMenuOpen(false)
                }}
              >
                <Search size={16} />
                <span>Query</span>
              </button>
              <button
                className={`nav-button ${view === "results" ? "active" : ""}`}
                onClick={() => {
                  setView("results")
                  setIsMobileMenuOpen(false)
                }}
                disabled={results.length === 0}
              >
                <BarChart2 size={16} />
                <span>Results</span>
              </button>
              <button
                className={`nav-button ${view === "insights" ? "active" : ""}`}
                onClick={() => {
                  setView("insights")
                  setIsMobileMenuOpen(false)
                }}
                disabled={insights.length === 0}
              >
                <Calendar size={16} />
                <span>Insights</span>
              </button>
              <button
                className={`nav-button ${view === "history" ? "active" : ""}`}
                onClick={() => {
                  setView("history")
                  setIsMobileMenuOpen(false)
                }}
              >
                <Clock size={16} />
                <span>History</span>
              </button>
            </>
          )}
        </nav>

        <div className="header-right">
          <button className="btn btn-outline" onClick={() => setIsInfoPaneOpen(!isInfoPaneOpen)}>
            Info
          </button>
          <button className="btn btn-primary">Sign In</button>
        </div>
      </header>

      <div className="app-content-container">
        <aside className={`side-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <button
            className={`side-nav-button ${currentPage === "Marketing Insights" ? "active" : ""}`}
            onClick={() => {
              setCurrentPage("Marketing Insights")
              setIsMobileMenuOpen(false)
            }}
          >
            <BarChart2 size={18} />
            <span>Marketing Insights</span>
          </button>
          <button
            className={`side-nav-button ${currentPage === "Upcoming Shows" ? "active" : ""}`}
            onClick={() => {
              setCurrentPage("Upcoming Shows")
              setIsMobileMenuOpen(false)
            }}
          >
            <Calendar size={18} />
            <span>Upcoming Shows</span>
          </button>
          <button
            className={`side-nav-button ${currentPage === "Past Shows" ? "active" : ""}`}
            onClick={() => {
              setCurrentPage("Past Shows")
              setIsMobileMenuOpen(false)
            }}
          >
            <Clock size={18} />
            <span>Past Shows</span>
          </button>
        </aside>

        <main className="app-content">{renderCurrentPage()}</main>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2024 Red Light Management - Marketing AI Agent</p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
            <a href="#" className="footer-link">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {isInfoPaneOpen && (
        <div className="info-pane">
          <div className="info-pane-content">
            <div className="info-pane-header">
              <h2 className="info-pane-title">About MarketMind</h2>
              <button className="btn-close" onClick={() => setIsInfoPaneOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="info-pane-body">
              <section className="info-section">
                <h3 className="info-section-title">What is MarketMind?</h3>
                <p>
                  MarketMind is an AI-powered tool that converts natural language queries into SQL code. Simply describe
                  what data you want to see, and MarketMind will generate the appropriate SQL query.
                </p>
              </section>

              <section className="info-section">
                <h3 className="info-section-title">How It Works</h3>
                <ol className="info-list">
                  <li>Enter your question in plain English</li>
                  <li>MarketMind translates your request into SQL</li>
                  <li>Review and run the generated SQL</li>
                  <li>Explore results and insights</li>
                </ol>
              </section>

              <section className="info-section">
                <h3 className="info-section-title">Tips for Better Results</h3>
                <ul className="info-list">
                  <li>Be specific about what tables and columns you want to query</li>
                  <li>Mention any filters or conditions clearly</li>
                  <li>Specify how you want data sorted or grouped</li>
                  <li>Use database terminology when possible</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App